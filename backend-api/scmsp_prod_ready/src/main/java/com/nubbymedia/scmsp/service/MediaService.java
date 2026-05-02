package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.dto.*;
import com.nubbymedia.scmsp.entity.*;
import com.nubbymedia.scmsp.exception.BadRequestException;
import com.nubbymedia.scmsp.exception.ResourceNotFoundException;
import com.nubbymedia.scmsp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MediaService {

    private static final Set<String> ALLOWED_SHARE_PERMISSIONS = Set.of("VIEW", "DOWNLOAD", "EDIT");

    private final MediaFileRepository mediaFileRepository;
    private final FolderRepository folderRepository;
    private final MediaTagRepository mediaTagRepository;
    private final SharedFileRepository sharedFileRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final TagService tagService;
    private final ProcessingJobService processingJobService;
    private final AuditService auditService;
    private final AccessControlService accessControlService;

    public MediaFileResponse create(CreateMediaFileRequest request, String email, String ipAddress, String userAgent) {
        User user = userService.getByEmail(email);
        Folder folder = folderRepository.findByFolderIdAndUser(request.folderId(), user)
                .orElseThrow(() -> new BadRequestException("Folder does not belong to the current user"));

        MediaFile saved = mediaFileRepository.save(
                MediaFile.builder()
                        .user(user)
                        .folder(folder)
                        .fileName(request.fileName())
                        .fileType(request.fileType())
                        .fileSizeMb(request.fileSizeMb())
                        .uploadDate(LocalDateTime.now())
                        .storagePath(request.storagePath())
                        .checksumValue(request.checksumValue())
                        .fileStatus("Active")
                        .cloudObjectKey(request.cloudObjectKey())
                        .isEncrypted(request.isEncrypted() == null ? Boolean.TRUE : request.isEncrypted())
                        .processingStatus("Pending")
                        .visibilityLevel(request.visibilityLevel() == null || request.visibilityLevel().isBlank() ? "Private" : request.visibilityLevel())
                        .fileDescription(request.fileDescription())
                        .build()
        );

        processingJobService.createUploadProcessingJob(saved, user);
        auditService.log(user, saved, "UPLOAD", "Created media file record", "SUCCESS", ipAddress, userAgent);
        return map(saved);
    }

    public java.util.List<MediaFileResponse> getAccessibleFiles(String email) {
        User user = userService.getByEmail(email);

        var owned = mediaFileRepository.findByUser(user);
        var shared = sharedFileRepository.findBySharedWithUser(user).stream()
                .filter(share -> "Active".equalsIgnoreCase(share.getShareStatus()))
                .filter(share -> share.getExpirationDate() == null || share.getExpirationDate().isAfter(LocalDateTime.now()))
                .map(SharedFile::getMediaFile)
                .toList();

        return java.util.stream.Stream.concat(owned.stream(), shared.stream())
                .distinct()
                .map(this::map)
                .toList();
    }

    public MediaFileResponse getAccessibleFile(Long fileId, String email, String ipAddress, String userAgent) {
        User user = userService.getByEmail(email);
        MediaFile file = getFileOrThrow(fileId);

        accessControlService.ensureCanRead(file, user);
        auditService.log(user, file, "READ", "Viewed file metadata", "SUCCESS", ipAddress, userAgent);
        return map(file);
    }

    public MediaFile getAccessibleFileEntity(Long fileId, String email, String ipAddress, String userAgent) {
        User user = userService.getByEmail(email);
        MediaFile file = getFileOrThrow(fileId);

        accessControlService.ensureCanRead(file, user);
        auditService.log(user, file, "DOWNLOAD", "Downloaded media file", "SUCCESS", ipAddress, userAgent);
        return file;
    }

    public void deleteOwnedFile(Long fileId, String email, String ipAddress, String userAgent) {
        User user = userService.getByEmail(email);
        MediaFile file = getFileOrThrow(fileId);

        accessControlService.ensureCanManage(file, user);
        auditService.log(user, file, "DELETE", "Deleted media file", "SUCCESS", ipAddress, userAgent);
        mediaFileRepository.delete(file);
    }

    public MediaFileResponse addTag(Long fileId, AddTagRequest request, String email, String ipAddress, String userAgent) {
        User user = userService.getByEmail(email);
        MediaFile file = getFileOrThrow(fileId);

        accessControlService.ensureCanManage(file, user);

        Tag tag = tagService.getOrCreate(request.tagName(), request.tagType());
        mediaTagRepository.findByMediaFileAndTag(file, tag).orElseGet(() ->
                mediaTagRepository.save(
                        MediaTag.builder()
                                .mediaFile(file)
                                .tag(tag)
                                .taggedBy("USER")
                                .confidenceScore(request.confidenceScore())
                                .build()
                )
        );

        MediaFile updated = getFileOrThrow(fileId);
        auditService.log(user, updated, "TAG_ADD", "Added tag " + tag.getTagName(), "SUCCESS", ipAddress, userAgent);
        return map(updated);
    }

    public java.util.List<ProcessingJobResponse> getProcessingJobs(Long fileId, String email) {
        User user = userService.getByEmail(email);
        MediaFile file = getFileOrThrow(fileId);
        accessControlService.ensureCanRead(file, user);
        return processingJobService.getByMediaFile(file);
    }

    public SecureAccessResponse getSecureAccess(Long fileId, String email, String ipAddress, String userAgent) {
        User user = userService.getByEmail(email);
        MediaFile file = getFileOrThrow(fileId);

        String permission = accessControlService.resolvePermission(file, user);
        String url = "/api/media/" + file.getFileId() + "/download";

        auditService.log(user, file, "DOWNLOAD_LINK", "Generated secure access URL", "SUCCESS", ipAddress, userAgent);
        return new SecureAccessResponse(file.getFileId(), file.getFileName(), url, permission, "Authenticated download access available");
    }

    public SecureAccessResponse shareFile(Long fileId, ShareFileRequest request, String email, String ipAddress, String userAgent) {
        User owner = userService.getByEmail(email);
        User recipient = userRepository.findById(request.sharedWithUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipient user not found"));
        MediaFile file = getFileOrThrow(fileId);

        accessControlService.ensureCanManage(file, owner);

        String permissionLevel = normalizePermission(request.permissionLevel());

        sharedFileRepository.save(
                SharedFile.builder()
                        .mediaFile(file)
                        .ownerUser(owner)
                        .sharedWithUser(recipient)
                        .permissionLevel(permissionLevel)
                        .expirationDate(request.expirationDate())
                        .shareStatus("Active")
                        .accessCode("SHARE-" + fileId + "-" + recipient.getUserId())
                        .build()
        );

        auditService.log(owner, file, "SHARE", "Shared file with user " + recipient.getEmail(), "SUCCESS", ipAddress, userAgent);
        return new SecureAccessResponse(file.getFileId(), file.getFileName(), "/api/media/" + file.getFileId() + "/download", permissionLevel, "File shared successfully");
    }

    private String normalizePermission(String permissionLevel) {
        if (permissionLevel == null) {
            throw new BadRequestException("Permission level is required");
        }
        String normalized = permissionLevel.trim().toUpperCase(Locale.ROOT);
        if (!ALLOWED_SHARE_PERMISSIONS.contains(normalized)) {
            throw new BadRequestException("Permission level must be one of VIEW, DOWNLOAD, or EDIT");
        }
        return normalized;
    }

    private MediaFile getFileOrThrow(Long fileId) {
        return mediaFileRepository.findByFileId(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("Media file not found"));
    }

    private MediaFileResponse map(MediaFile file) {
        return new MediaFileResponse(
                file.getFileId(),
                file.getUser().getUserId(),
                file.getFolder().getFolderId(),
                file.getFileName(),
                file.getFileType(),
                file.getFileSizeMb(),
                file.getUploadDate(),
                file.getStoragePath(),
                file.getChecksumValue(),
                file.getFileStatus(),
                file.getCloudObjectKey(),
                file.getIsEncrypted(),
                file.getProcessingStatus(),
                file.getVisibilityLevel(),
                file.getFileDescription(),
                file.getMediaTags().stream()
                        .map(mediaTag -> mediaTag.getTag().getTagName())
                        .collect(java.util.stream.Collectors.toSet())
        );
    }
}

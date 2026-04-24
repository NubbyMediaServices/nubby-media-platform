package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.SharedFile;
import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.exception.UnauthorizedException;
import com.nubbymedia.scmsp.repository.SharedFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccessControlService {

    private static final Set<String> ADMIN_LIKE_ROLES = Set.of("ADMIN", "MANAGER", "AUDITOR");
    private final SharedFileRepository sharedFileRepository;

    public void ensureCanRead(MediaFile file, User user) {
        if (canRead(file, user)) {
            return;
        }
        throw new UnauthorizedException("You do not have access to this file");
    }

    public void ensureCanManage(MediaFile file, User user) {
        if (isAdminLike(user) || file.getUser().getUserId().equals(user.getUserId())) {
            return;
        }
        throw new UnauthorizedException("Only the owner or an administrator can modify this file");
    }

    public boolean canRead(MediaFile file, User user) {
        if (isAdminLike(user) || file.getUser().getUserId().equals(user.getUserId())) {
            return true;
        }
        return findActiveShare(file, user).isPresent();
    }

    public String resolvePermission(MediaFile file, User user) {
        if (isAdminLike(user) || file.getUser().getUserId().equals(user.getUserId())) {
            return "OWNER";
        }
        return findActiveShare(file, user)
                .map(SharedFile::getPermissionLevel)
                .orElseThrow(() -> new UnauthorizedException("You do not have access to this file"));
    }

    private java.util.Optional<SharedFile> findActiveShare(MediaFile file, User user) {
        return sharedFileRepository.findByMediaFileAndSharedWithUserAndShareStatus(file, user, "Active")
                .filter(share -> share.getExpirationDate() == null || share.getExpirationDate().isAfter(LocalDateTime.now()));
    }

    private boolean isAdminLike(User user) {
        return user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .filter(java.util.Objects::nonNull)
                .map(role -> role.toUpperCase(Locale.ROOT).replace(' ', '_'))
                .anyMatch(ADMIN_LIKE_ROLES::contains);
    }
}

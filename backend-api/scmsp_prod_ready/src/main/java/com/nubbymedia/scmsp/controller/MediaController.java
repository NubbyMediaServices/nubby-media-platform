package com.nubbymedia.scmsp.controller;

import com.nubbymedia.scmsp.dto.*;
import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.service.FileStorageService;
import com.nubbymedia.scmsp.service.MediaService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
@Validated
public class MediaController {

    private final MediaService mediaService;
    private final FileStorageService fileStorageService;

    @GetMapping
    public List<MediaFileResponse> getAccessibleFiles(Authentication authentication) {
        return mediaService.getAccessibleFiles(authentication.getName());
    }

    @PostMapping
    public MediaFileResponse create(@Valid @RequestBody CreateMediaFileRequest request,
                                    Authentication authentication,
                                    HttpServletRequest httpRequest) {
        return mediaService.create(request, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
    }

    @GetMapping("/{id}")
    public MediaFileResponse getById(@PathVariable @Min(1) Long id,
                                     Authentication authentication,
                                     HttpServletRequest httpRequest) {
        return mediaService.getAccessibleFile(id, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable @Min(1) Long id,
                                             Authentication authentication,
                                             HttpServletRequest httpRequest) {
        MediaFile file = mediaService.getAccessibleFileEntity(id, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
        Resource resource = fileStorageService.loadAsResource(file.getStoragePath());

        String contentType = file.getFileType() != null && file.getFileType().contains("/")
                ? file.getFileType()
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(file.getFileName(), StandardCharsets.UTF_8)
                                .build().toString())
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @Min(1) Long id,
                       Authentication authentication,
                       HttpServletRequest httpRequest) {
        mediaService.deleteOwnedFile(id, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
    }

    @PostMapping("/{id}/tags")
    public MediaFileResponse addTag(@PathVariable @Min(1) Long id,
                                    @Valid @RequestBody AddTagRequest request,
                                    Authentication authentication,
                                    HttpServletRequest httpRequest) {
        return mediaService.addTag(id, request, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
    }

    @GetMapping("/{id}/processing-jobs")
    public List<ProcessingJobResponse> getProcessingJobs(@PathVariable @Min(1) Long id,
                                                         Authentication authentication) {
        return mediaService.getProcessingJobs(id, authentication.getName());
    }

    @GetMapping("/{id}/access")
    public SecureAccessResponse getSecureAccess(@PathVariable @Min(1) Long id,
                                                Authentication authentication,
                                                HttpServletRequest httpRequest) {
        return mediaService.getSecureAccess(id, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
    }

    @PostMapping("/{id}/share")
    public SecureAccessResponse share(@PathVariable @Min(1) Long id,
                                      @Valid @RequestBody ShareFileRequest request,
                                      Authentication authentication,
                                      HttpServletRequest httpRequest) {
        return mediaService.shareFile(id, request, authentication.getName(), clientIp(httpRequest), userAgent(httpRequest));
    }

    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        return forwarded != null && !forwarded.isBlank() ? forwarded.split(",")[0].trim() : request.getRemoteAddr();
    }

    private String userAgent(HttpServletRequest request) {
        return request.getHeader("User-Agent");
    }
}

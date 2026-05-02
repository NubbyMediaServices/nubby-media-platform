package com.nubbymedia.scmsp.dto;

import java.time.LocalDateTime;
import java.util.Set;

public record MediaFileResponse(
        Long fileId,
        Long ownerUserId,
        Long folderId,
        String fileName,
        String fileType,
        Double fileSizeMb,
        LocalDateTime uploadDate,
        String storagePath,
        String checksumValue,
        String fileStatus,
        String cloudObjectKey,
        Boolean isEncrypted,
        String processingStatus,
        String visibilityLevel,
        String fileDescription,
        Set<String> tags
) {
}

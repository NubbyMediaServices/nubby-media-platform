package com.nubbymedia.scmsp.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateMediaFileRequest(
        @NotNull Long folderId,
        @NotBlank String fileName,
        @NotBlank String fileType,
        @DecimalMin("0.01") Double fileSizeMb,
        @NotBlank String storagePath,
        String checksumValue,
        String cloudObjectKey,
        Boolean isEncrypted,
        String visibilityLevel,
        String fileDescription
) {
}

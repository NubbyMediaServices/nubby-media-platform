package com.nubbymedia.scmsp.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ShareFileRequest(
        @NotNull Long sharedWithUserId,
        @NotBlank String permissionLevel,
        @Future LocalDateTime expirationDate
) {
}

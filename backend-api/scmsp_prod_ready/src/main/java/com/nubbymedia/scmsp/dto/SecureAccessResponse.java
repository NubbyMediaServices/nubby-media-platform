package com.nubbymedia.scmsp.dto;

public record SecureAccessResponse(
        Long fileId,
        String fileName,
        String accessUrl,
        String permissionLevel,
        String message
) {
}

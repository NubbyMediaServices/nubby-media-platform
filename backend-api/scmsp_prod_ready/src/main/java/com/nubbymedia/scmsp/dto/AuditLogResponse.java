package com.nubbymedia.scmsp.dto;

import java.time.LocalDateTime;

public record AuditLogResponse(
        Long logId,
        Long userId,
        String userEmail,
        Long fileId,
        String fileName,
        String actionType,
        LocalDateTime actionTimestamp,
        String actionDetails,
        String resultStatus,
        String ipAddress,
        String userAgent
) {
}

package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.dto.AuditLogResponse;
import com.nubbymedia.scmsp.entity.AuditLog;
import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.exception.UnauthorizedException;
import com.nubbymedia.scmsp.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void log(User user, MediaFile file, String actionType, String actionDetails, String resultStatus, String ipAddress, String userAgent) {
        AuditLog log = AuditLog.builder()
                .user(user)
                .file(file)
                .actionType(actionType)
                .actionDetails(actionDetails)
                .resultStatus(resultStatus)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .build();
        auditLogRepository.save(log);
    }

    public List<AuditLogResponse> getLogsForUser(User user) {
        return auditLogRepository.findByUserOrderByActionTimestampDesc(user).stream()
                .map(this::map)
                .toList();
    }

    public List<AuditLogResponse> getLogsForRequestor(User requestor) {
        boolean elevated = requestor.getUserRoles().stream()
                .anyMatch(r -> {
                    String role = r.getRole().getRoleName();
                    return "Admin".equalsIgnoreCase(role) || "Auditor".equalsIgnoreCase(role) || "Manager".equalsIgnoreCase(role);
                });

        if (elevated) {
            return auditLogRepository.findAllByOrderByActionTimestampDesc().stream().map(this::map).toList();
        }
        return getLogsForUser(requestor);
    }

    private AuditLogResponse map(AuditLog log) {
        return new AuditLogResponse(
                log.getLogId(),
                log.getUser().getUserId(),
                log.getUser().getEmail(),
                log.getFile() != null ? log.getFile().getFileId() : null,
                log.getFile() != null ? log.getFile().getFileName() : null,
                log.getActionType(),
                log.getActionTimestamp(),
                log.getActionDetails(),
                log.getResultStatus(),
                log.getIpAddress(),
                log.getUserAgent()
        );
    }
}

package com.nubbymedia.scmsp.controller;

import com.nubbymedia.scmsp.dto.AuditLogResponse;
import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.service.AuditService;
import com.nubbymedia.scmsp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;
    private final UserService userService;

    @GetMapping("/logs")
    public List<AuditLogResponse> getLogs(Authentication authentication) {
        User requestor = userService.getByEmail(authentication.getName());
        return auditService.getLogsForRequestor(requestor);
    }
}

package com.nubbymedia.scmsp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private MediaFile file;

    @Column(name = "action_type", nullable = false, length = 50)
    private String actionType;

    @Column(name = "action_timestamp", nullable = false)
    private LocalDateTime actionTimestamp;

    @Column(name = "action_details", length = 255)
    private String actionDetails;

    @Column(name = "result_status", nullable = false, length = 20)
    private String resultStatus;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", length = 255)
    private String userAgent;

    @PrePersist
    public void prePersist() {
        if (actionTimestamp == null) actionTimestamp = LocalDateTime.now();
        if (resultStatus == null) resultStatus = "SUCCESS";
    }
}

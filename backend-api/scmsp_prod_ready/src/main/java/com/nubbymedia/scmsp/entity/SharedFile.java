package com.nubbymedia.scmsp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shared_files")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharedFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "share_id")
    private Long shareId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private MediaFile mediaFile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_user_id", nullable = false)
    private User ownerUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_with_user_id", nullable = false)
    private User sharedWithUser;

    @Column(name = "permission_level", nullable = false, length = 20)
    private String permissionLevel;

    @Column(name = "shared_date", nullable = false)
    private LocalDateTime sharedDate;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Column(name = "share_status", nullable = false, length = 20)
    private String shareStatus;

    @Column(name = "access_code", length = 100)
    private String accessCode;

    @PrePersist
    public void prePersist() {
        if (sharedDate == null) sharedDate = LocalDateTime.now();
        if (shareStatus == null) shareStatus = "Active";
    }
}

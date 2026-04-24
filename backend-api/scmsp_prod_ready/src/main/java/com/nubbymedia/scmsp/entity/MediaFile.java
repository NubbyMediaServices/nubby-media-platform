package com.nubbymedia.scmsp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "media_files")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long fileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id", nullable = false)
    private Folder folder;

    @Column(name = "file_name", nullable = false, length = 150)
    private String fileName;

    @Column(name = "file_type", nullable = false, length = 50)
    private String fileType;

    @Column(name = "file_size_mb", nullable = false)
    private Double fileSizeMb;

    @Column(name = "upload_date", nullable = false)
    private LocalDateTime uploadDate;

    @Column(name = "storage_path", nullable = false, length = 255)
    private String storagePath;

    @Column(name = "checksum_value", length = 255)
    private String checksumValue;

    @Column(name = "file_status", nullable = false, length = 20)
    private String fileStatus;

    @Column(name = "cloud_object_key", length = 255)
    private String cloudObjectKey;

    @Column(name = "is_encrypted", nullable = false)
    private Boolean isEncrypted;

    @Column(name = "processing_status", nullable = false, length = 30)
    private String processingStatus;

    @Column(name = "visibility_level", nullable = false, length = 30)
    private String visibilityLevel;

    @Column(name = "file_description", length = 255)
    private String fileDescription;

    @OneToMany(mappedBy = "mediaFile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<MediaTag> mediaTags = new LinkedHashSet<>();

    @PrePersist
    public void prePersist() {
        if (uploadDate == null) uploadDate = LocalDateTime.now();
        if (fileStatus == null) fileStatus = "Active";
        if (isEncrypted == null) isEncrypted = Boolean.TRUE;
        if (processingStatus == null) processingStatus = "Pending";
        if (visibilityLevel == null) visibilityLevel = "Private";
    }
}

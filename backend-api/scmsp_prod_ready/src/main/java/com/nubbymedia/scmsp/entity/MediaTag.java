package com.nubbymedia.scmsp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "media_tags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "media_tag_id")
    private Long mediaTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private MediaFile mediaFile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @Column(name = "tagged_by", nullable = false, length = 30)
    private String taggedBy;

    @Column(name = "confidence_score")
    private Double confidenceScore;

    @Column(name = "tagged_at", nullable = false)
    private LocalDateTime taggedAt;

    @PrePersist
    public void prePersist() {
        if (taggedAt == null) taggedAt = LocalDateTime.now();
        if (taggedBy == null) taggedBy = "USER";
    }
}

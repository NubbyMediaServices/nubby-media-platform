package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {
    @EntityGraph(attributePaths = {"user", "folder", "mediaTags", "mediaTags.tag"})
    List<MediaFile> findByUser(User user);

    @EntityGraph(attributePaths = {"user", "folder", "mediaTags", "mediaTags.tag"})
    Optional<MediaFile> findByFileId(Long fileId);
}

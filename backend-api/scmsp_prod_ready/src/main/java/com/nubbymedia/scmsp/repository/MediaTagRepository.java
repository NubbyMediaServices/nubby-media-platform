package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.MediaTag;
import com.nubbymedia.scmsp.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MediaTagRepository extends JpaRepository<MediaTag, Long> {
    List<MediaTag> findByMediaFile(MediaFile mediaFile);
    Optional<MediaTag> findByMediaFileAndTag(MediaFile mediaFile, Tag tag);
}

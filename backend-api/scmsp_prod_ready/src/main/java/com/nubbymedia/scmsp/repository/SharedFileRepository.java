package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.SharedFile;
import com.nubbymedia.scmsp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SharedFileRepository extends JpaRepository<SharedFile, Long> {
    List<SharedFile> findBySharedWithUser(User user);
    Optional<SharedFile> findByMediaFileAndSharedWithUserAndShareStatus(MediaFile mediaFile, User sharedWithUser, String shareStatus);
}

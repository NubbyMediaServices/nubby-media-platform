package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.Folder;
import com.nubbymedia.scmsp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    Optional<Folder> findByFolderIdAndUser(Long folderId, User user);
}

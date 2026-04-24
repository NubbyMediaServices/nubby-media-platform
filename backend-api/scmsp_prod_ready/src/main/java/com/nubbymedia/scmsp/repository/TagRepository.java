package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagNameIgnoreCase(String tagName);
}

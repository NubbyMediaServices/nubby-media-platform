package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.entity.Tag;
import com.nubbymedia.scmsp.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public Tag getOrCreate(String tagName, String tagType) {
        return tagRepository.findByTagNameIgnoreCase(tagName.trim())
                .orElseGet(() -> tagRepository.save(
                        Tag.builder()
                                .tagName(normalize(tagName))
                                .tagType(tagType == null || tagType.isBlank() ? "USER" : tagType.trim())
                                .build()
                ));
    }

    public String normalize(String tagName) {
        return tagName.trim();
    }
}

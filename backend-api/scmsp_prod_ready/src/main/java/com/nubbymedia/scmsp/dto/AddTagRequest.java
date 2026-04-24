package com.nubbymedia.scmsp.dto;

import jakarta.validation.constraints.NotBlank;

public record AddTagRequest(
        @NotBlank String tagName,
        String tagType,
        Double confidenceScore
) {
}

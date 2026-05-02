package com.nubbymedia.scmsp.dto;

import java.time.LocalDateTime;

public record ProcessingJobResponse(
        Long jobId,
        String jobType,
        String jobStatus,
        LocalDateTime requestedAt,
        LocalDateTime startedAt,
        LocalDateTime completedAt,
        String processorName,
        String outputSummary,
        String errorMessage
) {
}

package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.dto.ProcessingJobResponse;
import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.ProcessingJob;
import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.repository.ProcessingJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProcessingJobService {

    private final ProcessingJobRepository processingJobRepository;

    public ProcessingJob createUploadProcessingJob(MediaFile file, User requestedByUser) {
        return processingJobRepository.save(
                ProcessingJob.builder()
                        .mediaFile(file)
                        .jobType("AI_TAGGING")
                        .jobStatus("Queued")
                        .requestedByUser(requestedByUser)
                        .processorName("Python Service")
                        .outputSummary("Queued after upload")
                        .build()
        );
    }

    public List<ProcessingJobResponse> getByMediaFile(MediaFile file) {
        return processingJobRepository.findByMediaFileOrderByRequestedAtDesc(file)
                .stream()
                .map(job -> new ProcessingJobResponse(
                        job.getJobId(),
                        job.getJobType(),
                        job.getJobStatus(),
                        job.getRequestedAt(),
                        job.getStartedAt(),
                        job.getCompletedAt(),
                        job.getProcessorName(),
                        job.getOutputSummary(),
                        job.getErrorMessage()
                ))
                .toList();
    }
}

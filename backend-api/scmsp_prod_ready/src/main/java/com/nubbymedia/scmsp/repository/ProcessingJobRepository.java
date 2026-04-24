package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.MediaFile;
import com.nubbymedia.scmsp.entity.ProcessingJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessingJobRepository extends JpaRepository<ProcessingJob, Long> {
    List<ProcessingJob> findByMediaFileOrderByRequestedAtDesc(MediaFile mediaFile);
}

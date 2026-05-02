package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.exception.BadRequestException;
import com.nubbymedia.scmsp.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

@Service
@RequiredArgsConstructor
public class LocalFileStorageService implements FileStorageService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.private}")
    private String privateBucket;

    @Override
    public Resource loadAsResource(String relativePath) {
        try {
            String key = normalizeRelativePath(relativePath);

            GetObjectRequest request = GetObjectRequest.builder()
                    .bucket(privateBucket)
                    .key(key)
                    .build();

            ResponseBytes<?> objectBytes = s3Client.getObjectAsBytes(request);

            return new ByteArrayResource(objectBytes.asByteArray());

        } catch (NoSuchKeyException e) {
            throw new ResourceNotFoundException("File not found in S3");
        } catch (Exception e) {
            throw new RuntimeException("Failed to load file from S3", e);
        }
    }

    @Override
    public String normalizeRelativePath(String path) {
        if (path == null || path.isBlank()) {
            throw new BadRequestException("Storage path is required");
        }

        String normalized = path.replace("\\", "/").trim();

        if (normalized.startsWith("/") || normalized.contains("..")) {
            throw new BadRequestException("Storage path must be relative and safe");
        }

        return normalized;
    }
}
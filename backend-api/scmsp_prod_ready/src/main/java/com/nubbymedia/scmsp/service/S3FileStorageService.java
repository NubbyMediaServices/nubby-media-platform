package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3FileStorageService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.private}")
    private String privateBucket;

    public String uploadPrivateFile(MultipartFile file, String ownerEmail) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Upload file is required");
        }

        String originalName = file.getOriginalFilename() == null
                ? "upload"
                : file.getOriginalFilename().replace("\\", "/");

        if (originalName.contains("..")) {
            throw new BadRequestException("Invalid file name");
        }

        String safeName = originalName.substring(originalName.lastIndexOf("/") + 1)
                .replaceAll("[^a-zA-Z0-9._-]", "_");

        String safeOwner = ownerEmail == null
                ? "unknown"
                : ownerEmail.replaceAll("[^a-zA-Z0-9._@-]", "_");

        String key = "private/users/" + safeOwner + "/" + UUID.randomUUID() + "-" + safeName;

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(privateBucket)
                .key(key)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();

        s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        return key;
    }
}
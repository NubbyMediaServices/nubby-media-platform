package com.nubbymedia.scmsp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3FileStorageService {

    private final S3Client s3Client;
    private final String privateBucket;

    public S3FileStorageService(
            S3Client s3Client,
            @Value("${aws.s3.bucket.private}") String privateBucket
    ) {
        this.s3Client = s3Client;
        this.privateBucket = privateBucket;
    }

    public String uploadPrivateFile(MultipartFile file, Long userId) throws IOException {
        String key = "users/" + userId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(privateBucket)
                .key(key)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();

        s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));

        return key;
    }
}
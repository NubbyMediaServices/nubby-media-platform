package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.config.StorageProperties;
import com.nubbymedia.scmsp.exception.BadRequestException;
import com.nubbymedia.scmsp.exception.ResourceNotFoundException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class LocalFileStorageService implements FileStorageService {

    private final StorageProperties storageProperties;
    private Path rootLocation;

    @PostConstruct
    void init() {
        this.rootLocation = Paths.get(storageProperties.rootLocation()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootLocation);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to initialize storage directory", ex);
        }
    }

    @Override
    public Resource loadAsResource(String relativePath) {
        try {
            Path resolved = rootLocation.resolve(normalizeRelativePath(relativePath)).normalize();
            if (!resolved.startsWith(rootLocation)) {
                throw new BadRequestException("Invalid storage path");
            }
            if (!Files.exists(resolved)) {
                throw new ResourceNotFoundException("Stored file not found on disk");
            }
            return new UrlResource(resolved.toUri());
        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("Stored file not found on disk");
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

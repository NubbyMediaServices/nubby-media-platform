package com.nubbymedia.scmsp.service;

import org.springframework.core.io.Resource;

public interface FileStorageService {
    Resource loadAsResource(String relativePath);
    String normalizeRelativePath(String path);
}

# Repository Structure

## Purpose
This repo is organized to support developer handoff, production hardening, and a future migration from local storage to S3-compatible object storage.

## Top-Level Layout
- `src/main/java` application code
- `src/main/resources` Spring configuration
- `src/test/java` tests
- `docs` operational, architecture, and migration docs
- `handoff` developer-facing onboarding material
- `.github/workflows` CI configuration

## Storage Layer
Current:
- `FileStorageService`
- `LocalFileStorageService`

Planned:
- `S3FileStorageService`
- configurable provider selection via environment

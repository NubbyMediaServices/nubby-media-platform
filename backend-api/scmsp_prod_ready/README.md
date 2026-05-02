# Secure Media Storage Platform

Production-style backend for secure media storage and controlled file access.

## Stack
- Java 21
- Spring Boot 3.3
- MySQL 8.4
- Docker Compose
- JWT authentication

## Current Status
- Containerized application and database stack
- Seeded MySQL dataset
- JWT-based auth flow
- Local filesystem-backed storage implementation
- Access control service for ownership/share-aware file access

## Quick Start

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Set a strong `APP_JWT_SECRET`
3. Start the stack:
   ```bash
   docker compose down -v
   docker compose up -d --build
   ```
4. Verify health:
   - `http://localhost:8080/actuator/health`

## Important Docker Notes
- MySQL host port is set up for Windows-friendly use through `MYSQL_PORT=3307`
- MySQL 8.4 **must not** use `default-authentication-plugin=mysql_native_password`

## Repo Layout
- `src/main/java` - application code
- `src/main/resources` - Spring configuration
- `docs` - operational docs, schema seed, and migration notes
- `handoff` - developer handoff material
- `.github/workflows` - CI pipeline

## Current Storage Mode
The application currently uses local filesystem storage through:
- `FileStorageService`
- `LocalFileStorageService`

## S3 Readiness
This repo now includes:
- environment variable placeholders for S3
- an S3 migration guide
- a target interface/implementation plan
- a non-breaking storage abstraction path

## Next Recommended Milestones
1. Add integration tests for auth + media access
2. Implement S3-backed storage provider
3. Add presigned URL support
4. Add OpenAPI/Swagger docs
5. Add CI quality gates and deployment workflow

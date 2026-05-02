# Production Upgrade Notes

## Applied changes
- Fixed malformed `application-dev.yml`
- Added profile-driven startup in `application.yml`
- Added actuator dependency and health/info exposure
- Added `StorageProperties` config binding
- Added `FileStorageService` and `LocalFileStorageService`
- Added `AccessControlService` for centralized authorization
- Replaced placeholder secure access flow with real authenticated download endpoint
- Tightened JWT secret validation
- Externalized CORS and storage settings
- Added multistage `Dockerfile`
- Expanded `docker-compose.yml` to run app + MySQL together
- Added `.env.example`, `.dockerignore`, and `.gitignore`
- Updated README for deployment and operations

## Important notes
- The download endpoint expects `media_files.storage_path` to contain a safe relative path under the configured storage root.
- `docs/secure_media_storage_final_patched.sql` is mounted into MySQL only on first database initialization.
- For a true production rollout, add migrations, integration tests, object storage support, token refresh/revocation, and rate limiting.

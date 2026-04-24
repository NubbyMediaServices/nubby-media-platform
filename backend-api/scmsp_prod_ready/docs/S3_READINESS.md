# S3 Readiness Plan

## Current State
The application stores files through `FileStorageService` with a local implementation in `LocalFileStorageService`.

## Goal
Add an S3-backed implementation without breaking the current API surface.

## Recommended Implementation Path

1. Keep `FileStorageService` as the stable abstraction
2. Introduce `S3FileStorageService`
3. Select provider using `APP_STORAGE_PROVIDER`
4. Keep metadata in MySQL, object bytes in S3
5. Store only object keys, not full public URLs
6. Add signed download URL support later if needed

## Target Environment Variables
- `APP_STORAGE_PROVIDER=local|s3`
- `AWS_REGION`
- `AWS_S3_BUCKET`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_ENDPOINT`
- `AWS_S3_PATH_STYLE`

## Data Model Guidance
Continue using:
- `storage_path` for local mode
- `cloud_object_key` for object storage mode

## Non-Breaking Migration Strategy
- New uploads go to S3 after provider switch
- Existing local files remain readable
- Backfill old assets in batches
- Keep access control in application layer, not storage provider layer

## Suggested Future Classes
- `config/S3Properties.java`
- `service/S3FileStorageService.java`
- `config/StorageConfiguration.java`

## Future Dependency
Recommended:
- AWS SDK v2 for S3

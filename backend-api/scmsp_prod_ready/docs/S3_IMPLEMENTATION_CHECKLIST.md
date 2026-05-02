# S3 Implementation Checklist

- [ ] Add AWS SDK v2 dependency
- [ ] Add `S3Properties`
- [ ] Add `S3FileStorageService`
- [ ] Add conditional bean selection for local vs s3 provider
- [ ] Store object key in `cloud_object_key`
- [ ] Add presigned download support
- [ ] Add migration job for existing local files
- [ ] Add integration tests for S3 mode

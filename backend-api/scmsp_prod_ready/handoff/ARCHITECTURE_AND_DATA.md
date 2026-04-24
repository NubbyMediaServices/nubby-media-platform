# Architecture and Data

## Layers
Controller -> Service -> Repository -> Database

## Key Domains
- users / roles
- media files
- folders
- shared files
- tags / media tags
- processing jobs
- audit logs

## Storage Model
- file bytes: currently local filesystem
- metadata: mysql
- future cloud object store: S3-compatible bucket

## Security
- JWT auth filter
- Spring Security config
- access control service for file ownership/sharing

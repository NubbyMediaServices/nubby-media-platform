# API Surface

## Auth
- POST `/auth/register`
- POST `/auth/login`

## User
- GET `/users/me`

## Media
- GET `/media`
- GET `/media/{id}`
- POST `/media`
- POST `/media/{id}/tags`
- POST `/media/{id}/share`
- GET `/media/{id}/download`

## Audit
- GET `/audit`

## Health
- GET `/actuator/health`

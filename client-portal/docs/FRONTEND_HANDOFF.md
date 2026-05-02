# Frontend Handoff

## Purpose
This frontend is a clean, professional operator console for the current SCMSP backend.

## Current assumptions
- API base URL defaults to `http://localhost:8080`
- backend health endpoint: `/actuator/health`
- auth endpoints:
  - `POST /auth/login`
  - `POST /auth/register`
- current user endpoint:
  - `GET /users/me`
- media endpoint:
  - `GET /media`
  - `POST /media`
  - `GET /media/{id}/download`
- audit endpoint:
  - `GET /audit`

## Notes
The upload contract may need a small adjustment once tested against the exact controller signature.
The rest of the app is intentionally built around the existing backend surface and current Docker-backed environment.

## Next frontend steps
- add exact backend DTO typing once endpoints are verified in Postman
- add route-level error boundaries
- add media detail page
- add share modal
- add toast notifications
- add design system extraction

# SCMSP Frontend

Clean professional frontend for the Secure Media Storage Platform.

## Stack
- React
- Vite
- TypeScript
- Tailwind
- React Query
- React Router
- Axios

## Features
- Login / register
- Current user session
- Media dashboard
- Upload form
- Shared media view
- Audit log view
- Protected routing
- API service layer

## Run
```bash
npm install
cp .env.example .env
npm run dev
```

## Backend expectation
Default API base URL:
- `http://localhost:8080`

Health endpoint currently exposed by the backend:
- `/actuator/health`

## Notes
This frontend is built for the current local/Docker-backed backend and is intentionally storage-provider agnostic so you can move to S3 later without rebuilding the UI.

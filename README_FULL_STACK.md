# Nubby Media Full Stack Bundle

This package contains the current full stack for Nubby Media:

- backend: Spring Boot + MySQL + Docker
- frontend: premium React/Vite client portal
- database seed included in the backend docs folder

## Structure
- /backend
- /frontend

## Backend quick start
1. Go into the backend project folder
2. Copy `.env.example` to `.env`
3. Set a strong APP_JWT_SECRET
4. Run:
   docker compose down -v
   docker compose up -d --build

## Frontend quick start
1. Go into the frontend project folder
2. Copy `.env.example` to `.env`
3. Ensure:
   VITE_API_BASE_URL=http://localhost:8080
4. Run:
   npm install
   npm run dev

## Notes
- MySQL host port is configured to avoid Windows 3306 conflicts
- The backend includes the seeded SQL file in its docs/init path
- The frontend is aligned to the current backend and brand direction

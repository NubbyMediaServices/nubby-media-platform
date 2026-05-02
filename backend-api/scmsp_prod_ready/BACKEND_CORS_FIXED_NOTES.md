# Backend CORS Fixed Package

## Fixes included

### 1. Finished `.env`
This package includes a real `.env` file, not only an example.

It is configured for:
- backend: `http://localhost:8080`
- frontend: `http://localhost:5173`
- MySQL host port: `3307`
- registration enabled for local testing
- a generated JWT secret

### 2. CORS fixed in Spring Security
`SecurityConfig.java` now includes a real `CorsConfigurationSource` bean.

Allowed local origins:
- `http://localhost:5173`
- `http://localhost:8080`
- `http://127.0.0.1:5173`

### 3. Auth route compatibility
`AuthController.java` now supports both:
- `/api/auth/login`
- `/api/auth/register`
- `/auth/login`
- `/auth/register`

This keeps the backend compatible with the current frontend.

### 4. Known schema fixes
The SQL seed has been patched for known Hibernate validation mismatches:
- ID columns standardized to `BIGINT`
- `media_files.file_size_mb` uses `DOUBLE`
- `media_tags.confidence_score` uses `DOUBLE`

## Run

From the full-stack bundle root:

```powershell
docker compose -f "backend\scmsp_prod_ready\docker-compose.yml" down -v
docker compose -f "backend\scmsp_prod_ready\docker-compose.yml" up -d --build
```

## Test from browser console

```js
fetch("http://localhost:8080/actuator/health")
  .then(async r => ({ status: r.status, text: await r.text() }))
  .then(console.log)
  .catch(console.error);
```

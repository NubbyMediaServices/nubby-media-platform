# Setup and Run

## Requirements
- Docker Desktop
- Java 21
- Maven 3.9+

## Local Docker Run
```bash
docker compose down -v
docker compose up -d --build
```

## Validate
- `docker compose ps`
- `docker compose logs app`
- `docker compose logs mysql`
- `http://localhost:8080/actuator/health`

## Common Windows Issue
If local MySQL already uses port 3306, keep container host mapping on 3307.

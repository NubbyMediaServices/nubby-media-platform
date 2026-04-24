# Deployment

## Local / Developer
```bash
docker compose down -v
docker compose up -d --build
```

## Health Check
- `GET /actuator/health`

## Common Recovery Commands
```bash
docker compose logs app
docker compose logs mysql
docker compose down -v
```

## Known Good Docker Notes
- MySQL host port should avoid local 3306 conflicts on Windows
- Do not pass `default-authentication-plugin=mysql_native_password` to MySQL 8.4

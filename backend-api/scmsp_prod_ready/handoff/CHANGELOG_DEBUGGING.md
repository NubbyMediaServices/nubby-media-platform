# Changelog and Debugging Notes

## Resolved During Bring-Up
- Maven JDK issue
- DTO mapping compile failure
- Docker not installed / not running
- local port 3306 conflict
- MySQL 8.4 incompatible auth plugin flag
- unhealthy MySQL container due to bad startup config and stale volume

## Known Good Bring-Up Sequence
```bash
docker compose down -v
docker compose up -d --build
docker compose logs mysql
docker compose logs app
```

# SQL Patch Notes v2

This revision standardizes ID columns used in table definitions from INT to BIGINT for primary keys and foreign keys ending in `_id`.

## Why
The Spring Boot backend entities expect BIGINT/Long mappings, and Hibernate schema validation was failing on mismatched columns in `audit_logs` and related foreign keys.

## What changed
- Primary and foreign key columns ending in `_id` were updated from `INT` to `BIGINT`
- This includes tables such as:
  - users
  - user_roles
  - user_subscriptions
  - folders
  - media_files
  - encryption_keys
  - shared_files
  - audit_logs

## Required rebuild
After replacing the SQL file, recreate the database volume:

```powershell
docker compose -f "backend\scmsp_prod_ready\docker-compose.yml" down -v
docker compose -f "backend\scmsp_prod_ready\docker-compose.yml" up -d --build
```

# Full Stack Bundle Patch Notes

This repack applies a database schema fix for startup validation.

## Applied fix
- Changed `audit_logs.log_id` from `INT` to `BIGINT` in the SQL seed/init file so it matches the Spring/JPA entity expectation.

## Why
The backend was failing schema validation with:
- found `int`
- expected `bigint`

## After extracting this bundle
Run:

```bash
docker compose down -v
docker compose up -d --build
```

This forces MySQL to recreate the schema from the corrected SQL file.

# Contributing

## Branching
- `main` for stable releases
- feature branches for work in progress
- open pull requests with a clear summary and test notes

## Before Opening a PR
- `mvn clean package`
- `mvn test`
- verify `docker compose up -d --build` still works
- update docs for any API/config changes

## Commit Style
Prefer clear commits like:
- `feat: add secure media download`
- `fix: remove invalid mysql 8.4 auth flag`
- `docs: update s3 migration guide`

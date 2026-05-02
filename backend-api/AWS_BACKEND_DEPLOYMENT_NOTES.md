# Backend API Deployment Notes

AWS Amplify Hosting is for static frontend apps. It can host:
- `website/`
- `client-portal/`

It does not directly host this Spring Boot backend as a long-running API.

Recommended backend AWS targets:
- AWS Elastic Beanstalk
- AWS ECS Fargate
- AWS EC2

Recommended production services:
- Amazon RDS MySQL
- Amazon S3
- AWS Secrets Manager or SSM Parameter Store

Domain plan:
- `api.nubbymedia.com` -> backend API
- `app.nubbymedia.com` -> client portal
- `nubbymedia.com` -> public website

Local backend run:

```powershell
docker compose down -v
docker compose up -d --build
```

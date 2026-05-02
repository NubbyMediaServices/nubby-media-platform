# Nubby Media Whole Project — Amplify Ready

This bundle contains the complete Nubby Media stack.

## Folders

```text
website/        Public Nubby Media website, ready for AWS Amplify
client-portal/  Secure Media client portal frontend, ready for AWS Amplify
backend-api/    Spring Boot secure media backend, Docker-ready
```

## Domain plan

```text
nubbymedia.com       -> website/
www.nubbymedia.com   -> website/
app.nubbymedia.com   -> client-portal/
api.nubbymedia.com   -> backend-api deployed separately
```

## Local ports

```text
website        http://localhost:5174
client portal  http://localhost:5173
backend API    http://localhost:8080
MySQL host     localhost:3307
```

## Start locally

### Backend

```powershell
cd backend-api\scmsp_prod_ready
docker compose down -v
docker compose up -d --build
```

### Client Portal

```powershell
cd client-portal
npm install
Copy-Item .env.example .env
npm run dev
```

### Website

```powershell
cd website
npm install
Copy-Item .env.example .env
npm run dev
```

## Amplify hosting

Use AWS Amplify for:
1. `website/`
2. `client-portal/`

Each frontend folder includes an `amplify.yml`.

## Backend hosting

The backend should be deployed separately using:
- Elastic Beanstalk
- ECS Fargate
- EC2

Use:
- RDS MySQL for database
- S3 for future media storage
- Secrets Manager / Parameter Store for secrets

## Production environment variables

### Website Amplify

```env
VITE_PORTAL_PROD_URL=https://app.nubbymedia.com
VITE_USE_PROD_PORTAL=true
VITE_CONTACT_EMAIL=contact@nubbymedia.com
```

### Client Portal Amplify

```env
VITE_API_BASE_URL=https://api.nubbymedia.com
```

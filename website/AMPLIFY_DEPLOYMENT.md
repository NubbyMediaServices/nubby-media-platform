# AWS Amplify Deployment Guide — Nubby Media Website

This package is ready for AWS Amplify Hosting.

## What is included

- `amplify.yml` for AWS Amplify build settings
- `public/_redirects` for React Router fallback support
- `.env.production.example` for production environment variables
- Vite build output target: `dist`

## Amplify build settings

Amplify should use:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Required Amplify environment variables

Add these in Amplify App Settings → Environment variables:

```env
VITE_PORTAL_LOCAL_URL=http://localhost:5173
VITE_PORTAL_PROD_URL=https://app.nubbymedia.com
VITE_CONTACT_EMAIL=contact@nubbymedia.com
VITE_USE_PROD_PORTAL=true
```

## Local test before deployment

```powershell
npm install
Copy-Item .env.production.example .env
npm run build
npm run preview
```

The preview URL is usually:

```text
http://localhost:4173
```

## Deployment flow

1. Push this project to GitHub.
2. Open AWS Amplify.
3. Choose Host web app.
4. Connect your GitHub repository.
5. Select the branch to deploy, usually `main`.
6. Confirm Amplify detects the Vite app.
7. Confirm build artifact directory is `dist`.
8. Add the environment variables above.
9. Deploy.

## Domain plan

Recommended final setup:

```text
nubbymedia.com      → this marketing website
www.nubbymedia.com  → this marketing website
app.nubbymedia.com  → client portal frontend
api.nubbymedia.com  → Spring Boot backend API
```

For now, this website package points the Client Portal CTA to:

```text
https://app.nubbymedia.com
```

when `VITE_USE_PROD_PORTAL=true`.

## Notes

The contact form currently opens the visitor's email app using `mailto:`. This is safe for a static Amplify deployment. Later, it can be replaced with:
- AWS Lambda + SES
- Formspree
- backend contact endpoint
- CRM integration

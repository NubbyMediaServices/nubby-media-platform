# Deployment Map

## Public website

Folder:

```text
website/
```

Host:

```text
AWS Amplify Hosting
```

Domain:

```text
nubbymedia.com
www.nubbymedia.com
```

## Client portal

Folder:

```text
client-portal/
```

Host:

```text
AWS Amplify Hosting
```

Domain:

```text
app.nubbymedia.com
```

Environment variable:

```env
VITE_API_BASE_URL=https://api.nubbymedia.com
```

## Backend API

Folder:

```text
backend-api/
```

Host separately using:

```text
AWS Elastic Beanstalk, ECS Fargate, or EC2
```

Domain:

```text
api.nubbymedia.com
```

## Database

Use Amazon RDS MySQL.

## Media storage

Use Amazon S3 after S3 backend implementation is completed.

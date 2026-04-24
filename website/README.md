# Nubby Media Website Premium v2

React/Vite full website redesign for Nubby Media.

## Included upgrades
- High-end dark premium visual pass
- Animated hero and hover states
- Full portfolio grid layout
- Client portal branding alignment
- Contact form that opens an email draft
- Local and future production portal URLs in `.env.example`

## Run

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Website usually runs at:

```text
http://localhost:5174
```

Client portal button points to:

```text
http://localhost:5173
```

Future production portal target:

```text
https://app.nubbymedia.com
```

## Add real photos later
Replace the placeholder photo tiles with images in `public/portfolio/`, then update the `portfolio` array in `src/App.tsx`.


## AWS Amplify

This package includes `amplify.yml` and `AMPLIFY_DEPLOYMENT.md`.

For production, set:

```env
VITE_USE_PROD_PORTAL=true
VITE_PORTAL_PROD_URL=https://app.nubbymedia.com
```

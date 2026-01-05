---
description: Deploy to Firebase Hosting
---

# Deploy to Firebase Hosting

This workflow guides you through deploying the Colestia project to Firebase Hosting.

## Prerequisites

Make sure Firebase CLI is installed:
```bash
npm install -g firebase-tools
```

## Deployment Steps

1. **Login to Firebase** (first time only)
```bash
firebase login
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy to Firebase Hosting**
```bash
firebase deploy --only hosting
```

## Quick Deploy

For subsequent deployments, you can use this single command that builds and deploys:
```bash
npm run build && firebase deploy --only hosting
```

## View Your Site

After deployment, Firebase will provide a hosting URL like:
- `https://colestia.web.app`
- `https://colestia.firebaseapp.com`

## Configuration

The project is already configured with:
- **Project ID**: `colestia`
- **Public Directory**: `dist` (Vite build output)
- **SPA Rewrites**: All routes redirect to `/index.html`

## Troubleshooting

If deployment fails:
1. Verify you're logged in: `firebase login`
2. Check project configuration: `firebase projects:list`
3. Ensure build completed successfully: check `dist/` folder exists
4. Try deploying with debug flag: `firebase deploy --only hosting --debug`

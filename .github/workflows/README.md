# GitHub Actions CI/CD Setup

This directory contains the GitHub Actions workflow for automated deployment to Firebase Hosting.

## Firebase Deployment Workflow

The `deploy.yml` workflow automatically deploys both Storybook documentation and the demo app to Firebase Hosting when code is pushed to the `main` branch.

### Required Setup

Before the workflow can run successfully, you need to configure two Firebase service account secrets:

1. **Generate Firebase Service Account Keys:**

   For the Storybook project (`premium-react-loaders`):
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

   For the Demo project (`premium-react-loaders-demo`):
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

2. **Add Secrets to GitHub Repository:**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Create two secrets:

     **Secret 1:**
     - Name: `FIREBASE_SERVICE_ACCOUNT_PREMIUM_REACT_LOADERS`
     - Value: Contents of the Storybook project service account JSON

     **Secret 2:**
     - Name: `FIREBASE_SERVICE_ACCOUNT_PREMIUM_REACT_LOADERS_DEMO`
     - Value: Contents of the demo project service account JSON

### Firebase Project Configuration

The project uses two separate Firebase projects:

- **`premium-react-loaders`** → Deploys Storybook to `docs.premium-react-loaders.ishansasika.dev`
  - Configuration: Root `firebase.json` and `.firebaserc`
  - Build output: `storybook-static/`

- **`premium-react-loaders-demo`** → Deploys demo app to `premium-react-loaders.ishansasika.dev`
  - Configuration: `demo/firebase.json` and `demo/.firebaserc`
  - Build output: `demo/dist/`

### Workflow Trigger

The workflow runs automatically on every push to the `main` branch. It will:

1. Install dependencies
2. Build Storybook
3. Build demo app
4. Deploy both to Firebase Hosting

### Manual Deployment

You can also deploy manually using npm scripts:

```bash
# Deploy Storybook only
npm run deploy:storybook

# Deploy demo only
npm run demo:deploy

# Deploy both
npm run deploy:all
```

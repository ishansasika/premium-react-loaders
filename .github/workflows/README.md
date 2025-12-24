# GitHub Actions CI/CD Setup

This directory contains the GitHub Actions workflow for automated deployment to Firebase Hosting.

## Firebase Deployment Workflow

The `deploy.yml` workflow automatically deploys both Storybook documentation and the demo app to Firebase Hosting when code is pushed to the `main` branch.

### Required Setup

Before the workflow can run successfully, you need to configure the Firebase service account secret:

1. **Generate Firebase Service Account Key:**
   ```bash
   # Login to Firebase CLI
   firebase login

   # Create a service account key
   firebase init hosting:github
   ```

   Or manually create one from the Firebase Console:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

2. **Add Secret to GitHub Repository:**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the entire contents of the service account JSON file
   - Click "Add secret"

### Firebase Multi-Site Configuration

The project uses Firebase multi-site hosting with two targets:

- **`docs`** target → Deploys Storybook to `docs.premium-react-loaders.ishansasika.dev`
  - Build output: `storybook-static/`

- **`demo`** target → Deploys demo app to `premium-react-loaders.ishansasika.dev`
  - Build output: `demo/dist/`

To configure the hosting targets locally:

```bash
# Apply hosting targets to your Firebase sites
firebase target:apply hosting docs <your-docs-site-id>
firebase target:apply hosting demo <your-demo-site-id>
```

These targets are referenced in `firebase.json` and the GitHub Actions workflow.

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

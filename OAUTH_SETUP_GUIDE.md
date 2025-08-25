# OAuth2 Setup Guide for Draw.io Application

## Quick Start (Development Only)
For development purposes, you can use placeholder values to get the server running:

```env
GOOGLE_CLIENT_ID=dev_placeholder_google_client_id
GOOGLE_CLIENT_SECRET=dev_placeholder_google_client_secret
FACEBOOK_APP_ID=dev_placeholder_facebook_app_id
FACEBOOK_APP_SECRET=dev_placeholder_facebook_app_secret
GITHUB_CLIENT_ID=dev_placeholder_github_client_id
GITHUB_CLIENT_SECRET=dev_placeholder_github_client_secret
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
```

## Detailed Setup Instructions

### 1. Google OAuth2 Setup
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
5. Application type: Web application
6. Authorized redirect URIs: `http://localhost:4000/auth/google/return`
7. Copy the Client ID and Client Secret to your `.env` file

### 2. Facebook OAuth2 Setup
This section has been removed as Facebook login functionality is no longer supported.

### 3. GitHub OAuth2 Setup
1. Visit [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Application name: Your App Name
4. Homepage URL: `http://localhost:3000`
5. Authorization callback URL: `http://localhost:4000/auth/github/return`
6. Copy Client ID and Client Secret to `.env` file

### 4. JWT Secret
Generate a strong random string for JWT_SECRET (minimum 32 characters)

## Environment Variables Reference
```env
# Required for OAuth
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
FACEBOOK_APP_ID=your_actual_facebook_app_id
FACEBOOK_APP_SECRET=your_actual_facebook_app_secret
GITHUB_CLIENT_ID=your_actual_github_client_id
GITHUB_CLIENT_SECRET=your_actual_github_client_secret

# Application Configuration
HTTP_URL=http://localhost:4000
WS_URL=http://localhost:4001
FE_URL=http://localhost:3000
JWT_SECRET=your_secure_jwt_secret_here
EXP_TIME=1h
```

## Testing
After setting up the environment variables, restart your development server:
```bash
pnpm run dev
```

The OAuth login endpoints will be available but will only work properly with real credentials from the respective platforms.

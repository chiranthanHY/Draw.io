# Draw.io - Collaborative Drawing Application

A full-stack collaborative drawing application built with Next.js, Express, and WebSockets.

## Environment Setup

### Required Environment Variables

Before running the application, you need to set up environment variables. Copy the `.env.example` file to `.env` and fill in the values:

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file with your values
```

#### Core Environment Variables:
- `NEXT_PUBLIC_FE_URL`: Frontend URL (default: http://localhost:3000)
- `NEXT_PUBLIC_HTTP_URL`: Backend HTTP API URL (default: http://localhost:4000)  
- `NEXT_PUBLIC_WS_URL`: Backend WebSocket URL (default: http://localhost:4000/ws)
- `JWT_SECRET`: Secret key for JWT tokens (generate a strong random string)
- `EXP_TIME`: JWT expiration time (default: 1h)

#### Optional OAuth Variables:
- `GOOGLE_CLIENT_ID`: Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret
- `GITHUB_CLIENT_ID`: GitHub OAuth Client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth Client Secret

For detailed OAuth setup instructions, see [OAUTH_SETUP_GUIDE.md](./OAUTH_SETUP_GUIDE.md)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables (see above)

3. Run the development servers:
```bash
# Start both frontend and backend
pnpm run dev

# Or start individually
pnpm run dev --filter=draw.io-frontend
pnpm run dev --filter=http-backend
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

This is a Turborepo monorepo with the following packages/apps:

### Apps
- `draw.io-frontend`: Next.js frontend application
- `http-backend`: Express.js backend API server

### Packages
- `@repo/db`: Database client and Prisma schema
- `@repo/fullstack-common`: Shared types and utilities
- `@repo/typescript-config`: TypeScript configuration

## Development

### Building

To build all apps and packages:
```bash
pnpm run build
```

### Linting

To lint the code:
```bash
pnpm run lint
```

### Formatting

To format the code:
```bash
pnpm run format
```

## Deployment

The application can be deployed to platforms like Vercel (frontend) and Railway/Render (backend). Make sure to set the appropriate environment variables in your deployment platform.

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

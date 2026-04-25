# Shoryan Frontend (Next.js 16)

Shoryan is a bilingual blood donation platform frontend built with Next.js App Router, featuring a public website and an admin dashboard with API-backed operations.

## Tech Stack

- Next.js 16.2.2 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts (analytics visualizations)
- Server Actions for admin mutations

## Features

- Public localized pages under app/[lang]
- Arabic and English dictionaries in messages/ar.json and messages/en.json
- Admin dashboard with modular panels:
1. Overview
2. Blood Requests
3. Donors
4. Hospitals
5. Notifications
6. Analytics
- Cookie-based admin session integration
- API snapshot aggregation with mock fallback support
- Interactive admin actions:
1. Create, approve, reject, complete blood requests
2. Toggle donor active status
3. Approve/reject/suspend blood banks
4. Mark notification read, mark all as read, delete notification

## Project Structure

- app/[lang]: Localized routes and dashboard page entry
- components: UI and feature components (including dashboard panels)
- server: Server actions and API integration
- lib/i18n: Locale config and dictionary loading
- messages: Translation dictionaries
- types: Shared dashboard and app TypeScript types

## Prerequisites

- Node.js 20+
- npm 10+
- Backend API running (default expected at http://localhost:3001)

## Environment Variables

Create a .env.local file in the project root:

```bash
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

The app reads API_URL first, then NEXT_PUBLIC_API_URL as fallback.

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

- http://localhost:3000/en
- http://localhost:3000/ar

## Scripts

- npm run dev: Start local development server
- npm run lint: Run ESLint checks
- npm run build: Create production build
- npm run start: Start production server

## Authentication Flow

- Admin login is handled through server/auth.ts
- Access token is stored as an HTTP-only cookie named admin_access_token
- Dashboard server actions read token from cookies and call backend admin endpoints

## Production Readiness Checklist

1. Set production API_URL and NEXT_PUBLIC_API_URL
2. Ensure backend CORS and auth settings allow frontend domain
3. Run npm run lint and fix all issues
4. Run npm run build and verify successful output
5. Test both locales (/en and /ar)
6. Test all dashboard actions with real backend data
7. Verify cookie security flags in production (Secure, SameSite policy as needed)
8. Configure reverse proxy / SSL for deployment domain

## Deployment

Build and run:

```bash
npm run build
npm run start
```

You can deploy on any Node.js-compatible environment (Vercel, VPS, Docker, or cloud platforms).

## Notes

- If backend data is unavailable, dashboard snapshot logic can show fallback mock data to keep UI operational.
- For language additions, extend messages/*.json and locale config in lib/i18n.

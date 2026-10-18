# Content App — Bilingual Reading & Research Platform

A calm, ad-free bilingual reading and research platform for English and Bengali readers. Built with Next.js 16, NestJS, and a focus on SEO, performance, and accessibility.

## Quality Metrics

| Category | Score |
|---|---|
| Performance | 82/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

## Features

- Bilingual (English + Bengali)
- Native text-to-speech (Web Speech API)
- Reading progress tracking
- Favorites and bookmarks
- Search and category filter
- Dark mode
- Ad-free, no trackers, privacy-first
- WCAG 2.1 AA accessible

## Tech Stack

- **Frontend:** Next.js 16.4.1 + React 19 + Tailwind CSS v4 + TypeScript 5
- **State:** Zustand + TanStack Query v5
- **i18n:** next-intl (English + Bengali)
- **Backend:** NestJS 11 + JWT + class-validator
- **Storage:** Google Drive (JSON + images)
- **Hosting:** Vercel (frontend) + Render (backend)

## Project Structure

```
content-app/
├── web/                          # Next.js frontend
│   ├── app/
│   │   ├── (main)/              # Public pages
│   │   ├── (admin)/             # Admin panel
│   │   ├── layout.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── messages/                # i18n (en.json, bn.json)
│   └── types/
├── api/                          # NestJS backend
│   ├── src/
│   │   └── modules/
│   │       ├── auth/
│   │       ├── contents/
│   │       ├── categories/
│   │       ├── completed/
│   │       └── votes/
│   └── dist/
└── docs/
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Git

### 1. Clone

```bash
git clone https://github.com/arfanovidev/content-app.git
cd content-app
```

### 2. Backend Setup

```bash
cd api
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run build
npm run start
# Backend runs at http://localhost:3001
```

### 3. Frontend Setup

```bash
cd ../web
npm install
cp .env.example .env.local
# Edit .env.local
npm run build
npm run start
# Frontend runs at http://localhost:3000
```

### 4. Admin Login

- URL: http://localhost:3000/admin/login
- Username: admin
- Password: admin201234

Change these immediately in production.

## Environment Variables

### Frontend (web/.env.local)

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_DISABLE_WEATHER=true
```

### Backend (api/.env.local)

```env
PORT=3001
JWT_SECRET=your-strong-random-secret
JWT_EXPIRES_IN=7d
GOOGLE_DRIVE_FOLDER_ID=your-folder-id
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
CORS_ORIGIN=http://localhost:3000
```

## SEO

- Title, description, keywords on 14 pages
- JSON-LD: Organization, WebSite, AboutPage, Blog, BlogPosting, JobPosting, FAQPage, SoftwareApplication, Store, WebPage
- Dynamic sitemap: 22 URLs
- Robots.txt with sitemap reference
- PWA manifest
- hreflang: en-US, bn-BD, x-default
- Canonical URLs
- OpenGraph + Twitter cards

## Security

- JWT authentication (access + refresh tokens)
- Password hashing (bcrypt)
- Admin route guards
- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

## Testing

```bash
# Frontend
cd web
npx tsc --noEmit
npm run lint
npm run build

# Backend
cd api
npm run build
```

### Lighthouse

```bash
cd web
npm run build && npm run start
# In another terminal:
lighthouse http://localhost:3000 --output=html --output-path=./lh.html --chrome-flags="--headless"
```

## Deployment

### Frontend (Vercel)

1. Import repo to Vercel
2. Root Directory: web
3. Add env variables
4. Deploy

### Backend (Render)

Already deployed at https://content-api-f32c.onrender.com

Update CORS_ORIGIN env with frontend URL.

## Documentation

See docs/ folder for:

- SRS (Software Requirements Specification)
- Architecture
- Database Schema
- API Spec
- Test Plan and Test Report
- Deployment Guide
- User Manual and Admin Manual

## License

MIT License. See LICENSE file.

## Team

Built by Arfan (@arfanovidev) in Dhaka, Bangladesh.

Contact: hello@contentapp.dev

## Stats

- 35 routes
- 22 URLs in sitemap
- 14 pages with full SEO
- 0 ads, 0 trackers, 0 data selling
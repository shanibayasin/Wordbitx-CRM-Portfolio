# WordbitX CRM

WordbitX is a CRM application built with Next.js App Router, React 19, TypeScript, and Tailwind CSS 4. The CRM dashboard UI and its current interactions were migrated from the original Vite application.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and run

```bash
npm run lint
npm run build
npm run start
```

## Routes

The CRM provides login and registration pages plus dashboard, leads, pipeline, deals, customers, orders, tickets, tasks, reports, settings, and team-management routes. Record details use dynamic `[id]` routes.

The public marketing website remains a separate application. Its sign-in and sign-up calls should target the CRM `/login` and `/register` pages.

## Current data behavior

The authenticated dashboard metrics are loaded from `/api/dashboard-stats` and calculated from the signed-in user's MongoDB organization. The endpoint returns real lead, customer, deal, revenue, call, task, ticket, pipeline, and activity data; it does not fall back to sample metrics when the database is empty or unavailable.

Other CRM screens are at different integration stages: Leads use the authenticated API, while several other screens still use illustrative seed data or browser `localStorage`. Do not treat browser-local data as shared CRM persistence.

## Project layout

- `app/` — App Router pages, layouts, API handlers, and global styles
- `components/` — CRM feature and shared UI components
- `lib/` and `models/` — existing service, validation, and Mongoose code
- `src/App.tsx` — migrated CRM client experience and its existing workflows
- `types/` — shared CRM types

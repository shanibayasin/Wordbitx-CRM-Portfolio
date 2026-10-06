# WordbitX CRM Portfolio

WordbitX's marketing site and production-ready, multi-tenant CRM, built as one Next.js application with TypeScript and the App Router.

## Run locally

**Prerequisite:** Node.js

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open [http://localhost:3000](http://localhost:3000).

Run `npm run lint` to check the code, `npm run build` to create a production build, and `npm start` to serve it.

Configure CRM secrets and integrations from [`.env.example`](./.env.example). Add production values to the deployment platform's environment settings.

## CRM

The CRM dashboard and its feature components, UI, models, services, validations, and server-side API implementations live in [`src/app/dashboardwordbitx/`](./src/app/dashboardwordbitx/). The application keeps one project root: its package manifest, lockfile, Next.js configuration, deployment configuration, environment template, README, and project metadata are maintained here at the repository root.

Existing URLs, authentication, and API integrations are preserved. The dashboard remains at `/dashboard`, with CRM pages such as `/login`, `/register`, `/leads`, `/customers`, `/pipeline`, and `/settings`. Route adapters remain in `src/app/` while their CRM implementations are organized under the dashboard module.

Required CRM secrets and integrations are documented in [`.env.example`](./.env.example). Set the appropriate values in your local environment and deployment platform; do not commit real secrets.

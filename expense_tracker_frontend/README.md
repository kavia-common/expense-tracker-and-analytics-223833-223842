# Expense Tracker Frontend

Modern, lightweight React app (Ocean Professional style) with routing, services, and mock API fallback.

## Quick start

- Install dependencies: `npm install`
- Run locally: `npm start`
- Run tests: `npm test`
- Build: `npm run build`

## Environment

Copy `.env.example` to `.env` and set values:

- `REACT_APP_API_BASE` (or `REACT_APP_BACKEND_URL`) — Backend REST base URL
- `REACT_APP_FEATURE_FLAGS` — JSON e.g. `{"useMockApi":true}` to enable mock fallback in non-production
- Other optional vars included in `.env.example`

Environment is loaded via `src/config/env.js`.

## Mock API

When `REACT_APP_FEATURE_FLAGS={"useMockApi":true}` and not production, the app:
- Attempts real backend first, and if it fails, falls back to mock.
- If no backend URL is configured, uses mock directly.

Mock endpoints implemented for:
- GET `/api/expenses`
- POST `/api/expenses`
- DELETE `/api/expenses/:id`
- GET `/api/categories`

## Structure

- `src/config/env.js` — env and feature flags
- `src/services/*` — API client, domain services, mock API
- `src/components/*` — Layout, form, list, summary
- `src/pages/*` — Dashboard, Expenses, Analytics, Settings
- `src/App.js` — Routes + theme toggle

## Styling

Ocean Professional theme with subtle gradients, rounded corners, and accessible contrasts in `src/components/layout.css`. Global theme variables in `src/App.css`.

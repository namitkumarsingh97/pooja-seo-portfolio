# Kumari Pooja Portfolio

React + Tailwind + Framer Motion front-end paired with a Node/Express/Mongo backend that powers blogs and an admin console.

## Features

- Futuristic SEO portfolio with hero metrics, case studies, analytics, and testimonials.
- Blog system (`/blog`, `/blog/:slug`) that pulls from MongoDB with fallback sample content.
- Admin-only publishing studio with a Quill-based rich text editor, draft/publish workflow, and CRUD dashboard.
- Privacy policy and router-driven navigation (`react-router-dom`).
- Server structured with MVC (controllers, routes, models) plus a simple token guard for admin APIs.

## Project Structure

```
root/
├─ src/                # React app
│  ├─ components/
│  ├─ sections/
│  ├─ pages/           # Home, Blog, Admin, Privacy
│  └─ services/        # API helpers
├─ server/             # Node/Express API (MVC)
│  ├─ src/config/
│  ├─ src/controllers/
│  ├─ src/models/
│  └─ src/routes/
└─ README.md
```

## Frontend Setup

```bash
npm install
npm run dev
```

Create `.env` at the project root (optional for local override—otherwise the UI uses `window.location.origin`):

```
VITE_API_URL=http://localhost:5000
```

### Admin Login Notes

- Visit `/admin`.
- Enter the same admin email/password configured for the backend (see below).
- Once authenticated, the backend issues an HttpOnly `adminSession` cookie (SameSite Strict/Lax) so drafts can be published without exposing credentials in local storage.
- Log out to revoke the server-side session token immediately.

### Admin Publishing Workflow

- Rich text editor supports bold/italic/underline, colors, font sizes, alignment, ordered/bullet lists, and more.
- Choose `Draft` or `Published` status before saving; drafts stay hidden from the public blog until promoted.
- Posts dashboard lists every entry (draft + live) with quick actions to edit, update, delete, or refresh.
- Saving, editing, and deleting all happen through the authenticated `/api/admin/*` endpoints—no tokens stored on the client.

### Service-to-Service Publishing

- Issue JWTs with the shared secret `SERVICE_JWT_SECRET` (see `server/src/utils/jwt.js` for helper utilities).
- Call protected routes (e.g., `POST /api/posts`) with `Authorization: Bearer <jwt>` when running automations outside the browser.

## Backend Setup (`server/`)

See [`server/README.md`](./server/README.md) for detailed steps. TL;DR:

```bash
cd server
npm install
# create server/.env manually:
# PORT=5000
# MONGODB_URI=your-mongo-uri
# ADMIN_EMAIL=admin@example.com
# ADMIN_PASSWORD=superSecretPassword
# ADMIN_SESSION_TTL_MS=3600000
npm run dev
```

### Environment Variable Checklist

| Variable               | Where to set                         | Notes                                                                 |
|------------------------|--------------------------------------|-----------------------------------------------------------------------|
| `VITE_API_URL`         | root `.env`, Vercel project settings | Optional locally; on Vercel leave unset so it hits the same domain.   |
| `MONGODB_URI`          | `server/.env`, Vercel project settings | Required Mongo connection string.                                     |
| `ADMIN_EMAIL`          | `server/.env`, Vercel project settings | Must match the admin login email.                                     |
| `ADMIN_PASSWORD`       | `server/.env`, Vercel project settings | Must match the admin login password.                                  |
| `ADMIN_SESSION_TTL_MS` | `server/.env`, Vercel project settings | Optional; defaults to 1h sessions.                                    |
| `CORS_ALLOW_ORIGINS`   | `server/.env`, Vercel project settings | Optional comma-separated list for cross-origin dev (e.g. localhost:5173). |
| `SERVICE_JWT_SECRET`   | `server/.env`, Vercel project settings | Required if using service-to-service JWT auth.                        |

## Scripts

| Command            | Description                                |
|--------------------|--------------------------------------------|
| `npm run dev`      | Start the Vite dev server                  |
| `npm run build`    | Build the frontend                         |
| `npm run lint`     | Run ESLint on the frontend                 |
| `cd server && npm run dev` | Start the Express API (nodemon)    |
| `cd server && npm run start` | Start the API in production mode |

## Deployment Checklist

1. Add all environment variables listed above to both local `.env` files and Vercel Environment Variables (Production + Preview).
2. Run locally to verify:
   - `npm install && npm run dev` (frontend, uses `fetch(..., { credentials: "include" })` now).
   - `npm --prefix server install && npm --prefix server run dev` (API with HttpOnly cookies).
   - Hit `POST http://localhost:5000/api/admin/login` with `{ email, password }` and ensure the response sets an `adminSession` HttpOnly cookie (check browser devtools). Then call `POST /api/admin/logout` without any headers; the cookie should be cleared.
   - From `/admin`, log in, publish a draft, edit/update an existing story, delete one, then log out; confirm further publish attempts fail with 401 until logging back in (session token lives only in the cookie).
   - (Optional service-to-service) Generate a JWT with `SERVICE_JWT_SECRET` and hit `POST /api/posts` with `Authorization: Bearer <jwt>` to ensure server-to-server automation works.
3. Deploy to Vercel (single project with `/api` serverless functions). After deploy, re-run the login → publish → logout flow against `https://pooja-seo-portfolio.vercel.app`.
4. Share admin credentials securely with Pooja and rotate the password if needed.

Happy shipping!

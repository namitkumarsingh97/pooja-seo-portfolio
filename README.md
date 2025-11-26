# Kumari Pooja Portfolio

React + Tailwind + Framer Motion front-end paired with a Node/Express/Mongo backend that powers blogs and an admin console.

## Features

- Futuristic SEO portfolio with hero metrics, case studies, analytics, and testimonials.
- Blog system (`/blog`, `/blog/:slug`) that pulls from MongoDB with fallback sample content.
- Admin-only blog publisher with login → draft form workflow.
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

Create `.env` at the project root:

```
VITE_API_URL=http://localhost:5000
```

If `VITE_API_URL` is omitted the UI falls back to mock data.

### Admin Login Notes

- Visit `/admin`.
- Enter the same admin email/password configured for the backend (see below).
- Once authenticated, you can draft posts and publish them via the API.

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
npm run dev
```

The admin UI expects the token `email:password` (same values as above) and sends it as the Bearer token for create/update/delete blog requests.

## Scripts

| Command            | Description                                |
|--------------------|--------------------------------------------|
| `npm run dev`      | Start the Vite dev server                  |
| `npm run build`    | Build the frontend                         |
| `npm run lint`     | Run ESLint on the frontend                 |
| `cd server && npm run dev` | Start the Express API (nodemon)    |
| `cd server && npm run start` | Start the API in production mode |

## Deployment Checklist

1. Deploy the backend first (Render/Railway/etc.) and set the environment variables mentioned above.
2. Set `VITE_API_URL` on the frontend hosting provider to point at the deployed API.
3. Update DNS / hosting for the React app (Vercel, Netlify, etc.).
4. Share admin credentials securely with Pooja for ongoing blog publishing.

Happy shipping!

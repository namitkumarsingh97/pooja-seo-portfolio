# Pooja Portfolio API

REST API backing the blog/admin experience. Built with Express + Mongo + MVC.

## Setup

```bash
cd server
npm install
```

Create `.env` in this folder:

```
PORT=5000
MONGODB_URI=your-mongodb-uri
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=superSecretPassword
```

- `MONGODB_URI` – Atlas or local Mongo connection string.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` – also used by the frontend admin login (token = `email:password`).

## Scripts

| Command        | Description                 |
|----------------|-----------------------------|
| `npm run dev`  | Start nodemon API           |
| `npm run start`| Start API without nodemon   |

## Architecture

- `src/config/db.js` – DB connection helper.
- `src/controllers/postController.js` – CRUD logic.
- `src/routes/posts.js` – REST routes + simple auth guard.
- `src/models/Post.js` – Mongoose schema for blog posts.

## Deploying

1. Push this folder to your host (Render, Railway, etc.).
2. Set the same env vars (`PORT`, `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
3. Expose `/api/posts` publicly; admin routes require the Bearer token (`email:password`).

Once deployed, point the frontend’s `VITE_API_URL` at the hosted API.

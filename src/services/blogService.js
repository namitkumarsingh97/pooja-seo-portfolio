// Normalize VITE_API_URL: remove trailing slash and /api if present
// We always append /api ourselves, so VITE_API_URL should be just the backend server URL
// Example: https://your-backend-server.vercel.app or https://api.yourdomain.com
let apiBase = import.meta.env.VITE_API_URL;
if (apiBase) {
  apiBase = apiBase.replace(/\/$/, ""); // Remove trailing slash
  apiBase = apiBase.replace(/\/api$/, ""); // Remove trailing /api if present
}

const hasBrowserLocation =
  typeof globalThis !== "undefined" &&
  typeof globalThis.location === "object" &&
  typeof globalThis.location.origin === "string";

// If VITE_API_URL is not set, it will use the same origin (for local dev)
// In production, you MUST set VITE_API_URL to your backend server URL
const API_BASE =
  apiBase || (hasBrowserLocation ? globalThis.location.origin : "");

// Always append /api to make requests like /api/posts, /api/admin/login, etc.

const jsonHeaders = { "Content-Type": "application/json" };
const includeCreds = { credentials: "include" };

export const fetchPosts = async () => {
  const res = await fetch(`${API_BASE}/api/posts`);
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
};

export const fetchPost = async (slug) => {
  const res = await fetch(`${API_BASE}/api/posts/${slug}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
};

export const createPost = async (payload) => {
  const res = await fetch(`${API_BASE}/api/posts`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
    ...includeCreds,
  });
  if (!res.ok) throw new Error("Failed to publish post");
  return res.json();
};

export const adminLogin = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
    ...includeCreds,
  });
  if (!res.ok) throw new Error("Invalid admin credentials");
  return res.json();
};

export const adminLogout = async () => {
  const res = await fetch(`${API_BASE}/api/admin/logout`, {
    method: "POST",
    ...includeCreds,
  });
  if (!res.ok) throw new Error("Failed to log out");
  return res.json();
};

export const fetchAdminSession = async () => {
  const res = await fetch(`${API_BASE}/api/admin/session`, {
    ...includeCreds,
  });
  if (!res.ok) throw new Error("No active session");
  return res.json();
};

export const fetchAdminPosts = async () => {
  const res = await fetch(`${API_BASE}/api/admin/posts`, {
    ...includeCreds,
  });
  if (!res.ok) throw new Error("Failed to load admin posts");
  return res.json();
};

export const updatePost = async (id, payload) => {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
    ...includeCreds,
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: "DELETE",
    ...includeCreds,
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};

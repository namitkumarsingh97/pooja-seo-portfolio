const API_BASE = import.meta.env.VITE_API_URL;

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

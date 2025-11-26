const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

export const createPost = async (payload, token) => {
  const res = await fetch(`${API_BASE}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to publish post");
  return res.json();
};


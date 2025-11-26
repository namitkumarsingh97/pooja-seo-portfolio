import { useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import Footer from "../components/Footer";
import { profile } from "../data/profile";
import { createPost } from "../services/blogService";

const emptyDraft = {
  title: "",
  slug: "",
  heroImage: "",
  summary: "",
  tags: "",
  content: "",
};

const COOKIE_KEY = "adminToken";

const getStoredToken = () =>
  Cookies.get(COOKIE_KEY) ||
  sessionStorage.getItem(COOKIE_KEY) ||
  localStorage.getItem("adminToken") ||
  "";

const Admin = () => {
  const initialToken = getStoredToken();
  const [draft, setDraft] = useState(emptyDraft);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState(initialToken);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [isAuthed, setAuthed] = useState(Boolean(initialToken));

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!creds.email || !creds.password) {
      setStatus("Enter both email & password");
      return;
    }
    const nextToken = `${creds.email}:${creds.password}`;
    setToken(nextToken);
    Cookies.set(COOKIE_KEY, nextToken, {
      secure: true,
      sameSite: "strict",
    });
    sessionStorage.setItem(COOKIE_KEY, nextToken);
    localStorage.setItem("adminToken", nextToken);
    setAuthed(true);
    setStatus("Authenticated. You can publish posts now.");
    setCreds({ email: "", password: "" });
  };

  const handleLogout = () => {
    setToken("");
    setAuthed(false);
    Cookies.remove(COOKIE_KEY);
    sessionStorage.removeItem(COOKIE_KEY);
    localStorage.removeItem("adminToken");
    setStatus("Logged out.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setStatus("Enter admin token first (email:password)");
      return;
    }
    setStatus("Publishing…");
    try {
      const payload = {
        ...draft,
        tags: draft.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      await createPost(payload, token);
      setStatus("Published! Refresh blog to see live.");
      setDraft(emptyDraft);
    } catch (error) {
      setStatus("Failed to publish. Check console and token.");
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundFX />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Navbar contact={{ ...profile.contact, location: profile.location }} />
        <section className="mt-12 space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass-lg">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Admin
            </p>
            <h1 className="text-3xl font-heading text-white">
              {isAuthed ? "Welcome back, Pooja!" : "Blog Publisher (Beta)"}
            </h1>
            <p className="text-sm text-white/70">
              Secure area for Pooja to draft posts. Hook this to the Node/Mongo
              backend to publish live.
            </p>
          </div>
          {!isAuthed ? (
            <form
              className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              onSubmit={handleLogin}
            >
              <p className="text-sm text-white/80">
                Login with the same admin credentials defined in the server
                `.env`. This only gates the UI.
              </p>
              <label className="text-sm text-white/80">
                Admin Email
                <input
                  name="email"
                  type="email"
                  value={creds.email}
                  onChange={(e) =>
                    setCreds({ ...creds, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
                  required
                />
              </label>
              <label className="text-sm text-white/80">
                Password
                <input
                  name="password"
                  type="password"
                  value={creds.password}
                  onChange={(e) =>
                    setCreds({ ...creds, password: e.target.value })
                  }
                  className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-neon.blue to-neon.pink px-6 py-3 font-semibold"
              >
                Login
              </button>
            </form>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:border-neon.pink/40"
            >
              Log out
            </button>
          )}
          {isAuthed && (
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-white/80">
                Title
                <input
                  name="title"
                  value={draft.title}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
                  required
                />
              </label>
              <label className="text-sm text-white/80">
                Slug
                <input
                  name="slug"
                  value={draft.slug}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
                  placeholder="example-post"
                  required
                />
              </label>
            </div>
            <label className="text-sm text-white/80">
              Hero Image URL
              <input
                name="heroImage"
                value={draft.heroImage}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
              />
            </label>
            <label className="text-sm text-white/80">
              Summary
              <textarea
                name="summary"
                value={draft.summary}
                onChange={handleChange}
                rows="2"
                className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
              />
            </label>
            <label className="text-sm text-white/80">
              Tags (comma-separated)
              <input
                name="tags"
                value={draft.tags}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
              />
            </label>
            <label className="text-sm text-white/80">
              Body (Markdown)
              <textarea
                name="content"
                value={draft.content}
                onChange={handleChange}
                rows="6"
                className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-neon.blue to-neon.pink px-6 py-3 font-semibold"
            >
              Save Draft
            </button>
            {status && <p className="text-xs text-white/60">{status}</p>}
            </form>
          )}
          {!isAuthed && status && (
            <p className="text-xs text-white/60">{status}</p>
          )}
        </section>
        <Footer profile={profile} />
      </div>
    </div>
  );
};

export default Admin;


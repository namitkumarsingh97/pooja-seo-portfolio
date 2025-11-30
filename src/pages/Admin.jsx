import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import Footer from "../components/Footer";
import { profile } from "../data/profile";
import {
  createPost,
  adminLogin,
  adminLogout,
  fetchAdminSession,
  fetchAdminPosts,
  updatePost,
  deletePost,
} from "../services/blogService";

const emptyDraft = {
  title: "",
  slug: "",
  heroImage: "",
  summary: "",
  tags: "",
  content: "",
  status: "draft",
};

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }, { font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"],
  ],
};

const editorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
];

const Admin = () => {
  const [draft, setDraft] = useState(emptyDraft);
  const [statusMessage, setStatusMessage] = useState("");
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [isAuthed, setAuthed] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [savingPost, setSavingPost] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let ignore = false;
    const bootstrap = async () => {
      try {
        await fetchAdminSession();
        if (!ignore) setAuthed(true);
      } catch {
        if (!ignore) setAuthed(false);
      } finally {
        if (!ignore) setCheckingSession(false);
      }
    };
    bootstrap();
    return () => {
      ignore = true;
    };
  }, []);

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const data = await fetchAdminPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts", error);
      setStatusMessage("Failed to load posts. Please try again.");
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) {
      loadPosts();
    } else {
      setPosts([]);
      setDraft(emptyDraft);
      setEditingId(null);
    }
  }, [isAuthed, loadPosts]);

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setDraft({ ...draft, content: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!creds.email || !creds.password) {
      setStatusMessage("Enter both email & password");
      return;
    }
    setStatusMessage("Authenticating…");
    try {
      await adminLogin(creds.email.trim(), creds.password);
      setAuthed(true);
      setStatusMessage("Authenticated. You can publish posts now.");
      setCreds({ email: "", password: "" });
    } catch (error) {
      console.error("Admin login failed", error);
      setStatusMessage("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = async () => {
    if (!isAuthed) {
      setStatusMessage("No active session.");
      return;
    }
    setStatusMessage("Logging out…");
    try {
      await adminLogout();
    } catch (error) {
      console.error("Admin logout failed", error);
    } finally {
      setAuthed(false);
      setPosts([]);
      setDraft(emptyDraft);
      setEditingId(null);
      setStatusMessage("Logged out.");
    }
  };

  const normalizePayload = (statusOverride) => {
    const nextStatus = statusOverride || draft.status || "draft";
    return {
      ...draft,
      status: nextStatus,
      published: nextStatus === "published",
      tags: draft.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
  };

  const persistPost = async (statusOverride) => {
    if (savingPost) return;
    const payload = normalizePayload(statusOverride);
    setSavingPost(true);
    setStatusMessage(editingId ? "Updating post…" : "Publishing post…");
    try {
      if (editingId) {
        await updatePost(editingId, payload);
        setStatusMessage("Post updated.");
      } else {
        await createPost(payload);
        setStatusMessage(
          payload.status === "draft"
            ? "Draft saved. Publish it whenever you're ready."
            : "Post published!"
        );
      }
      await loadPosts();
      setDraft(emptyDraft);
      setEditingId(null);
    } catch (error) {
      console.error("Failed to save post", error);
      setStatusMessage("Failed to save post. Check console for details.");
    } finally {
      setSavingPost(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthed) {
      setStatusMessage("Login required before publishing.");
      return;
    }
    await persistPost();
  };

  const handleSaveDraft = async () => {
    await persistPost("draft");
  };

  const handleReset = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setStatusMessage("Editor cleared.");
  };

  const handleEditPost = (post) => {
    setDraft({
      title: post.title || "",
      slug: post.slug || "",
      heroImage: post.heroImage || "",
      summary: post.summary || "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      content: post.content || "",
      status: post.status || (post.published ? "published" : "draft"),
    });
    setEditingId(post._id);
    setStatusMessage(`Editing "${post.title}"`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmed =
      typeof window === "undefined" ||
      window.confirm("Delete this post permanently?");
    if (!confirmed) return;
    setDeletingId(postId);
    setStatusMessage("Deleting post…");
    try {
      await deletePost(postId);
      setStatusMessage("Post deleted.");
      if (editingId === postId) {
        setEditingId(null);
        setDraft(emptyDraft);
      }
      await loadPosts();
    } catch (error) {
      console.error("Failed to delete post", error);
      setStatusMessage("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  const renderAuthPanel = () => {
    if (checkingSession) {
      return (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          Checking session…
        </p>
      );
    }

    if (isAuthed) {
      return (
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:border-neon.pink/40"
        >
          Log out
        </button>
      );
    }

    return (
      <form
        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4"
        onSubmit={handleLogin}
      >
        <p className="text-sm text-white/80">
          Login with the same admin credentials defined in the server `.env`.
          Session tokens stay on the server as HttpOnly cookies.
        </p>
        <label className="text-sm text-white/80">
          Admin Email
          <input
            name="email"
            type="email"
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
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
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
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
    );
  };

  const renderPostsList = () => {
    if (!isAuthed) return null;
    if (loadingPosts) {
      return (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          Loading posts…
        </p>
      );
    }
    if (!posts.length) {
      return (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          No posts yet. Draft something new!
        </p>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-white/80">
          <thead className="text-xs uppercase tracking-[0.2em] text-white/50">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const normalizedStatus =
                post.status || (post.published ? "published" : "draft");
              return (
                <tr
                  key={post._id}
                  className="border-b border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white">{post.title}</p>
                    <p className="text-xs text-white/60">{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        normalizedStatus === "published"
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-yellow-500/20 text-yellow-200"
                      }`}
                    >
                      {normalizedStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/60">
                    {new Date(post.updatedAt || post.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-xs">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="mr-3 rounded-full border border-white/15 px-3 py-1 text-white/80 hover:border-white/40"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      disabled={deletingId === post._id}
                      className="rounded-full border border-red-400/50 px-3 py-1 text-red-200 hover:border-red-300 disabled:opacity-50"
                    >
                      {deletingId === post._id ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const draftCounts = posts.reduce(
    (acc, post) => {
      const normalizedStatus =
        post.status || (post.published ? "published" : "draft");
      acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
      return acc;
    },
    { draft: 0, published: 0 }
  );

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
            {statusMessage && (
              <p className="text-xs text-white/60">{statusMessage}</p>
            )}
          </div>
          {renderAuthPanel()}
          {isAuthed && (
            <>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="text-sm text-white/80 md:col-span-2">
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
                    Status
                    <select
                      name="status"
                      value={draft.status}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
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
                  <label className="text-sm text-white/80">
                    Hero Image URL
                    <input
                      name="heroImage"
                      value={draft.heroImage}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white"
                    />
                  </label>
                </div>
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
                  Body (Rich Text)
                  <ReactQuill
                    value={draft.content}
                    onChange={handleEditorChange}
                    theme="snow"
                    modules={editorModules}
                    formats={editorFormats}
                    className="mt-1 rounded-2xl bg-white text-black"
                  />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={savingPost}
                    className="flex-1 rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white/80 hover:border-white/40 disabled:opacity-50"
                  >
                    {savingPost && draft.status === "draft"
                      ? "Saving Draft…"
                      : "Save Draft"}
                  </button>
                  <button
                    type="submit"
                    disabled={savingPost}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-neon.blue to-neon.pink px-6 py-3 font-semibold disabled:opacity-50"
                  >
                    {savingPost && draft.status === "published"
                      ? "Saving…"
                      : editingId
                      ? "Update Post"
                      : "Publish Post"}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-2xl border border-white/15 px-6 py-3 text-sm text-white/70 hover:border-white/40"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
              <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass-lg">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      Posts Overview
                    </p>
                    <h2 className="text-2xl font-heading text-white">
                      Drafts {draftCounts.draft || 0} · Published{" "}
                      {draftCounts.published || 0}
                    </h2>
                  </div>
                  <button
                    onClick={loadPosts}
                    className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:border-white/40"
                  >
                    Refresh
                  </button>
                </div>
                {renderPostsList()}
              </div>
            </>
          )}
          {!isAuthed && statusMessage && (
            <p className="text-xs text-white/60">{statusMessage}</p>
          )}
        </section>
        <Footer profile={profile} />
      </div>
    </div>
  );
};

export default Admin;


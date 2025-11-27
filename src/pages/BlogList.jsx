import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import Footer from "../components/Footer";
import { profile } from "../data/profile";
import { blogPosts as fallbackPosts } from "../data/blogs";
import { Link } from "react-router-dom";
import { fetchPosts } from "../services/blogService";

const BlogCard = ({ post }) => {
  const displayDate =
    post.date ||
    (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "");
  return (
    <Link
    to={`/blog/${post.slug}`}
    className="group rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80 shadow-glass-lg transition hover:border-neon.blue/30"
  >
    <div className="h-48 overflow-hidden rounded-2xl">
      <img
        src={post.heroImage}
        alt={post.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50">
      {displayDate}
    </p>
    <h3 className="mt-1 text-2xl font-semibold text-white">{post.title}</h3>
    <p className="mt-2 text-sm text-white/80">{post.summary}</p>
    {Array.isArray(post.tags) && post.tags.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
    </Link>
  );
};

const BlogList = () => {
  const [posts, setPosts] = useState(fallbackPosts);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        if (data?.length) {
          setPosts(data);
        }
        setStatus("loaded");
      })
      .catch(() => {
        setStatus("fallback");
      });
  }, []);

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Navbar contact={{ ...profile.contact, location: profile.location }} />
        <header className="mt-12 space-y-3 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-white shadow-glass-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Blog
          </p>
          <h1 className="text-4xl font-heading text-white">Growth Notes</h1>
          <p className="text-sm text-white/70">
            Essays and debriefs on audits, briefs, reporting, and experiments
            shipped for clients.
          </p>
          {status === "fallback" && (
            <p className="text-xs text-white/50">
              Live API unavailable. Showing sample posts.
            </p>
          )}
        </header>
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
        <Footer profile={profile} />
      </div>
    </div>
  );
};

export default BlogList;


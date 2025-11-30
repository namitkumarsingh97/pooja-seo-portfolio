import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import Footer from "../components/Footer";
import { blogPosts as fallbackPosts } from "../data/blogs";
import { profile } from "../data/profile";
import ReactMarkdown from "react-markdown";
import { fetchPost } from "../services/blogService";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchPost(slug)
      .then((data) => {
        setPost(data);
        setStatus("loaded");
      })
      .catch(() => {
        const fallback = fallbackPosts.find((item) => item.slug === slug);
        setPost(fallback || null);
        setStatus(fallback ? "fallback" : "not-found");
      });
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="relative min-h-screen text-white">
        <BackgroundFX />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <Navbar contact={{ ...profile.contact, location: profile.location }} />
          <main className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-sm text-white/60">Loading post…</p>
          </main>
          <Footer profile={profile} />
        </div>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="relative min-h-screen text-white">
        <BackgroundFX />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <Navbar contact={{ ...profile.contact, location: profile.location }} />
          <main className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-3xl font-heading text-white">Post not found</h1>
            <Link to="/blog" className="mt-6 inline-block text-neon.blue">
              Back to blog
            </Link>
          </main>
          <Footer profile={profile} />
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const displayDate =
    post.date ||
    (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "");

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundFX />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Navbar contact={{ ...profile.contact, location: profile.location }} />
        <article className="mt-12 space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass-lg">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {displayDate}
            </p>
            <h1 className="text-4xl font-heading">{post.title}</h1>
            {!!(post.tags && post.tags.length) && (
              <div className="flex flex-wrap gap-2 text-xs">
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
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={post.heroImage}
              alt={post.title}
              className="h-72 w-full object-cover"
              loading="lazy"
            />
          </div>
          {status === "fallback" && (
            <p className="text-xs text-white/50">
              Displaying cached article while live data is unreachable.
            </p>
          )}
          <div className="prose prose-invert max-w-none">
            {/</.test(post.content || "") && />/.test(post.content || "") ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <ReactMarkdown>{post.content}</ReactMarkdown>
            )}
          </div>
          <Link to="/blog" className="text-neon.blue hover:underline">
            ← Back to Blog
          </Link>
        </article>
        <Footer profile={profile} />
      </div>
    </div>
  );
};

export default BlogPost;


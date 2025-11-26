import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const initialForm = { name: "", email: "", message: "" };

const Contact = ({ contact }) => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "Sending..." });
    try {
      const payload = {
        from: form.email,
        name: form.name,
        message: form.message,
        to: contact.email,
      };
      await fetch("https://formspree.io/f/mnqekjva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setStatus({ state: "success", message: "Message sent successfully!" });
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus({ state: "error", message: "Something went wrong. Try again." });
    }
  };

  return (
    <section id="contact" className="space-y-10">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Collaborate"
        description="Glassmorphism form wired for future Firebase/Supabase integration. Includes optional AI concierge for instant expectations."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <motion.form
          onSubmit={handleSubmit}
          className="glass-panel space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <label className="block text-sm text-slate-300">
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white focus:border-neon.blue focus:outline-none"
              required
              placeholder="Your name"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white focus:border-neon.blue focus:outline-none"
              required
              placeholder="you@email.com"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Project Notes
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-white focus:border-neon.blue focus:outline-none"
              placeholder="Share goals, timelines, or keywords…"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-neon.blue to-neon.pink px-6 py-3 font-semibold text-white shadow-lg shadow-neon.blue/30"
            disabled={status.state === "loading"}
          >
            {status.state === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status.message && (
            <p
              className={`text-sm ${
                status.state === "error" ? "text-red-400" : "text-neon.lime"
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.form>
        <div className="glass-panel space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Direct Connections
            </p>
            <p className="mt-3 text-sm text-white/70">{contact.location}</p>
            <a
              href={`tel:${contact.phone}`}
              className="mt-2 block text-lg font-semibold text-white"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-neon.blue"
            >
              {contact.email}
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">
              Social Media
            </p>
            <p className="text-xs text-slate-400">
              Follow or say hi on your favorite channel.
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-white transition hover:border-neon.blue/40"
              >
                Gmail
                <span className="text-xs text-neon.blue">{contact.email}</span>
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-white transition hover:border-neon.pink/40"
              >
                Instagram
                <span className="text-xs text-neon.pink">@kumari-pooja</span>
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-white transition hover:border-neon.blue/40"
              >
                LinkedIn
                <span className="text-xs text-neon.blue">View Profile</span>
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-2xl border border-white/15 px-4 py-3 text-center text-sm"
            >
              LinkedIn
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm text-white shadow-md"
            >
              Quick Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


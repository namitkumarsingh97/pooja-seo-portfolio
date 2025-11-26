import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import Footer from "../components/Footer";
import { profile } from "../data/profile";

const sections = [
  {
    title: "Information Collected",
    content:
      "This portfolio collects the details you submit through the contact form (name, email, project notes) strictly for collaboration purposes. No analytics or marketing trackers are installed.",
  },
  {
    title: "How It’s Used",
    content:
      "Your submitted information is routed directly to Pooja’s inbox via a secure form endpoint. It is used only to respond to inquiries, scope projects, or schedule calls.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell or share your information with third parties. Access is limited to Pooja and trusted collaborators assisting on the project you request.",
  },
  {
    title: "Retention & Removal",
    content:
      "Messages are stored for reference while we work together. You can request deletion at any time by emailing pooja639938@gmail.com.",
  },
  {
    title: "Design & Credits",
    content:
      "Portfolio content belongs to Kumari Pooja. Website experience was designed and engineered by Namit Singh using React, Tailwind CSS, and Framer Motion.",
  },
];

const PrivacyPolicy = () => (
  <div className="relative min-h-screen">
    <BackgroundFX />
    <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Navbar contact={{ ...profile.contact, location: profile.location }} />
      <main className="mt-12 space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-white/80 shadow-glass-lg backdrop-blur-2xl">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Privacy Policy
          </p>
          <h1 className="text-3xl font-heading text-white">Trust & Data Use</h1>
          <p className="text-sm text-white/70">
            Effective {new Date().getFullYear()}. This page explains how the
            information you share through this portfolio is handled.
          </p>
        </div>
        <div className="space-y-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {section.content}
              </p>
            </article>
          ))}
        </div>
        <p className="text-xs text-white/60">
          Questions about this policy? Email{" "}
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-neon.blue hover:underline"
          >
            {profile.contact.email}
          </a>{" "}
          and we’ll respond within 1–2 business days.
        </p>
      </main>
      <Footer profile={profile} />
    </div>
  </div>
);

export default PrivacyPolicy;


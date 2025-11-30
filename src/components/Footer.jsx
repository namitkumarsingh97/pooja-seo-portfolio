import { Link } from "react-router-dom";

const Footer = ({ profile }) => (
  <footer className="mt-16 border-t border-white/10 py-10 text-center text-sm text-white/70">
    <div className="space-y-3">
      <p className="text-base font-semibold text-white">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>
        Portfolio for Kumari Pooja · Designed & engineered by{" "}
        <a
          href="https://namit-singh-portfolio.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="text-neon.blue hover:underline"
        >
          Namit Singh
        </a>{" "}
        using React, Tailwind & Framer Motion.
      </p>
      <p className="text-xs text-white/60">
        Disclaimer: All content is provided for showcasing professional skills
        and should not be redistributed without permission.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/80">
        <Link to="/privacy" className="hover:text-neon.blue">
          Privacy Policy
        </Link>
        <a
          href="mailto:pooja639938@gmail.com"
          className="hover:text-neon.blue"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;


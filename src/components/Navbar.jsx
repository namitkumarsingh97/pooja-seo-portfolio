import { useState } from "react";
import { Bars3Icon, PhoneIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const homeLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Analytics", href: "#analytics" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-3 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-white/10 bg-[#141926]/80 px-6 py-3 text-white shadow-glass-lg backdrop-blur-xl">
        <Link to="/" className="font-heading text-lg font-semibold text-white">
          Pooja<span className="text-neon.blue">·SEO</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          {isHome &&
            homeLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          <Link to="/blog" className="transition hover:text-white">
            Blog
          </Link>
          <Link to="/admin" className="transition hover:text-white">
            Admin
          </Link>
          <Link to="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-4 rounded-3xl border border-white/15 bg-[#141926]/90 p-6 text-white backdrop-blur-xl lg:hidden"
          >
            {isHome &&
              homeLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            <Link to="/blog" className="text-base" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link to="/admin" className="text-base" onClick={() => setOpen(false)}>
              Admin
            </Link>
            <Link to="/privacy" className="text-base" onClick={() => setOpen(false)}>
              Privacy
            </Link>
            <div className="flex items-center justify-end">
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white"
              >
                <PhoneIcon className="h-4 w-4" />
                Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


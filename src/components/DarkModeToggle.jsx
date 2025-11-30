import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeToggle = ({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    className="group relative inline-flex h-12 w-24 items-center rounded-full border border-[#f5cac3] bg-white/70 px-3 text-[#8d5a4d] backdrop-blur-lg dark:border-white/10 dark:bg-white/10 dark:text-white"
    aria-label="Toggle dark mode"
  >
    <motion.div
      layout
      className="absolute inset-y-1 left-1 w-10 rounded-full bg-white shadow-lg"
      animate={{ x: isDark ? 48 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
    <SunIcon className="z-10 h-5 w-5 text-[#f6bd60] transition-opacity group-hover:opacity-80" />
    <MoonIcon className="z-10 ml-auto h-5 w-5 text-[#9bb1ff] transition-opacity group-hover:opacity-80" />
  </button>
);

export default DarkModeToggle;


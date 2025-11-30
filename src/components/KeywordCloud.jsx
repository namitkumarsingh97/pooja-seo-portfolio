import { motion } from "framer-motion";

const floatVariants = {
  animate: (idx) => ({
    y: [0, -10, 0],
    transition: {
      duration: 4 + idx * 0.15,
      repeat: Infinity,
      ease: "easeInOut",
      delay: idx * 0.05,
    },
  }),
};

const KeywordCloud = ({ keywords }) => (
  <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl">
    <div className="relative z-10 grid grid-cols-2 gap-3 text-white sm:grid-cols-3">
      {keywords.map((word, idx) => (
        <motion.span
          key={word}
          custom={idx}
          variants={floatVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate="animate"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 shadow-glow"
        >
          {word}
        </motion.span>
      ))}
    </div>
    <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_60%)]" />
  </div>
);

export default KeywordCloud;

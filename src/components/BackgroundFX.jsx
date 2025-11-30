import { motion } from "framer-motion";

const orbVariants = {
  animate: {
    x: ["-5%", "5%", "-3%"],
    y: ["-5%", "5%", "-4%"],
    rotate: [0, 6, -6],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const BackgroundFX = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-grid-glow bg-[size:180px_180px] opacity-20" />
    <motion.div
      variants={orbVariants}
      animate="animate"
      className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#f6bd60]/50 via-transparent to-transparent blur-[120px]"
    />
    <motion.div
      variants={orbVariants}
      animate="animate"
      className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-gradient-to-bl from-[#f28482]/45 via-transparent to-transparent blur-[140px]"
    />
  </div>
);

export default BackgroundFX;


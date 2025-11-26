import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 0.4 }}
    className="space-y-3 text-center sm:text-left"
  >
    {eyebrow && (
      <p className="text-xs uppercase tracking-[0.4em] text-neon.blue/80">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-heading font-semibold text-white sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="max-w-2xl text-base text-white/70">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;


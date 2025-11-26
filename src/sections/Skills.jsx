import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const RadialMeter = ({ label, score, narrative }) => {
  const value = Number(score) || 0;
  const clamped = Math.max(0, Math.min(100, value));
  const sweep = clamped * 3.6;
  const ringStyle = {
    background: `conic-gradient(from 270deg, #00f6ff 0deg ${sweep * 0.6}deg, #66fcf1 ${
      sweep * 0.6
    }deg ${sweep}deg, rgba(255,255,255,0.08) ${sweep}deg 360deg)`,
  };
  return (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5 }}
    className="glass-panel flex flex-col items-center gap-4 text-center"
  >
    <div className="relative h-32 w-32">
      <div
        className="absolute inset-0 rounded-full border-4 border-white/20"
        style={ringStyle}
      />
      <div className="absolute inset-4 rounded-full bg-[#0b0c14] text-white shadow-inner shadow-black/40 backdrop-blur-xl">
        <p className="flex h-full items-center justify-center text-2xl font-semibold text-white">
          {value}%
        </p>
      </div>
    </div>
    <div>
      <p className="text-lg font-semibold text-white">
        {label}
      </p>
      <p className="text-sm text-white/60">{narrative}</p>
    </div>
  </motion.div>
);
};

const Skills = ({ data }) => (
  <section id="skills" className="space-y-10">
    <SectionHeading
      eyebrow="Skills & Tools"
      title="SEO Stack, Tactics & Systems"
      description="Radial meters reflect current proficiency and the animated tags reveal the core SEO levers I pull weekly."
    />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {data.metrics.map((metric) => (
        <RadialMeter key={metric.label} {...metric} />
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-panel flex flex-wrap gap-3"
    >
      {data.tags.map((tag) => (
        <span
          key={tag}
          className="tag-chip hover:border-neon.blue/40 hover:text-slate-900 dark:hover:text-white"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  </section>
);

export default Skills;


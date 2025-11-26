import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const Experience = ({ items }) => (
  <section id="experience" className="space-y-10">
    <SectionHeading
      eyebrow="Experience"
      title="Executing Across Agency Sprints"
      description="Hands-on exposure to off-page systems, content ops, local SEO, and creative experimentation that keeps campaigns fresh."
    />
    <div className="relative space-y-6">
      <span className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-neon.blue to-neon.pink lg:block" />
      {items.map((exp, idx) => (
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          key={exp.company}
          className="glass-panel relative grid gap-4 lg:grid-cols-[220px_1fr]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                {exp.period}
              </p>
              <p className="text-xl font-semibold text-white">{exp.company}</p>
              <p className="text-sm text-white/70">{exp.title}</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            {exp.impact.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon.blue" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Experience;


import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const Projects = ({ items }) => (
  <section id="projects" className="space-y-10">
    <SectionHeading
      eyebrow="Projects"
      title="Focused Growth Initiatives"
      description="Snapshots from audits, keyword programs, and backlink revamps led for agency partners."
    />
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((project, idx) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            {project.title}
          </p>
          <p className="mt-3 text-sm text-white/80">
            {project.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-white">
            {project.impact}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;


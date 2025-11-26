import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import TypewriterKeywords from "../components/TypewriterKeywords";

const About = ({ profile }) => (
  <section id="about" className="space-y-10">
    <SectionHeading
      eyebrow="About"
      title="Story, Mission & Values"
      description={profile.summary}
    />
    <div className="grid gap-6 lg:grid-cols-3">
      <motion.div
        whileHover={{ y: -6 }}
        className="glass-panel space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-neon.blue">
          Professional Story
        </p>
        <p className="text-white/80">
          Progressed from intern to SEO executive in under two years by owning
          audits, outreach, and organic experimentation across agencies.
        </p>
        <TypewriterKeywords
          items={[
            "Intent Mapping",
            "Authority Building",
            "Analytics Reporting",
            "Creative Growth Experiments",
          ]}
        />
      </motion.div>
      <motion.div
        whileHover={{ y: -6 }}
        className="glass-panel space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-neon.pink">
          Mission
        </p>
        <p className="text-white/80">{profile.mission}</p>
        <ul className="space-y-2 text-sm text-white/70">
          {profile.expertise.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon.pink" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        whileHover={{ y: -6 }}
        className="glass-panel space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-neon.lime">
          Values
        </p>
        <div className="flex flex-wrap gap-3">
          {profile.values.map((value) => (
            <span key={value} className="tag-chip">
              {value}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Currently exploring narrative-led reporting, AI-assisted quality
          checks, and collaborative briefing systems for faster SEO wins.
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;


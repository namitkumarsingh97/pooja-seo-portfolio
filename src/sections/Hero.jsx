import { motion } from "framer-motion";
import KeywordCloud from "../components/KeywordCloud";

const stagger = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Hero = ({ profile }) => (
  <section id="home" className="relative pt-10">
    <div className="space-y-8 rounded-[2.5rem] border border-white/10 bg-[#141926]/90 p-8 text-slate-100 shadow-glass-lg backdrop-blur-3xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="space-y-8 flex-1">
          <motion.p
            {...stagger}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-white/70"
          >
            Portfolio · SEO Growth Stories
          </motion.p>
          <motion.h1
            {...stagger}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-heading font-semibold text-white sm:text-5xl lg:text-6xl"
          >
            {profile.name}
            <span className="block text-2xl font-normal text-white/80 sm:text-3xl">
              {profile.title}
            </span>
          </motion.h1>
          <motion.p
            {...stagger}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white/80"
          >
            {profile.summary}
          </motion.p>
          <motion.div
            {...stagger}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap gap-4"
          >
            {/* <a
            href={`mailto:${profile.contact.email}`}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon.blue to-neon.pink px-6 py-3 font-semibold text-white shadow-lg shadow-neon.blue/30"
          >
            Book a Strategy Call
          </a> */}
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:border-white"
            >
              LinkedIn
            </a>
          </motion.div>
          <motion.div
            {...stagger}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:grid-cols-3"
          >
            {profile.heroStats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {stat.label}
                </p>
                <p className="text-2xl font-heading text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 shadow-glow lg:mx-0"
        >
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon.blue/40 to-transparent" />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative h-full w-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        {/* <KeywordCloud keywords={keywords} /> */}
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Availability
          </p>
          <p className="mt-2 text-xl text-white">{profile.availability}</p>
          <p className="mt-3 text-sm text-white/70">{profile.mission}</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;

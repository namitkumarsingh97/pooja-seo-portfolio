import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const CaseCard = ({ item, idx }) => (
  <motion.div
    initial={{ opacity: 0, rotateX: 10, y: 40 }}
    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: idx * 0.1 }}
    className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white/80 shadow-glass-lg backdrop-blur-2xl"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-semibold text-white">
        {item.title}
      </h3>
      <span className="text-xs font-mono text-neon.blue">Case #{idx + 1}</span>
    </div>
    <div className="mt-4 space-y-3 text-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Problem
        </p>
        <p>{item.problem}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Strategy
        </p>
        <p>{item.strategy}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Execution
        </p>
        <ul className="mt-2 space-y-1">
          {item.execution.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon.pink" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-white shadow-inner shadow-white/10 sm:grid-cols-3">
      <div>
        <p className="text-xs text-slate-400">Impressions</p>
        <p className="text-xl font-semibold">{item.results.impressions}</p>
      </div>
      <div>
        <p className="text-xs text-slate-400">Ranking Boost</p>
        <p className="text-xl font-semibold">{item.results.rankings}</p>
      </div>
      <div>
        <p className="text-xs text-slate-400">CTR</p>
        <p className="text-xl font-semibold">{item.results.ctr}</p>
      </div>
    </div>
  </motion.div>
);

const CaseStudies = ({ items }) => (
  <section id="case-studies" className="space-y-10">
    <SectionHeading
      eyebrow="Case Studies"
      title="Proof of Execution"
      description="Card gallery summarizing the problem, strategy, execution, and data-backed results from recent SEO initiatives."
    />
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, idx) => (
        <CaseCard key={item.title} item={item} idx={idx} />
      ))}
    </div>
  </section>
);

export default CaseStudies;


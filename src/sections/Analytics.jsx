import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^0-9.]+/g, ""));
  const isNumeric = !Number.isNaN(numericValue);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    let start = 0;
    const target = numericValue;
    const step = () => {
      start += (target - start) * 0.2;
      if (Math.abs(target - start) < 0.5) {
        setDisplay(target);
        return;
      }
      setDisplay(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, isNumeric, numericValue]);

  if (!isNumeric) {
    return (
      <span ref={ref} className="text-4xl font-heading text-slate-900 dark:text-white">
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className="text-4xl font-heading text-slate-900 dark:text-white">
      {display.toFixed(0)}
    </span>
  );
};

const sparklineData = [32, 44, 36, 48, 52, 61, 70, 82];

const Analytics = ({ kpis }) => (
  <section id="analytics" className="space-y-10">
    <SectionHeading
      eyebrow="Analytics"
      title="Achievements & KPI Dashboard"
      description="Real metrics visualized through animated counters and lightweight charts for instant visibility into SEO impact."
    />
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="glass-panel space-y-6">
        <div className="flex flex-wrap gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="min-w-[150px] flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-white"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                {kpi.label}
              </p>
              <AnimatedNumber value={kpi.value} />
              <p className="text-xs text-white/70">
                {kpi.descriptor}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-inner shadow-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Visibility Index
          </p>
          <div className="mt-4 flex items-end gap-2">
            {sparklineData.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                whileInView={{ height: point }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, type: "spring", stiffness: 80 }}
                className="w-6 rounded-t-full bg-gradient-to-t from-neon.pink to-neon.blue"
                style={{ minHeight: `${point}px` }}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-white/70">
            Snapshot of ranking boost for commercial cluster keywords tracked over
            the last 8 sprints.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="glass-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Audit Notes
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>+92 Sitebulb score after addressing duplicate metas & 404s.</li>
            <li>Technical backlog prioritized via RICE scoring for clarity.</li>
            <li>Internal link sculpting improved crawl depth for 18 URLs.</li>
          </ul>
        </div>
        <div className="glass-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Reporting Stack
          </p>
          <p className="mt-3 text-sm text-white/80">
            Weekly Looker Studio board blending GA4, Search Console, and backlink
            trust metrics for leadership-ready snapshots.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Analytics;


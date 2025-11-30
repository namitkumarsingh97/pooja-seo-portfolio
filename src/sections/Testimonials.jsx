import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const Testimonials = ({ items }) => (
  <section id="testimonials" className="space-y-10">
    <SectionHeading
      eyebrow="Testimonials"
      title="Trusted by Growth Leads"
      description="Social proof sourced from team leads, founders, and strategists across engagements."
    />
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((testimonial, idx) => (
        <motion.div
          key={testimonial.person}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur-xl"
        >
          <p className="text-sm text-white/80">
            {testimonial.quote}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border border-white/20">
              <img
                src={testimonial.avatar}
                alt={testimonial.person}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-semibold text-white">
                {testimonial.person}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {testimonial.title}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Testimonials;


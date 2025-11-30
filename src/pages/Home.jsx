import {
  profile,
  keywordCloud,
  skills,
  experiences,
  caseStudies,
  analyticsKPIs,
  testimonials,
  projects,
} from "../data/profile";
import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import ScrollProgress from "../components/ScrollProgress";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import CaseStudies from "../sections/CaseStudies";
import Analytics from "../sections/Analytics";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Projects from "../sections/Projects";
import { Suspense } from "react";

const SectionFallback = ({ label }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300">
    Loading {label}…
  </div>
);

const Home = () => (
  <div className="relative min-h-screen transition-colors duration-500">
    <BackgroundFX />
    <ScrollProgress />
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Navbar contact={{ ...profile.contact, location: profile.location }} />
      <main className="mt-12 space-y-16">
        <Hero profile={profile} keywords={keywordCloud} />
        <About profile={profile} />
        <Skills data={skills} />
        <Experience items={experiences} />
        <Suspense fallback={<SectionFallback label="Case Studies" />}>
          <CaseStudies items={caseStudies} />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Projects" />}>
          <Projects items={projects} />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Analytics" />}>
          <Analytics kpis={analyticsKPIs} />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Testimonials" />}>
          <Testimonials items={testimonials} />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Contact" />}>
          <Contact contact={{ ...profile.contact, location: profile.location }} />
        </Suspense>
      </main>
      <Footer profile={profile} />
    </div>
  </div>
);

export default Home;


"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Category = "all" | "residential" | "specialist" | "motorised" | "commercial" | "healthcare" | "resources";

type Service = {
  title: string;
  description: string;
  href: string;
  category: Category;
  label: string;
  icon: string;
  featured?: boolean;
};

const categories: { id: Category; label: string; count: string }[] = [
  { id: "all", label: "All", count: "15" },
  { id: "residential", label: "Residential", count: "4" },
  { id: "specialist", label: "Specialist", count: "3" },
  { id: "motorised", label: "Motorised", count: "1" },
  { id: "commercial", label: "Commercial", count: "1" },
  { id: "healthcare", label: "Healthcare", count: "1" },
  { id: "resources", label: "Tools & support", count: "5" },
];

const services: Service[] = [
  { title: "Residential Curtain Track Installation", description: "Precision fitting for bedrooms, living rooms, patio doors, apartments and whole-home projects.", href: "/services/residential-curtain-track-installation", category: "residential", label: "Home", icon: "home", featured: true },
  { title: "Curtain Track Installation", description: "Professional fitting for straight, shaped, ceiling-mounted and wall-mounted systems.", href: "/services/curtain-track-installation", category: "residential", label: "Core", icon: "track" },
  { title: "Ceiling-Mounted Tracks", description: "Clean ceiling-fixed installations planned around structure, load, access and clearance.", href: "/services/ceiling-mounted-curtain-track-installation", category: "residential", label: "Ceiling", icon: "ceiling" },
  { title: "Wall-Mounted Tracks", description: "Correct projection, bracket spacing and secure fixing for wall-mounted curtain tracks.", href: "/services/wall-mounted-curtain-track-installation", category: "residential", label: "Wall", icon: "wall" },
  { title: "Bay Window Curtain Tracks", description: "Measuring, bending and fitting for angled, curved, square and unusual bay windows.", href: "/services/bay-window-curtain-track-installation", category: "specialist", label: "Shaped", icon: "bay", featured: true },
  { title: "Wave Curtain Track Installation", description: "Track positioning and carrier spacing for smooth, consistent wave curtain folds.", href: "/services/wave-curtain-track-installation", category: "specialist", label: "Wave", icon: "wave" },
  { title: "Double Curtain Track Installation", description: "Layered systems for voiles, blackout curtains and decorative curtains with planned spacing.", href: "/services/double-curtain-tracks", category: "specialist", label: "Layered", icon: "double" },
  { title: "Motorised Curtain Track Installation", description: "Battery, mains and smart-home curtain systems with motor, controls and track planning.", href: "/motorised-curtain-tracks", category: "motorised", label: "Smart", icon: "motor", featured: true },
  { title: "Commercial Curtain Track Installation", description: "Hotels, offices, developers, landlords and multi-room contract installations.", href: "/services/commercial-curtain-track-installation", category: "commercial", label: "Contract", icon: "building", featured: true },
  { title: "Healthcare Curtain Track Installation", description: "Privacy, separation and medical curtain-track systems for care environments.", href: "/services/healthcare-curtain-track-installation", category: "healthcare", label: "Clinical", icon: "health", featured: true },
  { title: "Planning Tools", description: "Measure track length, projection, bracket positions, bay layouts and double-track spacing.", href: "/tools", category: "resources", label: "Tools", icon: "calculator" },
  { title: "Track Brands", description: "Explore Forest Group, Silent Gliss, Goelst and individual track-system guides.", href: "/brands", category: "resources", label: "Brands", icon: "brand" },
  { title: "Trade Centre", description: "Support for curtain makers, designers, contractors, developers and facilities teams.", href: "/trade", category: "resources", label: "Trade", icon: "trade" },
  { title: "Areas We Cover", description: "Find TrackFit service coverage across cities and regions throughout England.", href: "/areas", category: "resources", label: "Areas", icon: "pin" },
  { title: "Case Studies", description: "See completed-project knowledge across different rooms, systems and locations.", href: "/case-studies", category: "resources", label: "Projects", icon: "case" },
];

const iconPaths: Record<string, React.ReactNode> = {
  home: <><path d="M3 11 12 4l9 7"/><path d="M5.5 10v10h13V10"/><path d="M9.5 20v-6h5v6"/></>,
  track: <><path d="M3 7h18"/><path d="M6 7v9m4-9v9m4-9v9m4-9v9"/><circle cx="6" cy="18" r="1"/><circle cx="10" cy="18" r="1"/><circle cx="14" cy="18" r="1"/><circle cx="18" cy="18" r="1"/></>,
  ceiling: <><path d="M3 5h18"/><path d="M6 5v11m6-11v11m6-11v11"/><path d="M4 19h16"/></>,
  wall: <><path d="M5 3v18"/><path d="M5 8h14"/><path d="M19 8v8"/><circle cx="19" cy="18" r="1"/></>,
  bay: <><path d="M4 19V9l4-3 4 3 4-3 4 3v10"/><path d="M4 19h16"/></>,
  wave: <path d="M2 15c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6"/>,
  double: <><path d="M3 7h18M3 11h18"/><path d="M6 11v7m4-7v7m4-7v7m4-7v7"/></>,
  motor: <><rect x="3" y="8" width="12" height="8" rx="2"/><path d="M15 10h3l3 2v2l-3 2h-3"/><path d="M7 11v2m4-2v2"/></>,
  building: <><path d="M5 21V4h10v17M15 9h4v12"/><path d="M8 8h1m3 0h1M8 12h1m3 0h1M8 16h1m3 0h1"/></>,
  health: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></>,
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2"/></>,
  brand: <><path d="M5 5h10l4 4v10H5z"/><path d="M15 5v4h4"/></>,
  trade: <><path d="m4 7 4-4 4 4-4 4z"/><path d="m12 13 5-5 3 3-5 5"/><path d="M5 19h14"/></>,
  pin: <><path d="M12 21s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z"/><circle cx="12" cy="11" r="2"/></>,
  case: <><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V4h6v3M3 12h18"/></>,
};

function Icon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">{iconPaths[name]}</svg>;
}

const questions = [
  { key: "project", title: "What type of project is this?", options: [["home", "Home"], ["commercial", "Commercial"], ["healthcare", "Healthcare"]] },
  { key: "opening", title: "What shape is the opening?", options: [["straight", "Straight"], ["bay", "Bay or curved"], ["wide", "Wide doors"]] },
  { key: "operation", title: "How should the curtains operate?", options: [["manual", "Manual"], ["motorised", "Motorised"]] },
  { key: "layers", title: "How many curtain layers?", options: [["single", "Single track"], ["double", "Double track"]] },
];

function resultFor(a: Record<string, string>) {
  if (a.operation === "motorised") return services.find((s) => s.category === "motorised")!;
  if (a.project === "healthcare") return services.find((s) => s.category === "healthcare")!;
  if (a.project === "commercial") return services.find((s) => s.category === "commercial")!;
  if (a.opening === "bay") return services.find((s) => s.title.startsWith("Bay"))!;
  if (a.layers === "double") return services.find((s) => s.title.startsWith("Double"))!;
  return services[0];
}

export default function ServicesExperience() {
  const [active, setActive] = useState<Category>("all");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const filtered = useMemo(() => active === "all" ? services : services.filter((s) => s.category === active), [active]);
  const complete = step >= questions.length;
  const recommendation = resultFor(answers);

  function choose(key: string, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep((current) => current + 1);
  }

  return <>
    <section id="finder" className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="grid overflow-hidden rounded-[36px] border border-white/10 bg-[#101210] shadow-2xl shadow-black/30 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#B8F23D]/10 blur-3xl" />
          <div className="relative">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Interactive service finder</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Find the right route in under a minute.</h2>
            <p className="mt-5 leading-8 text-white/55">A focused, one-question-at-a-time journey recommends the most relevant TrackFit service.</p>
            <div className="mt-10 flex gap-2">{questions.map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full transition ${index < step ? "bg-[#B8F23D]" : "bg-white/10"}`} />)}</div>
          </div>
        </div>

        <div className="min-h-[440px] p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {!complete ? <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <p className="text-sm font-semibold text-white/40">Question {step + 1} of {questions.length}</p>
              <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{questions[step].title}</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">{questions[step].options.map(([value, label]) => <button key={value} type="button" onClick={() => choose(questions[step].key, value)} className="group flex min-h-24 items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.035] p-5 text-left text-lg font-semibold transition hover:-translate-y-1 hover:border-[#B8F23D]/50 hover:bg-[#B8F23D]/[0.07]">
                <span>{label}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/40 transition group-hover:border-[#B8F23D]/40 group-hover:text-[#B8F23D]">→</span>
              </button>)}</div>
              {step > 0 && <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm font-semibold text-white/45 hover:text-white">← Previous question</button>}
            </motion.div> : <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <span className="inline-flex rounded-full bg-[#B8F23D] px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#080A09]">Recommended route</span>
              <div className="mt-6 flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#B8F23D]/30 bg-[#B8F23D]/10 text-[#B8F23D]"><Icon name={recommendation.icon} /></div><div><h3 className="text-3xl font-semibold sm:text-4xl">{recommendation.title}</h3><p className="mt-4 max-w-2xl leading-8 text-white/60">{recommendation.description}</p></div></div>
              <div className="mt-8 flex flex-wrap gap-3"><Link href={recommendation.href} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Explore recommendation →</Link><button type="button" onClick={() => { setStep(0); setAnswers({}); }} className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Start again</button></div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </section>

    <section className="border-y border-white/10 bg-white/[0.018]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
       
        <div className="mt-9 flex gap-3 overflow-x-auto pb-3">{categories.map((category) => <button key={category.id} type="button" onClick={() => setActive(category.id)} className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition ${active === category.id ? "border-[#B8F23D] bg-[#B8F23D] text-[#080A09]" : "border-white/10 bg-white/[0.035] text-white/65 hover:border-white/25 hover:text-white"}`}>{category.label} <span className="ml-2 opacity-55">{category.count}</span></button>)}</div>

        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">{filtered.map((service, index) => <motion.div key={service.href} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25, delay: index * 0.025 }}>
            <Link href={service.href} className={`group relative flex min-h-[320px] h-full flex-col justify-between overflow-hidden rounded-[30px] border p-7 transition hover:-translate-y-1 ${service.featured ? "border-[#B8F23D]/25 bg-[#B8F23D]/[0.065]" : "border-white/10 bg-white/[0.03] hover:border-[#B8F23D]/30"}`}>
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#B8F23D]/0 blur-3xl transition group-hover:bg-[#B8F23D]/10" />
              <div className="relative"><div className="flex items-start justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#B8F23D]/25 bg-[#B8F23D]/10 text-[#B8F23D] transition group-hover:scale-110 group-hover:rotate-2"><Icon name={service.icon} /></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/45">{service.label}</span></div><h3 className="mt-8 text-2xl font-semibold leading-tight">{service.title}</h3><p className="mt-4 leading-7 text-white/52">{service.description}</p></div>
              <div className="relative mt-8 flex items-center justify-between font-semibold"><span className="transition group-hover:text-[#B8F23D]">Explore service</span><span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition group-hover:translate-x-1 group-hover:border-[#B8F23D]/40 group-hover:text-[#B8F23D]">→</span></div>
            </Link>
          </motion.div>)}</AnimatePresence>
        </motion.div>
      </div>
    </section>
  </>;
}

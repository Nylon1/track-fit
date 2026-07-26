import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle = "Healthcare and Medical Curtain Track Installation UK";
const pageDescription = "Healthcare curtain-track installation for hospitals, clinics, treatment rooms, care homes and medical facilities, including Forest MTS medical privacy tracks.";
const pagePath = "/services/healthcare-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "healthcare curtain track systems",
    "medical curtain tracks",
    "hospital curtain track installers",
    "hospital cubicle curtain tracks",
    "privacy curtain tracks",
    "care home curtain tracks",
    "treatment room curtain tracks",
    "Forest MTS medical track",
    "NHS curtain track installation",
  ],
});

const applications = [
  ["Hospital wards", "Flexible privacy-track layouts around patient beds, treatment spaces and shared clinical rooms."],
  ["Clinics and treatment rooms", "Track systems used to create temporary privacy zones without constructing permanent partitions."],
  ["Care homes", "Robust, maintainable curtain-track installations for rooms and shared care environments."],
  ["Rehabilitation centres", "Privacy and changing areas that can be adapted around the available room layout."],
  ["Changing and sanitary rooms", "Curved or straight separation tracks for practical privacy screening."],
  ["Healthcare window curtains", "Manual and cord-operated window-curtain tracks selected according to load, access and operation."],
] as const;

const systems = [
  { title: "Forest MTS Medical Track System", description: "Forest’s dedicated separation-track family for medical facilities, sanitary rooms and flexible privacy layouts. Available in Standard, Flat and Round variants.", href: "/brands/forest-group/mts", featured: true },
  { title: "Forest KS", description: "A compact manual track that may be considered for suitable healthcare window-curtain applications using light or medium curtains.", href: "/brands/forest-group/ks", featured: false },
  { title: "Forest CS", description: "A heavier-duty manual contract system for suitable healthcare curtains where the curtain load or usage requires a stronger profile.", href: "/brands/forest-group/cs", featured: false },
  { title: "Forest CCS", description: "A heavy-duty cord-operated contract track published by Forest for healthcare and other intensive-use environments.", href: "/brands/forest-group/ccs", featured: false },
] as const;

const planningChecks = [
  "Track route, bed positions and required privacy coverage",
  "Ceiling structure and suitable fixing support",
  "Suspension requirements and interaction with building services",
  "Curtain weight, finished drop and operational frequency",
  "Bend geometry and carrier movement through the complete route",
  "Access for cleaning, inspection and curtain replacement",
  "Fire, infection-control and fabric requirements specified by the client",
  "Working access, room closures and installation phasing",
];

const steps = [
  ["01", "Initial project review", "Share drawings, room schedules, photographs, curtain information and the intended privacy layout."],
  ["02", "Survey and specification", "TrackFit reviews the fixing route, ceiling construction, track shape, access and proposed Forest system."],
  ["03", "Supply and installation planning", "The project is planned around track production, access equipment, room availability and any phased programme."],
  ["04", "Installation and testing", "Tracks are fixed, aligned and tested through the complete route before project handover."],
] as const;

const faqs = [
  { question: "Does TrackFit install medical curtain tracks?", answer: "TrackFit can assess, supply and install suitable manual healthcare and privacy-track systems, including Forest MTS, subject to the project specification, site conditions and programme." },
  { question: "Is Forest MTS designed for healthcare environments?", answer: "Yes. Forest describes MTS as a medical and separation-track system for hospitals, healthcare facilities, sanitary rooms and other spaces requiring flexible privacy division." },
  { question: "Is Forest MTS antimicrobial?", answer: "Forest states that the MTS Standard variant uses a BioCote antimicrobial treatment. The exact variant and current manufacturer documentation should be confirmed for each project." },
  { question: "Are these tracks NHS approved?", answer: "TrackFit does not make a general NHS-approved claim. The exact system, components, curtain fabric, fire performance and project requirements must be checked against the relevant NHS, healthcare-estate or contractor specification." },
  { question: "Can the medical tracks be curved?", answer: "Forest publishes MTS as bendable for custom layouts. The final bend geometry, suspension arrangement and room layout must be reviewed before manufacture and installation." },
  { question: "Does TrackFit install motorised healthcare tracks?", answer: "TrackFit currently focuses on suitable manual and cord-operated curtain-track installations and does not advertise motorised-track installation." },
];

export default function HealthcareCurtainTrackPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Healthcare curtain tracks", path: pagePath }]} />
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">Healthcare and medical environments</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Healthcare curtain-track installation across the UK.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">TrackFit supplies and installs suitable manual healthcare, privacy and separation curtain-track systems for hospitals, clinics, treatment rooms, care homes and specialist facilities.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Discuss a healthcare project →</Link>
              <Link href="/brands/forest-group/mts" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Explore Forest MTS</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Privacy and separation systems for different care environments.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {applications.map(([title, description]) => <article key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{description}</p></article>)}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0E100F]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Forest systems that may support healthcare projects.</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {systems.map((system) => <Link key={system.href} href={system.href} className={['rounded-[30px] border p-7', system.featured ? 'border-[#B8F23D]/30 bg-[#B8F23D]/[0.08]' : 'border-white/10 bg-white/[0.035]'].join(' ')}>{system.featured && <span className="rounded-full bg-[#B8F23D] px-3 py-1 text-xs font-bold uppercase text-[#080A09]">Dedicated medical system</span>}<h3 className="mt-6 text-3xl font-semibold">{system.title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{system.description}</p><span className="mt-7 inline-flex font-semibold text-[#B8F23D]">View system guide →</span></Link>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Survey and compliance</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">What must be checked before installation.</h2><p className="mt-5 leading-8 text-[#AAACA4]">Healthcare projects should be specified as coordinated systems. The track alone does not determine suitability.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{planningChecks.map((check, index) => <article key={check} className="flex gap-4 rounded-[24px] border border-white/10 bg-white/[0.035] p-5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">{index + 1}</span><p className="leading-7 text-[#C8C8C1]">{check}</p></article>)}</div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A clear route from drawings to handover.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{steps.map(([number, title, description]) => <article key={number} className="rounded-[28px] border border-white/10 bg-[#080A09] p-6"><span className="text-sm font-bold text-[#B8F23D]">{number}</span><h3 className="mt-8 text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{description}</p></article>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">{faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary><p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p></details>)}</div>
        </section>

        <section className="border-t border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="rounded-[36px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.09] px-6 py-14 text-center sm:px-10 lg:py-20"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Discuss your project</p><h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Planning a healthcare curtain-track installation?</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8BAB2]">Send the project location, drawings, photographs, track layout and curtain information for an initial review.</p><Link href="/quote/postcode" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]">Start the project enquiry →</Link></div></div></section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle =
  "Curtain Track Installation Services UK";

const pageDescription =
  "Explore TrackFit curtain-track installation services, planning tools, brand guides, case studies and nationwide fitting coverage across England.";

const pagePath = "/services";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "curtain track installation services",
    "curtain track fitters UK",
    "professional curtain track fitting",
    "wave curtain track installation",
    "bay window curtain tracks",
    "ceiling mounted curtain tracks",
    "wall mounted curtain tracks",
    "commercial curtain track installation",
    "curtain track fitting tools",
    "Forest curtain track installer",
  ],
});

const services = [
  {
    title: "Residential Curtain Track Installation",
    description:
      "Professional track fitting for houses, apartments, bedrooms, living rooms, patio doors and complete-property projects.",
    href: "/services/residential-curtain-track-installation",
    label: "Residential",
  },
  {
    title: "Curtain Track Installation",
    description:
      "Professional fitting for straight, shaped, ceiling-mounted and wall-mounted curtain-track systems.",
    href: "/services/curtain-track-installation",
    label: "Core service",
  },
  {
    title: "Wave Curtain Track Installation",
    description:
      "Track positioning, projection and carrier spacing for consistent wave curtain folds.",
    href: "/services/wave-curtain-track-installation",
    label: "Wave systems",
  },
  {
    title: "Bay Window Curtain Tracks",
    description:
      "Specialist measuring, bending and fitting for angled, curved, square and unusually shaped bays.",
    href: "/services/bay-window-curtain-track-installation",
    label: "Shaped windows",
  },
  {
    title: "Ceiling-Mounted Curtain Tracks",
    description:
      "Ceiling-fixed systems assessed for structural support, curtain weight, access and clearance.",
    href: "/services/ceiling-mounted-curtain-track-installation",
    label: "Ceiling fixed",
  },
  {
    title: "Wall-Mounted Curtain Tracks",
    description:
      "Wall-mounted installation with suitable bracket projection, fixing strength and positioning.",
    href: "/services/wall-mounted-curtain-track-installation",
    label: "Wall fixed",
  },
   {
    title: "Motorised Curtain Track Installation",
    description:
      "Professional installation for battery-operated and smart-home controlled curtain systems.",
    href: "/motorised-curtain-tracks",
    label: "Motorised",
  },
  {
    title: "Commercial Curtain Track Installation",
    description:
      "Installation for hotels, offices, care homes, landlords, developers and public environments.",
    href: "/services/commercial-curtain-track-installation",
    label: "Commercial",
  },
  {
    title: "Double Curtain Track Installation",
    description:
      "Separate tracks for voile, blackout and decorative curtain layers with properly planned spacing.",
    href: "/services/double-curtain-tracks",
    label: "Layered curtains",
  },
  {
  title: "Healthcare Curtain Track Installation",
  description:
    "Medical, privacy and separation-track installation for hospitals, clinics, treatment rooms and care environments.",
  href: "/services/healthcare-curtain-track-installation",
  label: "Healthcare",
},
];

const tools = [
  {
    title: "Curtain Track Length Calculator",
    description:
      "Estimate the required track length from the opening width, returns and curtain stack-back.",
    href: "/tools/curtain-track-length-calculator",
  },
  {
    title: "Bay Window Track Calculator",
    description:
      "Plan the sections and measurements required for angled and shaped bay windows.",
    href: "/tools/bay-window-curtain-track-calculator",
  },
  {
    title: "Bracket Placement Calculator",
    description:
      "Estimate sensible support positions across a proposed curtain-track installation.",
    href: "/tools/bracket-placement-calculator",
  },
  {
    title: "Track Projection Calculator",
    description:
      "Calculate clearance from handles, radiators, sills, blinds and window frames.",
    href: "/tools/curtain-track-projection-calculator",
  },
  {
    title: "Double Track Spacing Calculator",
    description:
      "Plan the distance between voile, blackout and decorative curtain tracks.",
    href: "/tools/double-curtain-track-spacing-calculator",
  },
  {
    title: "Curtain Track Fixing Finder",
    description:
      "Understand the fixing considerations for plasterboard, timber, brick and concrete.",
    href: "/tools/curtain-track-fixing-finder",
  },
  {
  title: "Healthcare Curtain Track Specification Checker",
  description:
    "Plan track layout, quantities, ceiling requirements, system direction and missing healthcare project information.",
  href: "/tools/healthcare-curtain-track-specification-checker",
  label: "Healthcare",
},
];

const brands = [
  {
    name: "Forest Group",
    description:
      "TrackFit’s principal curtain-track supplier, covering KS, CS, recessed, multi-channel, wave and cord-operated systems.",
    href: "/brands/forest-group",
    featured: true,
  },
  {
    name: "Silent Gliss",
    description:
      "Independent fitting and selection guidance for manual and cord-operated Silent Gliss systems.",
    href: "/brands/silent-gliss",
    featured: false,
  },
  {
    name: "Goelst",
    description:
      "Planning and installation guidance for Goelst manual aluminium curtain tracks.",
    href: "/brands/goelst",
    featured: false,
  },
];

const areaGroups = [
  {
    title: "London and the South East",
    description:
      "London, Surrey, Kent, Essex, Hertfordshire, Buckinghamshire, Berkshire, Hampshire and Sussex.",
  },
  {
    title: "North West England",
    description:
      "Manchester, Blackburn, Preston, Bolton, Burnley, Liverpool, Chester, Salford and Lancashire.",
  },
  {
    title: "Midlands",
    description:
      "Birmingham, Coventry, Leicester, Nottingham, Derby, Wolverhampton and surrounding areas.",
  },
  {
    title: "Yorkshire and the North",
    description:
      "Leeds, Sheffield, Bradford, York, Harrogate, Hull, Newcastle and neighbouring areas.",
  },
  {
    title: "South and South West",
    description:
      "Bristol, Bath, Oxford, Cambridge, Southampton, Portsmouth and surrounding locations.",
  },
  {
    title: "Nationwide project coverage",
    description:
      "TrackFit considers residential, trade and commercial installation projects across England.",
  },
];

const caseStudies = [
  {
    title:
      "Forest KS Bay-Window Track Installation",
    location: "Blackburn",
    href: "/case-studies/forest-ks-bay-window-blackburn",
  },
  {
    title:
      "Heavy Curtain-Track Installation",
    location: "Manchester",
    href: "/case-studies/heavy-curtain-track-manchester",
  },
  {
    title:
      "Long Track Across Patio Doors",
    location: "Hertfordshire",
    href: "/case-studies/patio-door-track-hertfordshire",
  },
];

const tradeSectors = [
  "Curtain makers and workrooms",
  "Interior designers",
  "Hotels and hospitality",
  "Care homes",
  "Developers and contractors",
  "Serviced apartments",
  "Facilities managers",
  "Landlords and agents",
];

const process = [
  {
    number: "01",
    title: "Enter your postcode",
    description:
      "Start by confirming the location of the installation.",
  },
  {
    number: "02",
    title: "Describe the project",
    description:
      "Tell us the track type, quantity, approximate size and curtain requirements.",
  },
  {
    number: "03",
    title: "Upload photographs",
    description:
      "Photographs help us assess fixing surfaces, access and possible obstructions.",
  },
  {
    number: "04",
    title: "Receive the next steps",
    description:
      "TrackFit reviews the information and confirms the appropriate quotation process.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Services",
            path: pagePath,
          },
        ]}
      />

      <SiteHeader />

      <main className="min-h-screen overflow-hidden bg-[#080A09] text-[#F4F1E8]">
        <section className="relative border-b border-white/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute right-[-15%] top-[-10%] h-[620px] w-[620px] rounded-full bg-[#B8F23D]/[0.07] blur-[150px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_60%)]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
                Professional installation across England
              </p>

              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Everything you need to plan and install
                the right curtain track.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">
                Explore TrackFit installation services,
                measurement tools, track-system guides,
                regional coverage and completed-project
                knowledge in one place.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/quote/postcode"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09] transition hover:scale-[1.02] hover:bg-[#C8FF52]"
                >
                  Start your installation request
                  <span
                    aria-hidden="true"
                    className="ml-2"
                  >
                    →
                  </span>
                </Link>

                <a
                  href="#trackfit-services"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-7 font-semibold transition hover:border-white/30 hover:bg-white/[0.07]"
                >
                  Explore TrackFit
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                {[
                  ["12+", "Years’ fitting experience"],
                  ["England", "Nationwide coverage"],
                  ["Forest", "Principal track supplier"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5"
                  >
                    <strong className="block text-2xl text-[#B8F23D]">
                      {value}
                    </strong>

                    <span className="mt-2 block text-sm leading-6 text-white/55">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] p-2">
                <Image
                  src="/images/hero/trackfit-entry-poster.jpeg"
                  alt="Professional curtain-track installation by TrackFit"
                  width={1000}
                  height={900}
                  priority
                  className="aspect-[4/4.3] w-full rounded-[28px] object-cover"
                />
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/10 bg-[#080A09]/90 p-5 backdrop-blur-xl">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  TrackFit
                </span>

                <strong className="mt-2 block text-xl">
                  Where precision meets design.
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                What TrackFit does
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em]">
                Specialist track fitting - not generic
                handyman work.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#C8C8C1]">
              <p>
                The correct curtain track depends on the
                opening, fixing surface, curtain heading,
                curtain load, track length and intended
                operation.
              </p>

              <p>
                TrackFit reviews each project individually,
                whether it involves one bedroom track, a
                shaped bay, a full house, a hotel or a
                commercial rollout.
              </p>
            </div>
          </div>
        </section>

        <section
          id="trackfit-services"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Installation services
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Choose the service closest to your project.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#AAACA4]">
              Customers who are unsure can use the general
              installation service and upload photographs
              for review.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex min-h-[300px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-[#B8F23D]/40 hover:bg-white/[0.055]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#B8F23D]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                      {service.label}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold leading-tight">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#9FA19A]">
                    {service.description}
                  </p>
                </div>

                <span className="mt-7 font-semibold transition group-hover:text-[#B8F23D]">
                  View service →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0E100F]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Planning tools
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Measure, compare and plan before fitting.
                </h2>

                <p className="mt-5 text-lg leading-8 text-[#AAACA4]">
                  Use TrackFit’s free calculators to explore
                  measurements and installation requirements.
                </p>
              </div>

              <Link
                href="/tools"
                className="font-semibold text-[#B8F23D]"
              >
                View all tools →
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-[26px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/40 hover:bg-white/[0.055]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="text-xl font-semibold">
                      {tool.title}
                    </h3>

                    <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#B8F23D]">
                      →
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-[#9FA19A]">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Track systems
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Understand the track before it is installed.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className={[
                  "group rounded-[30px] border p-7 transition hover:-translate-y-1",
                  brand.featured
                    ? "border-[#B8F23D]/30 bg-[#B8F23D]/[0.08]"
                    : "border-white/10 bg-white/[0.035] hover:border-[#B8F23D]/35",
                ].join(" ")}
              >
                {brand.featured && (
                  <span className="rounded-full bg-[#B8F23D] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#080A09]">
                    Main supplier
                  </span>
                )}

                <h3 className="mt-6 text-3xl font-semibold">
                  {brand.name}
                </h3>

                <p className="mt-4 leading-7 text-[#AAACA4]">
                  {brand.description}
                </p>

                <span className="mt-7 inline-flex font-semibold transition group-hover:text-[#B8F23D]">
                  Explore systems →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Nationwide coverage
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Curtain-track fitting across England.
                </h2>

                <p className="mt-5 text-lg leading-8 text-[#AAACA4]">
                  TrackFit has fitted curtain tracks in
                  cities across England, from north to south
                  and east to west.
                </p>
              </div>

              <Link
                href="/areas"
                className="font-semibold text-[#B8F23D]"
              >
                Explore all areas →
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {areaGroups.map((area) => (
                <Link
                  key={area.title}
                  href="/areas"
                  className="group rounded-[26px] border border-white/10 bg-[#080A09] p-6 transition hover:border-[#B8F23D]/35"
                >
                  <h3 className="text-xl font-semibold">
                    {area.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#9FA19A]">
                    {area.description}
                  </p>

                  <span className="mt-5 inline-flex font-semibold text-white/60 transition group-hover:text-[#B8F23D]">
                    Find installers →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Installation examples
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Explore different project types.
              </h2>
            </div>

            <Link
              href="/case-studies"
              className="font-semibold text-[#B8F23D]"
            >
              View all case studies →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.href}
                href={study.href}
                className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-7 transition hover:border-[#B8F23D]/35"
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  {study.location}
                </span>

                <h3 className="mt-5 text-2xl font-semibold leading-tight">
                  {study.title}
                </h3>

                <span className="mt-8 inline-flex font-semibold transition group-hover:text-[#B8F23D]">
                  Read project →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0E100F]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Trade and commercial
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                Installation support for professional
                projects.
              </h2>

              <p className="mt-5 leading-8 text-[#AAACA4]">
                TrackFit works with businesses that need
                reliable track specification, supply,
                fitting and repeat installation support.
              </p>

              <Link
                href="/trade"
                className="mt-7 inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold transition hover:border-[#B8F23D]/40 hover:text-[#B8F23D]"
              >
                Visit the Trade Centre
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {tradeSectors.map((sector) => (
                <div
                  key={sector}
                  className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5 font-semibold"
                >
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A clear route from enquiry to installation.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((step) => (
              <article
                key={step.number}
                className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6"
              >
                <span className="text-sm font-bold text-[#B8F23D]">
                  {step.number}
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-[#9FA19A]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="relative overflow-hidden rounded-[36px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.09] px-6 py-14 text-center sm:px-10 lg:py-20">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[-220px] h-[440px] w-[640px] -translate-x-1/2 rounded-full bg-[#B8F23D]/15 blur-[120px]"
              />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Begin your enquiry
                </p>

                <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Tell us what you need fitted.
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8BAB2]">
                  Enter your postcode, select the closest
                  service and upload photographs of the
                  installation area.
                </p>

                <Link
                  href="/quote/postcode"
                  className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09] transition hover:scale-[1.02] hover:bg-[#C8FF52]"
                >
                  Check your area
                  <span
                    aria-hidden="true"
                    className="ml-2"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import TrackSystemSelector from "@/components/motorised/TrackSystemSelector";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/motorised-curtain-tracks/track-selector";
const pageTitle = "Motorised Curtain Track System Selector";
const pageDescription =
  "Choose between Forest FMS, FMS Plus, FMS Plus Recess and FMS Dual based on project type, finish, curtain layers, blackout, curves and fixing position.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "motorised curtain track selector",
    "Forest FMS selector",
    "FMS Plus Recess",
    "hotel blackout curtain track",
    "curved motorised curtain track",
    "recessed motorised curtain track",
  ],
});

const faqs = [
  {
    question: "What is the difference between FMS and FMS Plus?",
    answer:
      "FMS is the compact core motorised track system. FMS Plus uses a larger architectural profile and also forms the basis of the recessed installation pathway.",
  },
  {
    question: "Which system is best for a recessed ceiling?",
    answer:
      "FMS Plus Recess is the main starting direction for a concealed ceiling detail. The recess, structural support, plaster finish, power and service access must be coordinated before the ceiling is completed.",
  },
  {
    question: "Which system is intended for hotel blackout?",
    answer:
      "FMS Dual is designed around two curtain channels operated by one motor, with an adjustable overlap for stronger light control. Final blackout performance also depends on the curtains, side gaps, head detail and room design.",
  },
  {
    question: "Can FMS tracks be curved?",
    answer:
      "Forest publishes FMS and FMS Plus as bendable systems. The exact bend geometry, radius, curtain load and complete travel route must be confirmed before manufacture.",
  },
  {
    question: "Can motorised tracks be wall fixed?",
    answer:
      "Suitable FMS configurations can be wall fixed using the appropriate brackets. Projection, fixing strength, obstacles and curtain clearance must be checked during survey.",
  },
  {
    question: "Does the selector choose the motor too?",
    answer:
      "No. This selector focuses on the track-system direction. Use TrackFit's separate curtain-weight and motor selector to estimate the moving load and identify the motor capacity to investigate.",
  },
  {
    question: "Is the result a final specification?",
    answer:
      "No. It is an early planning direction. Final selection depends on dimensions, curtain weight, bends, fixing support, power, controls, carriers and current manufacturer documentation.",
  },
];

export default function TrackSelectorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TrackFit Motorised Curtain Track System Selector",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: `https://curtaintrackfitters.com${pagePath}`,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Motorised curtain tracks", path: "/motorised-curtain-tracks" },
          { name: "Track selector", path: pagePath },
        ]}
      />
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />

        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-10%] top-[-35%] h-[700px] w-[700px] rounded-full bg-[#B8F23D]/10 blur-[160px]" />
            <div className="absolute bottom-[-55%] left-[-10%] h-[520px] w-[520px] rounded-full bg-white/[0.04] blur-[140px]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
              Interactive FMS system planning
            </p>
            <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Choose how your motorised curtain track fits the room.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">
              Compare standard, architectural, recessed and dual-channel Forest FMS pathways using the actual needs of your project.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#selector" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">
                Start the selector →
              </Link>
              <Link href="/motorised-curtain-tracks/track-systems" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">
                Read the track-systems guide
              </Link>
            </div>
          </div>
        </section>

        <section id="selector" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <TrackSystemSelector />
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Four system directions
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The track profile changes how the system performs and integrates.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["FMS", "Compact core system for suitable straight or curved, wall- or ceiling-fixed curtains."],
                ["FMS Plus", "A larger architectural profile for premium interiors and more considered detailing."],
                ["FMS Plus Recess", "A concealed ceiling pathway requiring early coordination with the building work."],
                ["FMS Dual", "A two-channel pathway for sheer and blackout curtains or stronger hotel light control."],
              ].map(([title, description]) => (
                <article key={title} className="rounded-[26px] border border-white/10 bg-[#080A09] p-6">
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-4 leading-7 text-[#AAACA4]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Track-system selector FAQs
          </h2>
          <div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="py-5">
                <summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary>
                <p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="rounded-[36px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.09] px-6 py-14 text-center sm:px-10 lg:py-20">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Final system review
              </p>
              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Need the track, motor and installation specified together?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8BAB2]">
                Send the opening dimensions, curtain details, photographs, preferred controls and project location for an initial TrackFit review.
              </p>
              <Link href="/quote/postcode" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]">
                Start your project enquiry →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import CurtainWeightMotorSelector from "@/components/tools/CurtainWeightMotorSelector";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle = "Curtain Weight Calculator & Motorised Track Selector";
const pageDescription =
  "Estimate finished curtain weight from dimensions, fullness, fabric GSM, lining and interlining, then identify a suitable Forest Shuttle motor range.";
const pagePath = "/tools/curtain-weight-motor-selector";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "curtain weight calculator",
    "motorised curtain track calculator",
    "curtain motor selector",
    "Forest Shuttle motor selector",
    "how much do curtains weigh",
    "electric curtain track weight limit",
  ],
});

const faqs = [
  {
    question: "How does the curtain weight calculator work?",
    answer:
      "It estimates fabric area from track width, curtain fullness and finished drop, applies the combined GSM of the face fabric, lining and interlining, then adds construction and motor-planning allowances.",
  },
  {
    question: "Does the result confirm the final motor?",
    answer:
      "No. Final suitability also depends on track length, bends, curtain heading, draw direction, controls, power requirements and the current Forest specification.",
  },
  {
    question: "What is GSM?",
    answer:
      "GSM means grams per square metre. Use the fabric supplier or workroom figure wherever possible for a more accurate result.",
  },
  {
    question: "Which Forest motors are included?",
    answer:
      "The selector includes Shuttle Ion, Shuttle Go, Shuttle L, Shuttle AC and Shuttle M using the limits supplied to TrackFit by its Forest representative.",
  },
];

export default function CurtainWeightMotorSelectorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: pageTitle,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: pageDescription,
    url: `https://curtaintrackfitters.com${pagePath}`,
    provider: {
      "@type": "Organization",
      name: "TrackFit",
      url: "https://curtaintrackfitters.com",
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Curtain weight and motor selector", path: pagePath },
        ]}
      />

      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />

        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-15%] top-[-35%] h-[760px] w-[760px] rounded-full bg-[#B8F23D]/[0.09] blur-[165px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-white/45">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <span>/</span>
              <span className="text-[#B8F23D]">Curtain weight and motor selector</span>
            </nav>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">Free motorised curtain planning tool</p>
                <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  Curtain weight calculator and motor selector.
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">
                  Estimate the finished weight of lined or interlined curtains and identify the Forest Shuttle motor range that should be investigated.
                </p>
              </div>

              <aside className="rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.08] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Preliminary recommendation only</p>
                <h2 className="mt-4 text-3xl font-semibold">Curtain weight is only one part of motor selection.</h2>
                <p className="mt-5 leading-8 text-[#C8C8C1]">
                  Final suitability must also consider track length, bends, heading, draw direction, operating frequency, controls and power requirements.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <CurtainWeightMotorSelector />

        <section className="border-t border-white/10 bg-[#0E100F]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["1. Fabric area", "Track width × fullness × finished drop."],
                ["2. Combined GSM", "Face fabric, lining and interlining are added together."],
                ["3. Construction allowance", "Allows for hems, headings, seams and accessories."],
                ["4. Motor margin", "Avoids recommending a motor at its absolute stated limit."],
              ].map(([title, text]) => (
                <article key={title} className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                  <h2 className="text-2xl font-semibold">{title}</h2>
                  <p className="mt-4 leading-7 text-[#AAACA4]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Curtain weight and motor questions</h2>
          <div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="py-5">
                <summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary>
                <p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

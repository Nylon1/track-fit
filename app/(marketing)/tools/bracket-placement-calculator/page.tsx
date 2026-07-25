import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { BracketPlacementCalculator } from "@/components/tools/BracketPlacementCalculator";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Track Bracket Placement Calculator | TrackFit",
  description:
    "Calculate an even curtain-track bracket layout and view each recommended bracket position.",
  alternates: {
    canonical: absoluteUrl("/tools/bracket-placement-calculator"),
  },
};

const faqs = [
  {
    question: "How far apart should curtain-track brackets be?",
    answer:
      "Spacing depends on the track system, curtain load and fixing surface. Always use the manufacturer's maximum spacing. The calculator distributes brackets evenly within that limit.",
  },
  {
    question: "How close should brackets be to the track ends?",
    answer:
      "Many installations place support close to each end, often around 5–15 cm in. Check the track manufacturer's instructions.",
  },
  {
    question: "Do track joins need additional brackets?",
    answer:
      "Yes. Joined tracks commonly need support close to both sides of the join to reduce movement and sagging.",
  },
  {
    question: "Can I use the same spacing for bay or curved tracks?",
    answer:
      "Bends and curves may need extra support. Use this as a planning guide and follow the manufacturer's bend-support instructions.",
  },
];

export default function BracketPlacementCalculatorPage() {
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

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]">
              <Link href="/tools" className="hover:text-white">
                Tools
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                Bracket placement calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free installation planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Bracket Placement Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Enter the track length and maximum bracket spacing to
              create an even layout with exact positions from the left
              end.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <BracketPlacementCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              How the bracket layout is calculated
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The usable span is divided into equal intervals that do
              not exceed the selected maximum spacing. Extra support
              is added close to any track joins.
            </p>
          </div>

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
              Questions answered
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Frequently asked questions
            </h2>

            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none justify-between gap-5 text-lg font-semibold">
                    {faq.question}
                    <span className="text-2xl text-[#B8F23D] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="pt-4 leading-7 text-[#AAACA4]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { BayWindowCalculator } from "@/components/tools/BayWindowCalculator";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Bay Window Curtain Track Calculator | TrackFit",
  description:
    "Add each bay-window section and side extension to estimate the total curtain track run.",
  path: "/tools/bay-window-calculator",
});

const faqs = [
  {
    question: "Do I need to enter the bay angles?",
    answer:
      "No. This tool is designed to estimate the total track run from the straight section measurements. Final fitting still needs to be checked at the exact mounting line.",
  },
  {
    question: "Where should I measure each bay section?",
    answer:
      "Measure along the proposed wall or ceiling track line, from one corner or change of direction to the next.",
  },
  {
    question: "Should I include track outside the bay?",
    answer:
      "Yes. Enter any straight extension required beyond the left and right sides of the bay.",
  },
  {
    question: "Can I order a curved track from this result alone?",
    answer:
      "The total is useful for planning, but the final track shape and fitting measurements should be checked before cutting or bending.",
  },
];

export default function BayWindowCalculatorPage() {
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
                Bay window calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free measurement tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Bay Window Curtain Track Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Enter the width of every straight bay section and any
              track required beyond the sides. The calculator gives
              you the total track run and a clear section breakdown.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <BayWindowCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              How the calculation works
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The calculator adds every bay section, then adds the
              selected straight extension at the left and right. It
              does not calculate the final bend shape or replace an
              installation survey.
            </p>

            <div className="mt-7 rounded-[22px] bg-[#080A09] p-5 font-mono text-sm text-[#B8F23D]">
              total track run = all bay sections + left extension +
              right extension
            </div>
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

import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { TrackProjectionCalculator } from "@/components/tools/TrackProjectionCalculator";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Track Projection Calculator | TrackFit",
  description:
    "Estimate how far a curtain track should sit from the wall to clear handles, sills and radiators.",
  alternates: {
    canonical: absoluteUrl(
      "/tools/curtain-track-projection-calculator",
    ),
  },
};

const faqs = [
  {
    question: "How far should a curtain track be from the wall?",
    answer:
      "It depends on the curtain heading and anything projecting from the wall. The curtain must clear handles, sills, radiators and the wall itself while moving freely.",
  },
  {
    question: "Should curtains hang in front of a radiator?",
    answer:
      "Where full-length curtains pass a radiator, the track needs enough projection to keep the fabric clear. Consider airflow, heat exposure and whether the curtains will be closed while the radiator is on.",
  },
  {
    question: "Do wave curtains need more projection?",
    answer:
      "Wave curtains maintain deeper regular folds, so they usually need more wall clearance than flatter headings.",
  },
  {
    question: "Should I measure from the wall or skirting board?",
    answer:
      "Use the fixed reference surface relevant to the track line, then add the full projection of any sill, handle, radiator or trim that the curtain must clear.",
  },
];

export default function CurtainTrackProjectionCalculatorPage() {
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
                Curtain track projection calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free installation planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Projection Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Estimate how far the curtain track should sit from the
              wall to clear handles, deep sills, radiators and curtain
              folds.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <TrackProjectionCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              Why track projection matters
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              A track installed too close to the wall can cause the
              curtains to rub against handles, sills or radiators. Too
              much projection can make the installation look bulky and
              place unnecessary leverage on wall brackets.
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

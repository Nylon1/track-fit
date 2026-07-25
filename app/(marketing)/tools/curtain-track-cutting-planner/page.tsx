import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { TrackCuttingPlanner } from "@/components/tools/TrackCuttingPlanner";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Track Cutting Planner | TrackFit",
  description:
    "Plan curtain-track cuts from 3 metre, 5 metre or custom stock lengths and reduce waste.",
  alternates: {
    canonical: absoluteUrl("/tools/curtain-track-cutting-planner"),
  },
};

const faqs = [
  {
    question: "How does the cutting planner reduce waste?",
    answer:
      "It sorts the required pieces from longest to shortest and places each one into the stock length with the smallest suitable remaining space.",
  },
  {
    question: "Does the result guarantee the absolute minimum number of stock lengths?",
    answer:
      "No. It creates an efficient practical plan, but some combinations may have another arrangement with slightly less waste.",
  },
  {
    question: "What is the cutting allowance?",
    answer:
      "It is the small amount of material lost between consecutive cuts because of the saw blade or cutting method.",
  },
  {
    question: "Can a track longer than the stock length be included?",
    answer:
      "The planner flags it as oversized. It does not automatically split a finished track because any join must be deliberately positioned and approved.",
  },
];

export default function CurtainTrackCuttingPlannerPage() {
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
                Curtain track cutting planner
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free trade and installation tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Cutting Planner
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Enter every required track length and create an efficient
              cutting plan from 3 metre, 5 metre or custom stock.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <TrackCuttingPlanner />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              How the cutting plan works
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The planner uses a practical longest-first packing
              method. It includes the selected cutting allowance and
              shows the estimated waste left from every stock length.
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

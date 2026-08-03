import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { TrackTypeFinder } from "@/components/tools/TrackTypeFinder";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Curtain Track Type Finder | TrackFit",
  description:
    "Choose the right curtain track type for windows, doors, bay windows, room dividers and different curtain headings.",
  path: "/tools/curtain-track-type-finder",
});

const faqs = [
  {
    question: "Should I choose a ceiling or wall-mounted curtain track?",
    answer:
      "Ceiling mounting gives a clean full-height look and can maximise clearance. Wall mounting may be better where the ceiling cannot provide a secure fixing or where extra projection is needed.",
  },
  {
    question: "Do wave curtains need a special track?",
    answer:
      "Yes. Wave curtains need a compatible track, gliders and spacing system to maintain regular folds.",
  },
  {
    question: "What track is best for heavy curtains?",
    answer:
      "Use a robust aluminium profile with suitable gliders, closer bracket spacing and secure structural fixings.",
  },
  {
    question: "Can one track carry voile and blackout curtains?",
    answer:
      "A double-track system is normally used when both layers need to move independently.",
  },
];

export default function CurtainTrackTypeFinderPage() {
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
                Curtain track type finder
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free track selection tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Type Finder
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Answer a few questions about the opening, curtain heading
              and installation to identify a practical track type.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <TrackTypeFinder />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              Choosing a track is about more than appearance
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The best track depends on the opening shape, fixing
              surface, curtain heading, curtain weight, stack-back and
              whether one or two curtain layers are required.
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

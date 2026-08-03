import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { FixingFinder } from "@/components/tools/FixingFinder";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Curtain Track Fixing Finder | TrackFit",
  description:
    "Identify a suitable curtain-track fixing approach for timber, masonry, concrete or plasterboard.",
  path: "/tools/curtain-track-fixing-finder",
});

const faqs = [
  {
    question: "Can I fit a curtain track directly to plasterboard?",
    answer:
      "Light installations may sometimes use a suitable hollow-wall fixing, but the board condition, thickness and load matter. Heavy curtains and bay tracks should normally use structural support.",
  },
  {
    question: "What fixing should I use for a concrete ceiling?",
    answer:
      "Use a fixing specifically rated for concrete with the correct drill diameter and embedment. Check for reinforcement and hidden services before drilling.",
  },
  {
    question: "Is timber the best fixing point?",
    answer:
      "Sound structural timber usually provides an excellent fixing point when the screw reaches it securely. Thin trim or decorative boarding should not be treated as structural timber.",
  },
  {
    question: "How do I know what is behind plasterboard?",
    answer:
      "Use appropriate detection methods, inspect nearby fittings and look for construction clues. Where the structure remains uncertain, arrange a professional assessment.",
  },
];

export default function CurtainTrackFixingFinderPage() {
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
                Curtain track fixing finder
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free installation planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Fixing Finder
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Choose the mounting surface, curtain load and track shape
              to identify a practical fixing approach.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <FixingFinder />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              Why the hidden structure matters
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              Paint and plaster do not carry the curtain load. The
              fixing must transfer that load into timber, masonry,
              concrete or a suitable engineered hollow-wall anchor.
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

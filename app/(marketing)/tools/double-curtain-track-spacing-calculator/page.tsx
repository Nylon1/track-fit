import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { DoubleTrackSpacingCalculator } from "@/components/tools/DoubleTrackSpacingCalculator";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Double Curtain Track Spacing Calculator | TrackFit",
  description:
    "Estimate the spacing needed between double curtain tracks for voile, blackout and main curtains.",
  alternates: {
    canonical: absoluteUrl(
      "/tools/double-curtain-track-spacing-calculator",
    ),
  },
};

const faqs = [
  {
    question: "How far apart should double curtain tracks be?",
    answer:
      "The required spacing depends on the depth of both curtain layers and their headings. Enough clearance is needed so the curtains move without rubbing.",
  },
  {
    question: "Which track should be closest to the window?",
    answer:
      "The voile, sheer or lighter rear layer normally sits closest to the window, with the main curtain on the front track.",
  },
  {
    question: "Do wave curtains need more spacing?",
    answer:
      "Wave curtains retain deeper regular folds, so they commonly need more clearance than a flatter pencil-pleat layer.",
  },
  {
    question: "How far should the rear track be from the wall?",
    answer:
      "It must clear handles, radiators, sills and other projections while leaving room for the rear curtain folds.",
  },
];

export default function DoubleCurtainTrackSpacingCalculatorPage() {
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
                Double track spacing calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free installation planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Double Curtain Track Spacing Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Estimate the distance needed between a voile or rear
              curtain track and the main front curtain track.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <DoubleTrackSpacingCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              Why double-track spacing matters
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              Tracks placed too close together can cause the curtain
              layers to rub, bunch or prevent each other from moving
              smoothly. Excessive spacing can create an unnecessarily
              deep installation.
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

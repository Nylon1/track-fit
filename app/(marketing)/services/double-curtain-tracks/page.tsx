import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/services/double-curtain-tracks";
const pageTitle = "Double Curtain Track Installation UK";
const pageDescription =
  "Professional double curtain track installation for voile, blackout and decorative curtain layers. TrackFit plans projection, spacing, fixing strength and smooth operation across England.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "double curtain track installation",
    "double curtain tracks",
    "voile and curtain track",
    "blackout and voile curtain tracks",
    "two track curtain system",
    "ceiling mounted double curtain track",
    "wall mounted double curtain track",
    "double curtain track fitters UK",
  ],
});

const suitableFor = [
  "Voile or sheer curtains behind decorative curtains",
  "Blackout curtains combined with a privacy layer",
  "Hotels, bedrooms and living spaces requiring flexible light control",
  "Large windows, patio doors and full-height glazing",
  "Ceiling-fixed and wall-fixed installations",
  "Wave, pinch pleat, pencil pleat and other suitable headings",
];

const planningPoints = [
  {
    title: "Track spacing",
    text: "The rear and front tracks need enough separation for both curtain layers to move freely without rubbing, catching or distorting the folds.",
  },
  {
    title: "Projection",
    text: "The complete system must clear handles, radiators, window boards, blinds and other obstructions while still sitting neatly within the room.",
  },
  {
    title: "Curtain weight",
    text: "Each track must be selected and supported for the finished curtain weight, including fullness, lining, interlining and heading construction.",
  },
  {
    title: "Fixing structure",
    text: "Ceiling and wall surfaces are assessed so the correct brackets, fixing points and support spacing can be planned before installation.",
  },
  {
    title: "Stack position",
    text: "The curtain stack is considered so both layers clear the glazing and do not crowd the opening when fully drawn back.",
  },
  {
    title: "Operation",
    text: "Manual, cord-operated and suitable motorised options can be considered depending on the project, access and curtain load.",
  },
];

const process = [
  {
    number: "01",
    title: "Share the opening",
    text: "Send the postcode, approximate width, ceiling height and clear photographs of the window, ceiling and surrounding walls.",
  },
  {
    number: "02",
    title: "Confirm both curtain layers",
    text: "Tell us which layer sits closest to the window, the curtain headings, finished weights if known and whether blackout performance matters.",
  },
  {
    number: "03",
    title: "Plan spacing and fixing",
    text: "TrackFit reviews projection, separation, support, stack-back and any obstacles before confirming the recommended arrangement.",
  },
  {
    number: "04",
    title: "Install and test",
    text: "The tracks are positioned, levelled and tested so both curtain layers travel independently and sit correctly when open and closed.",
  },
];

const faqs = [
  {
    question: "How much space is needed between two curtain tracks?",
    answer:
      "There is no single spacing that suits every project. The correct distance depends on the curtain headings, fullness, fabric thickness, lining, window projection and whether the rear layer is a voile, blind or blackout curtain. TrackFit confirms the spacing for the actual installation.",
  },
  {
    question: "Can double curtain tracks be fitted to the ceiling?",
    answer:
      "Yes. Ceiling fixing often creates a clean layered appearance, but the ceiling structure and fixing route must be suitable for the combined system and curtain loads.",
  },
  {
    question: "Can one track carry both curtain layers?",
    answer:
      "A true layered arrangement normally uses separate channels or separate tracks so each curtain layer can move independently. The correct system depends on the heading and required operation.",
  },
  {
    question: "Can the front curtain be blackout and the rear curtain a voile?",
    answer:
      "Yes. This is one of the most common double-track arrangements because it combines daytime privacy with stronger light control when the main curtains are closed.",
  },
  {
    question: "Can double tracks be fitted around bays or bends?",
    answer:
      "Yes, where the selected track system and geometry allow it. Both track routes must be planned carefully so the spacing remains consistent through angles and curves.",
  },
  {
    question: "Does TrackFit supply the tracks as well as install them?",
    answer:
      "TrackFit can review the project, recommend suitable systems and provide professional installation after the fixing route, curtain load and spacing have been confirmed.",
  },
];

export default function DoubleCurtainTracksPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Double curtain track installation",
    serviceType: "Double curtain track installation",
    description: pageDescription,
    url: `https://curtaintrackfitters.com${pagePath}`,
    provider: {
      "@type": "Organization",
      name: "TrackFit",
      url: "https://curtaintrackfitters.com",
    },
    areaServed: {
      "@type": "Country",
      name: "England",
    },
  };

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
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Double curtain tracks", path: pagePath },
        ]}
      />
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <section className="relative overflow-hidden border-b border-white/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12%] top-[-35%] h-[680px] w-[680px] rounded-full bg-[#B8F23D]/10 blur-[155px]"
          />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
                Layered curtain systems
              </p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Double curtain tracks, planned as one complete system.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">
                Professional installation for voile, blackout and decorative curtain layers, with the spacing, projection and fixing strength planned before the tracks go up.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/quote/postcode"
                  className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]"
                >
                  Request double-track installation →
                </Link>
                <Link
                  href="/tools/double-curtain-track-spacing-calculator"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold"
                >
                  Use the spacing calculator
                </Link>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Typical arrangement
              </p>
              <div className="mt-8 space-y-5">
                <div className="rounded-[24px] border border-white/10 bg-[#0E100F] p-6">
                  <span className="text-sm font-bold text-[#B8F23D]">Rear track</span>
                  <h2 className="mt-3 text-2xl font-semibold">Voile or privacy layer</h2>
                  <p className="mt-3 leading-7 text-[#AAACA4]">
                    Positioned closer to the window for daytime privacy and softer light control.
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-6">
                  <span className="text-sm font-bold text-[#B8F23D]">Front track</span>
                  <h2 className="mt-3 text-2xl font-semibold">Decorative or blackout curtain</h2>
                  <p className="mt-3 leading-7 text-[#C8C8C1]">
                    Set forward far enough to travel freely and close without pressing against the rear layer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Suitable projects
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                More control without compromising the finish.
              </h2>
              <p className="mt-5 leading-8 text-[#AAACA4]">
                A double-track system allows each curtain layer to work independently. The result is better privacy, light control and flexibility, provided the complete arrangement is measured and installed correctly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {suitableFor.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="text-[#B8F23D]">✓</span>
                  <p className="mt-3 leading-7 text-[#C8C8C1]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0E100F]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              What must be planned
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Two tracks create more installation decisions, not fewer.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {planningPoints.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"
                >
                  <span className="text-sm font-bold text-[#B8F23D]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 leading-7 text-[#AAACA4]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
            TrackFit process
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            From photographs to a properly layered finish.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((step) => (
              <article
                key={step.number}
                className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"
              >
                <span className="text-sm font-bold text-[#B8F23D]">{step.number}</span>
                <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-4 leading-7 text-[#AAACA4]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.08] p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Planning tool
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                  Estimate the separation between your tracks.
                </h2>
                <p className="mt-5 leading-8 text-[#C8C8C1]">
                  Use the TrackFit double-track spacing calculator for an early planning estimate, then confirm the final position before installation.
                </p>
                <Link
                  href="/tools/double-curtain-track-spacing-calculator"
                  className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]"
                >
                  Open spacing calculator →
                </Link>
              </article>

              <article className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Related service
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                  Need ceiling-fixed tracks?
                </h2>
                <p className="mt-5 leading-8 text-[#AAACA4]">
                  Review the ceiling-mounted service for support, access, fixing and positioning considerations.
                </p>
                <Link
                  href="/services/ceiling-mounted-curtain-track-installation"
                  className="mt-7 inline-flex font-semibold text-[#B8F23D]"
                >
                  Explore ceiling-mounted tracks →
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Double curtain track FAQs
          </h2>
          <div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="py-5">
                <summary className="cursor-pointer text-lg font-semibold">
                  {faq.question}
                </summary>
                <p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="rounded-[36px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.09] px-6 py-14 text-center sm:px-10 lg:py-20">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                TrackFit double-track installation
              </p>
              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Plan both curtain layers before anything is fitted.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8BAB2]">
                Send your postcode, photographs and curtain details for an initial installation review.
              </p>
              <Link
                href="/quote/postcode"
                className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]"
              >
                Start your installation request →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ControlCompatibilityChecker from "@/components/motorised/ControlCompatibilityChecker";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/motorised-curtain-tracks/control-selector";
const pageTitle = "Motorised Curtain Control Compatibility Checker";
const pageDescription =
  "Choose remote, app, voice, Z-Wave, battery or building-management control and identify the Forest Shuttle motor and accessories to investigate.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "motorised curtain control selector",
    "smart curtain compatibility checker",
    "Alexa curtain tracks",
    "Google Home motorised curtains",
    "Z-Wave curtain motor",
    "hotel curtain automation",
    "Forest Connect app curtains",
  ],
});

const faqs = [
  {
    question: "Which Forest motor includes Wi-Fi?",
    answer:
      "Shuttle Go includes its Wi-Fi control route for Forest Connect app setup. Other compatible motors may require a separate Forest Wi-Fi Dongle.",
  },
  {
    question: "Which motors can use Z-Wave?",
    answer:
      "Forest publishes optional Z-Wave versions for Shuttle L and Shuttle M. The exact regional version and controller compatibility must be confirmed before ordering.",
  },
  {
    question: "Can Shuttle iOn use app or voice control?",
    answer:
      "The rechargeable Shuttle iOn does not use the Forest Wi-Fi Dongle pathway. A compatible connector or third-party route may be required depending on the intended control system.",
  },
  {
    question: "Which motor is intended for building management systems?",
    answer:
      "Shuttle AC is specifically positioned for building-management control. Shuttle L and M may also support wider automation pathways when supplied with the correct interfaces.",
  },
  {
    question: "Can every remote control operate every Shuttle motor?",
    answer:
      "No. Compatibility varies by remote, wall switch and motor protocol. Forest EasyTouch is the broadest starting point, while some accessories exclude Shuttle Go.",
  },
  {
    question: "Does the checker guarantee compatibility?",
    answer:
      "No. It provides an early planning direction. Final compatibility must be confirmed against the exact motor version, accessories, smart-home platform and current manufacturer documentation.",
  },
];

export default function ControlSelectorPage() {
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
    name: "TrackFit Motorised Curtain Control Compatibility Checker",
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
          { name: "Control selector", path: pagePath },
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute right-[-12%] top-[-35%] h-[680px] w-[680px] rounded-full bg-[#B8F23D]/10 blur-[160px]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
              Smart control compatibility
            </p>
            <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Find the right way to control your motorised curtains.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">
              Compare remote, app, Alexa, Google, Z-Wave, rechargeable and building-management pathways before choosing the motor and accessories.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#checker"
                className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]"
              >
                Start the checker →
              </Link>
              <Link
                href="/motorised-curtain-tracks/controls"
                className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold"
              >
                Read the controls guide
              </Link>
            </div>
          </div>
        </section>

        <section
          id="checker"
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
        >
          <ControlCompatibilityChecker />
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Why compatibility needs checking
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The motor, receiver, accessory and platform must work as one system.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "Motor version",
                  "Shuttle models can be supplied with different control capabilities and optional receiver versions.",
                ],
                [
                  "Accessory route",
                  "Wi-Fi Dongle, Wireless Connector, smart plug, remote and wall-switch compatibility varies by motor.",
                ],
                [
                  "Smart-home platform",
                  "Alexa, Google, Apple, Z-Wave and professional automation systems do not all connect in the same way.",
                ],
                [
                  "Commissioning",
                  "The electrical supply, networking, automation programming and final handover responsibilities must be agreed.",
                ],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-[26px] border border-white/10 bg-[#080A09] p-6"
                >
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-4 leading-7 text-[#AAACA4]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Control compatibility FAQs
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
                Final specification
              </p>
              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Need the motor and controls specified together?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8BAB2]">
                Send the curtain details, control platform, power arrangement and project location for an initial TrackFit review.
              </p>
              <Link
                href="/quote/postcode"
                className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]"
              >
                Start your project enquiry →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

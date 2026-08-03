import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { tradeSectors } from "@/lib/trade/data";

export const metadata: Metadata = createMetadata({
  title: "Trade Curtain Track Installation | TrackFit",
  description:
    "Nationwide curtain-track installation for designers, workrooms, developers, contractors, hotels, care homes and commercial property teams.",
  path: "/trade",
});

export default function TradePage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              TrackFit Trade Centre
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Installation for Trade and Commercial Projects
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Specialist manual curtain-track fitting for designers,
              workrooms, developers, contractors, property teams and
              commercial operators across England.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-semibold text-[#080A09]"
              >
                Discuss a trade project
              </Link>

              <Link
                href="/services/commercial-curtain-track-installation"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 font-semibold"
              >
                View commercial services
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tradeSectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/trade/${sector.slug}`}
                className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/45 hover:bg-white/[0.055]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  Trade sector
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  {sector.name}
                </h2>

                <p className="mt-4 line-clamp-4 leading-7 text-[#AAACA4]">
                  {sector.description}
                </p>

                <span className="mt-7 inline-flex font-semibold transition group-hover:text-[#B8F23D]">
                  View sector service →
                </span>
              </Link>
            ))}
          </div>

          <section className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              [
                "Planning",
                "Drawings, schedules, track specifications, fixing routes and access requirements reviewed before installation.",
              ],
              [
                "Delivery",
                "Single rooms, phased programmes, multi-room projects and repeat installations delivered to an agreed scope.",
              ],
              [
                "Handover",
                "Tracks tested, exceptions reported and snagging completed before final handover.",
              ],
            ].map(([title, copy]) => (
              <article
                key={title}
                className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  {title}
                </p>
                <p className="mt-4 leading-7 text-[#C8C8C1]">
                  {copy}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-16 rounded-[32px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-7 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Trade enquiries
            </p>
            <h2 className="mt-4 text-4xl font-semibold">
              Send the scope, drawings or room schedule
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#AAACA4]">
              Include the location, programme, room quantities, track
              specification and any access constraints.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 font-semibold text-[#080A09]"
            >
              Start a trade enquiry
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

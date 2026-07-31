import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServicesExperience from "@/components/services/ServicesExperience";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";
import Image from "next/image";

const pageTitle = "Curtain Track Installation Services UK";
const pageDescription = "Explore TrackFit residential, commercial, healthcare, specialist and motorised curtain-track installation services, planning tools, brands and nationwide coverage.";
const pagePath = "/services";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "curtain track installation services",
    "curtain track fitters UK",
    "motorised curtain track installation",
    "wave curtain track installation",
    "bay window curtain tracks",
    "double curtain track installation",
    "commercial curtain track installation",
    "healthcare curtain tracks",
  ],
});

const projectTypes = [
  ["Residential", "Homes, apartments, bedrooms, living rooms and full-property projects."],
  ["Motorised", "Motors, controls, power planning, smart-home integration and specialist fitting."],
  ["Commercial", "Hotels, offices, developers, landlords and repeat multi-room installations."],
  ["Specialist", "Bay windows, wave systems, layered tracks and unusual fixing conditions."],
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Services", path: pagePath }]} />
      <SiteHeader />

      <main className="min-h-screen overflow-hidden bg-[#080A09] text-[#F4F1E8]">
        <section className="relative min-h-[760px] overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="TrackFit professional curtain-track installation"
              fill
              priority
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#080A09_0%,rgba(8,10,9,0.94)_42%,rgba(8,10,9,0.42)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#080A09_100%)]" />
          </div>

          <div aria-hidden="true" className="absolute left-[-8%] top-[-25%] h-[520px] w-[520px] rounded-full bg-[#B8F23D]/10 blur-[150px]" />

          <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#B8F23D]/25 bg-[#B8F23D]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D] backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#B8F23D]" />
                TrackFit service studio
              </div>

              <h1 className="mt-7 text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[88px]">
                The right track begins with the right route.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D2D2CA] sm:text-xl">
                Explore every TrackFit category through a cinematic, interactive service hub built around real rooms, real fixing conditions and real installation decisions.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#finder" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09] transition hover:scale-[1.02] hover:bg-[#C8FF52]">
                  Find my service →
                </Link>
                <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/20 bg-black/20 px-7 font-semibold backdrop-blur-xl transition hover:border-white/40 hover:bg-white/10">
                  Start installation request
                </Link>
              </div>

              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {projectTypes.map(([title, description], index) => (
                  <a key={title} href="#services-wall" className="group rounded-[24px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#B8F23D]/35 hover:bg-black/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#B8F23D]">0{index + 1}</span>
                      <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#B8F23D]">→</span>
                    </div>
                    <strong className="mt-5 block text-lg">{title}</strong>
                    <span className="mt-2 block text-sm leading-6 text-white/50">{description}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/10 bg-[#0B0D0C]/80 py-3 backdrop-blur-xl">
            <div className="flex min-w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-white/35">
              {["Residential installation", "Bay windows", "Wave systems", "Double tracks", "Motorised systems", "Commercial projects", "Healthcare tracks", "Planning tools", "Trade support", "Nationwide coverage"].map((item) => <span key={item}>{item} <b className="ml-10 text-[#B8F23D]">•</b></span>)}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0B0D0C]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Precision before installation</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Not generic handyman work.</h2>
            </div>
            <div className="grid gap-4 text-base leading-8 text-white/58 sm:grid-cols-2">
              <p>The correct system depends on opening shape, fixing surface, curtain heading, weight, length, projection and operation.</p>
              <p>TrackFit connects each visitor to the right service, planning tool, system guide or specialist enquiry route.</p>
            </div>
          </div>
        </section>

        <div id="services-wall">
          <ServicesExperience />
        </div>

        <section className="relative overflow-hidden border-t border-white/10">
          <div aria-hidden="true" className="absolute left-1/2 top-[-240px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#B8F23D]/12 blur-[150px]" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Where precision meets design</p>
            <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">Turn the right service choice into a properly planned installation.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/55">Send your postcode, photographs and project details. TrackFit will review the opening, fixing route and appropriate system.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09] transition hover:scale-[1.02]">Start your quote →</Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-8 font-semibold transition hover:border-white/35">Speak to TrackFit</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

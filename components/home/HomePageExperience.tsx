"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CurtainTransition from "@/components/entry/CurtainTransition";
import PostcodeCard from "@/components/entry/PostcodeCard";
import PricingPreview from "@/components/pricing/PricingPreview";
import SiteHeader from "@/components/site/SiteHeader";
import VisualProjectStrip, {
  type VisualStoryItem,
} from "@/components/site/VisualProjectStrip";

const serviceCards = [
  {
    title: "Residential installation",
    description:
      "Professional curtain track fitting for homes, apartments, bedrooms, living rooms and complete properties.",
    href: "/services/residential-curtain-track-installation",
    image: "/images/gallery/bay-windows/bridges-bespoke-bay.webp",
    alt: "Neutral full length curtains installed around a bright residential bay window",
    label: "Homes",
  },
  {
    title: "Bay window tracks",
    description:
      "Accurate measuring, shaping and installation for angled, curved, square and unusual bay windows.",
    href: "/services/bay-window-curtain-track-installation",
    image: "/images/gallery/bay-windows/eze-square-bay-curtains.webp",
    alt: "Curtains fitted precisely around a square bay window",
    label: "Shaped",
  },
  {
    title: "Wave curtain tracks",
    description:
      "Careful track positioning and carrier spacing for smooth, consistent wave curtain folds.",
    href: "/services/wave-curtain-track-installation",
    image: "/images/gallery/bay-windows/gardinskinner-white-wave-bay.webp",
    alt: "White wave curtains following a rounded ceiling track",
    label: "Wave",
  },
  {
    title: "Ceiling-mounted tracks",
    description:
      "Clean ceiling-fixed installations planned around structure, curtain load, projection and access.",
    href: "/services/ceiling-mounted-curtain-track-installation",
    image: "/images/gallery/bay-windows/etikk-ceiling-curved-track.webp",
    alt: "White curved curtain track mounted directly to a ceiling",
    label: "Ceiling",
  },
  {
    title: "Commercial installation",
    description:
      "Specialist fitting for hotels, offices, care environments, developers and multi-room projects.",
    href: "/services/commercial-curtain-track-installation",
    image: "/images/showcase/forest/office-curtains.webp",
    alt: "Full height curtains creating flexible spaces in a commercial interior",
    label: "Commercial",
  },
  {
    title: "Motorised curtain tracks",
    description:
      "Quiet automated curtain systems with coordinated tracks, motors, controls and power planning.",
    href: "/motorised-curtain-tracks",
    image: "/images/gallery/forest/mcs-hotel.webp",
    alt: "Layered curtains operated by a motorised track in a modern room",
    label: "Automated",
  },
];

const installationImages: VisualStoryItem[] = [
  {
    src: "/images/gallery/bay-windows/bridges-bespoke-bay.webp",
    alt: "Full length curtains fitted around a traditional curved bay window",
    label: "Residential",
    title: "A shaped installation that preserves the character of the room",
    credit: "Image source: Bridges Interiors",
    sourceUrl: "https://bridgesinteriors.com/curtains",
  },
  {
    src: "/images/gallery/bay-windows/gardinskinner-white-wave-bay.webp",
    alt: "White wave curtains following a continuous curved ceiling track",
    label: "Wave curtains",
    title: "Consistent folds following the complete window line",
    credit: "Image source: Gardinskinner.dk",
    sourceUrl:
      "https://gardinskinner.dk/blogs/guides-gardinsyning-gardinskinner/bukket-gardinskinner-til-karnap",
  },
  {
    src: "/images/showcase/forest/office-curtains.webp",
    alt: "Full height curtains installed in a contemporary commercial interior",
    label: "Commercial",
    title: "Track systems planned for the way a space will be used",
    credit: "Product imagery courtesy of Forest Group",
    sourceUrl: "https://www.forestgroup.com/uk/",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Enter your postcode",
    description:
      "Confirm the installation area and begin the correct TrackFit route.",
  },
  {
    number: "02",
    title: "Show us the windows",
    description:
      "Upload clear room and window photographs with your project details.",
  },
  {
    number: "03",
    title: "Receive a reviewed quotation",
    description:
      "We assess the shape, fixing surface, curtain weight and access requirements.",
  },
  {
    number: "04",
    title: "Professional installation",
    description:
      "An experienced fitter installs and checks the complete track system.",
  },
];

export default function HomePageExperience() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  async function beginJourney(postcode: string) {
    if (isTransitioning) return;

    window.sessionStorage.setItem("trackfit-postcode", postcode);
    setIsTransitioning(true);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1100);
    });

    router.push("/welcome?postcode=" + encodeURIComponent(postcode));
  }

  return (
    <>
      <SiteHeader />

      <main className="overflow-hidden bg-[#080A09] text-[#F4F1E8]">
        <section className="relative min-h-[780px] overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/gallery/bay-windows/bridges-bespoke-bay.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#070908_0%,rgba(7,9,8,0.96)_42%,rgba(7,9,8,0.5)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,8,0.18)_0%,rgba(7,9,8,0.1)_52%,#080A09_100%)]" />
          </div>

          <div
            aria-hidden="true"
            className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#B8F23D]/10 blur-[160px]"
          />

          <div className="relative mx-auto grid min-h-[780px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.75fr] lg:px-10 lg:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#B8F23D]/25 bg-[#0A0D0B]/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D] backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#B8F23D]" />
                UK curtain track installation specialists
              </div>

              <h1 className="mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-[82px]">
                Precision fitted.
                <span className="block text-[#B8F23D]">
                  Beautifully finished.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Specialist curtain track installation for homes, interior designers and commercial projects throughout the United Kingdom.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#services"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/18 bg-black/25 px-6 font-semibold text-white backdrop-blur-xl transition hover:border-[#B8F23D]/40 hover:bg-[#B8F23D]/10"
                >
                  Explore services
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/18 bg-black/25 px-6 font-semibold text-white backdrop-blur-xl transition hover:border-[#B8F23D]/40 hover:bg-[#B8F23D]/10"
                >
                  View installation gallery
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/55">
                <span>12+ years fitting experience</span>
                <span className="text-[#B8F23D]">•</span>
                <span>Nationwide coverage</span>
                <span className="text-[#B8F23D]">•</span>
                <span>Residential and commercial</span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[470px] rounded-[34px] border border-white/12 bg-[#0A0D0B]/64 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl lg:justify-self-end">
              <PostcodeCard onContinue={beginJourney} />
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0D100E]">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 text-sm sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
            {[
              ["12+ years", "Specialist fitting experience"],
              ["UK-wide", "Nationwide project coverage"],
              ["Homes and trade", "Residential and commercial"],
              ["Photo review", "Project checked before fitting"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="flex items-center gap-4 border-white/10 lg:border-r lg:last:border-r-0"
              >
                <strong className="text-lg text-[#B8F23D]">{value}</strong>
                <span className="text-white/48">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
        >
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
                Installation services
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                The right track for the room, window and curtains.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/58 lg:justify-self-end">
              Choose the closest project type. If you are unsure, send photographs and TrackFit will help identify the most suitable route.
            </p>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative min-h-[430px] overflow-hidden rounded-[30px] border border-white/10 bg-[#121512] transition hover:-translate-y-1 hover:border-[#B8F23D]/35"
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                    {service.label}
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-white/65">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-white transition group-hover:text-[#B8F23D]">
                    Explore service <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold transition hover:border-[#B8F23D]/40 hover:bg-[#B8F23D]/10"
            >
              View all TrackFit services
            </Link>
          </div>
        </section>

        <VisualProjectStrip
          id="home-installations"
          eyebrow="Installation gallery"
          title="Real track solutions in finished spaces."
          description="See how shaped tracks, wave curtains and commercial systems work as part of the complete room rather than as isolated products."
          items={installationImages}
        />

        <section className="border-b border-white/10 bg-[#0B0E0C]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
                From enquiry to installation
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                A clearer way to plan curtain track fitting.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-[#B8F23D]">
                    {step.number}
                  </span>
                  <h3 className="mt-7 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/52">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PricingPreview />

        <section className="relative overflow-hidden border-t border-white/10">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[-280px] h-[540px] w-[780px] -translate-x-1/2 rounded-full bg-[#B8F23D]/12 blur-[160px]"
          />
          <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
              Ready to plan your installation?
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Tell us about the windows and we will help identify the right track.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">
              Start with your postcode, then add project details and photographs for review.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/quote/postcode"
                className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09] transition hover:scale-[1.02] hover:bg-[#C8FF52]"
              >
                Start your quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-8 font-semibold transition hover:border-white/35"
              >
                Speak to TrackFit
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CurtainTransition active={isTransitioning} />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import GalleryExplorer from "@/components/gallery/GalleryExplorer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { galleryImages } from "@/lib/gallery/data";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/gallery";

export const metadata: Metadata = createMetadata({
  title: "Curtain Track and Curtain Inspiration Gallery",
  description: "Explore curtain tracks, wave curtains, bay and curved systems, motorised tracks and commercial curtain installations for your TrackFit project.",
  path: pagePath,
  image: "/images/gallery/forest/black-track-interior.webp",
  keywords: [
    "curtain track gallery",
    "curtain installation ideas",
    "bay window curtain track inspiration",
    "wave curtain track images",
    "motorised curtains gallery",
  ],
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Gallery", path: pagePath }]} />
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="absolute left-[-14rem] top-[-16rem] h-[42rem] w-[42rem] rounded-full bg-[#B8F23D]/10 blur-[150px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Track and curtain inspiration</p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                See how the right track changes the room.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
                Explore discreet tracks, shaped systems, wave headings, layered curtains and motorised finishes across homes, hotels and commercial spaces.
              </p>
              <a href="#gallery-explorer" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#101310]">Explore the collection ↓</a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-white/10">
                <Image src="/images/gallery/forest/black-track-interior.webp" alt="Black curtain tracks in a contemporary curtain setting" fill priority sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover" />
              </div>
              <div className="mt-10 grid gap-3">
                <div className="relative aspect-square overflow-hidden rounded-[26px] border border-white/10">
                  <Image src="/images/gallery/forest/curved-office-divider.webp" alt="Curved curtain track room divider" fill priority sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover" />
                </div>
                <div className="rounded-[24px] border border-[#B8F23D]/25 bg-[#B8F23D]/10 p-5">
                  <strong className="text-3xl">{galleryImages.length}</strong>
                  <span className="mt-1 block text-sm text-white/55">ideas and system details</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F2EFE7] text-[#101310]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#557600]">Gallery</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">From the fixing line to the finished room.</h2>
              <p className="mt-5 text-base leading-7 text-black/58">Use these examples to identify the shape, finish and level of concealment you prefer. TrackFit will match the idea to the correct track, curtain load and fixing surface.</p>
            </div>

            <GalleryExplorer images={galleryImages} />

            <p className="mt-6 text-sm leading-6 text-black/48">Manufacturer, supplier and interior specialist imagery is shown for design reference, with original source credits on each relevant image. TrackFit is an independent installation specialist.</p>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10">
          <div aria-hidden="true" className="absolute left-1/2 top-[-220px] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[#B8F23D]/12 blur-[150px]" />
          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Found a look you like?</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Show us the room and the finish you want.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">Send clear photographs and approximate measurements. We will recommend the appropriate system and provide a written quotation.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]">Get a quotation →</Link>
              <Link href="/pricing" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-8 font-semibold">View guide prices</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

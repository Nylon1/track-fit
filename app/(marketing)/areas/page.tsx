import type { Metadata } from "next";
import Image from "next/image";
import { areaImages } from "@/lib/areas/images";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { areaRegionOrder, areas } from "@/lib/areas/data";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Curtain Track Installation Areas | TrackFit",
  description:
    "Explore TrackFit curtain-track installation coverage across major cities in England.",
  path: "/areas",
});

function regionId(region: string) {
  return region.toLowerCase().replaceAll(" ", "-");
}

export default function AreasPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          {areaImages.london && <Image src={areaImages.london.src} alt={areaImages.london.alt} fill priority sizes="100vw" className="object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A09]/95 via-[#080A09]/80 to-[#080A09]/30" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Nationwide coverage
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Installation Areas
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Local guidance for different property types, window
              styles and installation conditions across England.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <nav aria-label="Area regions" className="flex flex-wrap gap-3">
            {areaRegionOrder.map((region) => (
              <a
                key={region}
                href={`#${regionId(region)}`}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-[#D8D7CF] transition hover:border-[#B8F23D]/45 hover:text-white"
              >
                {region}
              </a>
            ))}
          </nav>

          <div className="mt-14 space-y-16">
            {areaRegionOrder.map((region) => {
              const regionAreas = areas.filter(
                (area) => area.regionGroup === region,
              );

              return (
                <section
                  key={region}
                  id={regionId(region)}
                  className="scroll-mt-24"
                >
                  <h2 className="text-3xl font-semibold sm:text-4xl">
                    {region}
                  </h2>

                  <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {regionAreas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/areas/${area.slug}`}
                        className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] transition hover:border-[#B8F23D]/45 hover:bg-white/[0.055]"
                      >
                        {areaImages[area.slug] && <div className="relative aspect-[16/10] overflow-hidden bg-white/5"><Image src={areaImages[area.slug].src} alt={areaImages[area.slug].alt} fill sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" /></div>}
                        <div className="p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                          {area.region}
                        </p>

                        <h3 className="mt-3 text-3xl font-semibold">
                          {area.name}
                        </h3>

                        <p className="mt-4 line-clamp-4 leading-7 text-[#AAACA4]">
                          {area.intro}
                        </p>

                        <span className="mt-7 inline-flex font-semibold text-[#F4F1E8] transition group-hover:text-[#B8F23D]">
                          View local guidance →
                        </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
        <details className="mx-auto mb-16 max-w-7xl rounded-2xl border border-white/10 px-6 py-4 text-xs text-white/60">
          <summary className="flex items-center text-sm font-semibold text-white">Location photography credits</summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{areas.map(area => { const photo = areaImages[area.slug]; return photo ? <p key={area.slug}><strong className="text-white/80">{area.name}</strong><br /><a className="underline" href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author}</a>{" · "}<a className="underline" href={photo.licenseUrl || photo.sourceUrl} target="_blank" rel="noreferrer">{photo.license}</a></p> : null; })}</div>
          <p className="mt-5">Images resized and cropped for display.</p>
        </details>
      </main>
    </>
  );
}

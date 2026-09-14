import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools/data";
import { createMetadata } from "@/lib/seo/metadata";
import VisualProjectStrip, { type VisualStoryItem } from "@/components/site/VisualProjectStrip";

export const metadata: Metadata = createMetadata({
  title: "Free Curtain Track Tools & Calculators | TrackFit",
  description: "Free tools to measure, choose and plan curtain tracks for windows and doors.",
  path: "/tools",
  image: "/images/gallery/bay-windows/etikk-ceiling-curved-track.webp",
});

const groups = [
  { slug: "measure", title: "Measure", description: "Work out lengths, dimensions and curtain stack requirements." },
  { slug: "choose", title: "Choose", description: "Compare track types and identify a suitable system." },
  { slug: "plan", title: "Plan", description: "Prepare support positions and installation details." },
] as const;

const planningImages: VisualStoryItem[] = [
  {
    src: "/images/gallery/bay-windows/etikk-ceiling-curved-track.webp",
    alt: "Close view of a ceiling track following the exact shape of a bay window",
    label: "Measure",
    title: "Capture the window shape, fixing line and clearances",
    credit: "Image source: Etikk",
    sourceUrl: "https://etikk.dk/blog/hvilke-gardiner-skal-jeg-vaelge-til-min-karnap",
  },
  {
    src: "/images/gallery/bay-windows/gordon-smith-curved-track.webp",
    alt: "Curved curtain track fitted around a rounded bay before curtains are hung",
    label: "Plan",
    title: "Turn measurements into a practical track path",
    credit: "Image source: Gordon Smith",
    sourceUrl: "https://www.gordonsmithmalvern.co.uk/latest-projects/Curved%20bay%20curtains/99/latest-projects/Curved-bay-curtains/99/",
  },
  {
    src: "/images/showcase/forest/ks-profile.webp",
    alt: "White curtain track profile and carriers shown in close detail",
    label: "Choose",
    title: "Match the profile and carriers to the finished curtain",
    credit: "Product imagery courtesy of Forest Group",
    sourceUrl: "https://www.forestgroup.com/uk/",
  },
];

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">TrackFit tools</p>
              <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Practical tools for planning curtain tracks properly.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
                Free calculators that make measuring and planning easier before ordering a track or arranging installation.
              </p>
              <Link href="/tools/curtain-track-length-calculator" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 py-3 font-semibold text-[#080A09] hover:bg-[#C7FF4A]">
                Calculate your track length
              </Link>
            </div>
            <figure className="relative min-h-[390px] overflow-hidden rounded-[34px] border border-white/10 bg-[#171A18]">
              <Image src="/images/gallery/bay-windows/gordon-smith-curved-track.webp" alt="Precisely shaped ceiling curtain track around a bay window" fill priority sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Plan before fitting</span>
                <strong className="mt-2 block text-xl">Shape, projection and support all matter.</strong>
              </figcaption>
            </figure>
          </div>
        </section>

        <VisualProjectStrip
          id="planning-examples"
          eyebrow="From room to plan"
          title="The details our tools help you work through."
          description="Measure the opening, define the track path, allow for curtain projection and choose a system that suits the load and fixing surface."
          items={planningImages}
        />

        <div className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          {groups.map((group) => (
            <section key={group.slug}>
              <div className="mb-8 max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Tool category</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{group.title}</h2>
                <p className="mt-4 leading-7 text-[#AAACA4]">{group.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tools.filter((tool) => tool.category === group.slug).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

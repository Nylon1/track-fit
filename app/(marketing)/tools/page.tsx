import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools/data";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Free Curtain Track Tools & Calculators | TrackFit",
  description: "Free tools to measure, choose and plan curtain tracks for windows and doors.",
  path: "/tools",
});

const groups = [
  { slug: "measure", title: "Measure", description: "Work out lengths, dimensions and curtain stack requirements." },
  { slug: "choose", title: "Choose", description: "Compare track types and identify a suitable system." },
  { slug: "plan", title: "Plan", description: "Prepare support positions and installation details." },
] as const;

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">TrackFit tools</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Practical tools for planning curtain tracks properly.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Free calculators that make measuring and planning easier before ordering a track or arranging installation.
            </p>
            <Link
              href="/tools/curtain-track-length-calculator"
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 py-3 font-semibold text-[#080A09] hover:bg-[#C7FF4A]"
            >
              Calculate your track length
            </Link>
          </div>
        </section>

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

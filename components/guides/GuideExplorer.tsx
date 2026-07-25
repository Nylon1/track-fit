"use client";

import { useMemo, useState } from "react";
import type { Guide, GuideCategoryDefinition } from "@/lib/guides/types";
import { GuideCard } from "./GuideCard";

type GuideExplorerProps = {
  guides: Guide[];
  categories: GuideCategoryDefinition[];
};

export function GuideExplorer({
  guides,
  categories,
}: GuideExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredGuides = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return guides.filter((guide) => {
      const matchesCategory =
        category === "all" || guide.category === category;

      const haystack = [
        guide.title,
        guide.summary,
        guide.quickAnswer,
        guide.eyebrow,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalisedQuery || haystack.includes(normalisedQuery))
      );
    });
  }, [category, guides, query]);

  return (
    <section id="all-guides" className="scroll-mt-24">
      <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
        <label
          htmlFor="guide-search"
          className="text-sm font-semibold text-[#F4F1E8]"
        >
          Search curtain track advice
        </label>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
          <input
            id="guide-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “bay window”, “plasterboard” or “heavy curtains”"
            className="min-h-12 rounded-full border border-white/15 bg-[#080A09] px-5 text-[#F4F1E8] outline-none placeholder:text-[#7E817A] focus:border-[#B8F23D]"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter guides by category"
            className="min-h-12 rounded-full border border-white/15 bg-[#080A09] px-5 text-[#F4F1E8] outline-none focus:border-[#B8F23D]"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-[#AAACA4]" aria-live="polite">
          {filteredGuides.length} guide
          {filteredGuides.length === 1 ? "" : "s"} found
        </p>
      </div>

      {filteredGuides.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredGuides.map((guide) => (
            <div className="relative" key={guide.slug}>
              <GuideCard guide={guide} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="text-2xl font-semibold text-[#F4F1E8]">
            No matching guides yet
          </h2>
          <p className="mt-3 text-[#AAACA4]">
            Try a broader phrase or view all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-6 rounded-full bg-[#B8F23D] px-6 py-3 font-semibold text-[#080A09]"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

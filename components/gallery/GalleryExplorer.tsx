"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery/data";

export default function GalleryExplorer({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState("All inspiration");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = images.filter((item) => category === "All inspiration" || item.category === category);
  const active = selected === null ? null : filtered[selected];
  const categories = ["All inspiration", ...new Set(images.map((item) => item.category))];

  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { modal?.close(); document.body.style.overflow = previous; };
  }, [isOpen]);

  function move(direction: number) {
    setSelected((current) => current === null ? null : (current + direction + filtered.length) % filtered.length);
  }

  return (
    <div id="gallery-explorer" data-no-reveal className="mt-10">
      <div aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {categories.map((label) => (
          <button key={label} type="button" aria-pressed={category === label} onClick={() => setCategory(label)} className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${category === label ? "border-[#101310] bg-[#101310] text-white" : "border-black/15 bg-white/50 text-[#101310] hover:border-black/40"}`}>
            {label}
          </button>
        ))}
      </div>
      <p role="status" className="my-5 text-sm text-black/60">{filtered.length} ideas to explore. Select an image for a closer look.</p>
      <div key={category} className="tf-gallery-grid grid auto-rows-[280px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <figure key={item.src} className={`group relative overflow-hidden rounded-[24px] bg-[#D9D7CF] ${item.format === "wide" ? "sm:col-span-2" : ""} ${item.format === "tall" ? "sm:row-span-2" : ""}`}>
            <button type="button" onClick={() => setSelected(index)} aria-label={`View ${item.title}`} className="absolute inset-0 h-full w-full text-left">
              <Image src={item.src} alt={item.alt} fill sizes={item.format === "wide" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl text-white" aria-hidden="true">↗</span>
            </button>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8F23D]">{item.category}</span>
              <strong className="mt-1 block text-lg">{item.title}</strong>
              {item.credit && (item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="pointer-events-auto mt-2 inline-block text-xs text-white/80 underline underline-offset-4">{item.credit}</a> : <span className="mt-2 block text-xs text-white/80">{item.credit}</span>)}
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} aria-labelledby="gallery-image-title" onCancel={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }} className="tf-gallery-dialog m-auto w-[calc(100%-2rem)] max-w-6xl overflow-auto rounded-3xl border border-white/15 bg-[#101310] p-4 text-white shadow-2xl sm:p-6">
        {active && <>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm text-white/65">{(selected ?? 0) + 1} / {filtered.length} · {active.category}</p>
            <button autoFocus type="button" onClick={() => setSelected(null)} className="min-h-11 rounded-full border border-white/25 px-5 text-sm font-semibold">Close ✕</button>
          </div>
          <div className="relative h-[55vh] sm:h-[65vh]">
            <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div><h2 id="gallery-image-title" className="text-xl font-semibold">{active.title}</h2>{active.credit && <p className="mt-1 text-sm text-white/65">{active.sourceUrl ? <a className="underline underline-offset-4" href={active.sourceUrl} target="_blank" rel="noreferrer">{active.credit}</a> : active.credit}</p>}</div>
            <div className="flex gap-2"><button type="button" onClick={() => move(-1)} aria-label="Previous image" className="h-12 w-12 rounded-full border border-white/25">←</button><button type="button" onClick={() => move(1)} aria-label="Next image" className="h-12 w-12 rounded-full bg-[#B8F23D] text-[#101310]">→</button></div>
          </div>
        </>}
      </dialog>
    </div>
  );
}

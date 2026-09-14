import Image from "next/image";
import { areaImages } from "@/lib/areas/images";

export function AreaPhoto({ slug }: { slug: string }) {
  const photo = areaImages[slug];
  if (!photo) return null;
  return <figure className="mt-10 overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.03]">
    <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[21/9]">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width:1280px) 1200px, 100vw" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-5 pt-12"><p className="text-lg font-semibold text-white">{photo.place}</p></div>
    </div>
    <figcaption className="px-6 py-3 text-xs leading-5 text-white/60"><details><summary className="flex items-center">Photo credits · {photo.license}</summary><p className="mt-2"><a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">Photo: {photo.author}</a>{" · "}<a href={photo.licenseUrl || photo.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">{photo.license}</a>{" · Resized and cropped for display."}</p></details></figcaption>
  </figure>;
}

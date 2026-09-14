import { galleryImages } from "@/lib/gallery/data";
import type { Guide } from "./types";
import manifest from "./image-manifest.json";

type GuideVisual = {
  src: string;
  alt: string;
  title: string;
  credit?: string;
  sourceUrl?: string;
  fit?: "contain" | "cover";
};
type ManifestEntry = Partial<GuideVisual> & { existing?: string };
const entries: Record<string, ManifestEntry> = manifest as Record<string, ManifestEntry>;

export function getGuideVisual(guide: Pick<Guide, "slug" | "category">): GuideVisual {
  const entry = entries[guide.slug];
  if (entry?.src && entry.alt && entry.title) return entry as GuideVisual;
  const image = galleryImages.find((item) => item.src.split("/").pop() === (entry?.existing ?? "black-track-interior.webp")) ?? galleryImages[0];
  return { ...image, fit: image.category === "System detail" ? "contain" : "cover" };
}

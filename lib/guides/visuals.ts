import { galleryImages } from "@/lib/gallery/data";
import type { Guide } from "./types";

export function getGuideVisual(guide: Pick<Guide, "slug" | "category">) {
  const name = guide.slug;
  const file = /wave/.test(name) ? "recessed-wave.jpg"
    : /bay|curved|corner/.test(name) ? "bridges-bespoke-bay.webp"
    : /bedroom|blackout/.test(name) ? "dubai-hotel-room.webp"
    : /ceiling|recess/.test(name) ? "trackfit-entry-poster.jpeg"
    : /motor|electric/.test(name) ? "shuttle-hotel.webp"
    : guide.category === "commercial" ? "office-curtains.webp"
    : /bracket|fix|repair|drill|plaster|track-vs|aluminium/.test(name) ? "ks-profile.webp"
    : guide.category === "measuring" ? "etikk-ceiling-curved-track.webp"
    : guide.category === "rooms" ? "hotel-curtains.webp"
    : "black-track-interior.webp";
  return galleryImages.find((image) => image.src.endsWith(file))!;
}

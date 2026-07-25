import Image from "next/image";

type GuideHeroVisualProps = {
  title: string;
  image?: string;
};

export function GuideHeroVisual({
  title,
  image,
}: GuideHeroVisualProps) {
  if (image) {
    return (
      <div className="relative aspect-[16/8] overflow-hidden rounded-[32px] border border-white/10">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1280px) 1100px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/7] overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(184,242,61,0.18),transparent_30%),linear-gradient(135deg,#111411,#080A09)]">
      <div className="absolute inset-x-8 bottom-8 h-px bg-[#B8F23D]/50" />
      <div className="absolute left-8 top-8 max-w-md">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
          TrackFit guide
        </p>
        <p className="mt-3 text-2xl font-semibold text-[#F4F1E8]">
          {title}
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

export type VisualStoryItem = {
  src: string;
  alt: string;
  label: string;
  title: string;
  credit: string;
  sourceUrl?: string;
};

type VisualProjectStripProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: readonly VisualStoryItem[];
};

export default function VisualProjectStrip({ id, eyebrow, title, description, items }: VisualProjectStripProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className="border-y border-white/10 bg-[#0E100F]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">{eyebrow}</p>
            <h2 id={`${id}-heading`} className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-white/58 lg:justify-self-end">{description}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {items.slice(0, 3).map((item, index) => (
            <figure
              key={item.src}
              className={`group relative min-h-[300px] overflow-hidden rounded-[30px] border border-white/10 bg-[#171A18] shadow-[0_22px_65px_rgba(0,0,0,0.28)] ${index === 0 ? "lg:col-span-7 lg:row-span-2 lg:min-h-[560px]" : "lg:col-span-5 lg:min-h-0"}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 56vw, 94vw" : "(min-width: 1024px) 40vw, 94vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">{item.label}</span>
                <strong className="mt-2 block max-w-xl text-xl leading-snug text-white sm:text-2xl">{item.title}</strong>
                {item.sourceUrl ? (
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-white/55 underline decoration-white/25 underline-offset-4 transition hover:text-white">
                    {item.credit}
                  </a>
                ) : (
                  <span className="mt-3 block text-xs text-white/55">{item.credit}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

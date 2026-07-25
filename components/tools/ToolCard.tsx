import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools/types";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const live = tool.status === "live";

  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
          {tool.category}
        </p>
        <span className="rounded-full bg-[#B8F23D]/10 px-3 py-1 text-xs font-semibold text-[#B8F23D]">
          {live ? "Free tool" : "Coming soon"}
        </span>
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-[#F4F1E8]">{tool.title}</h2>
      <p className="mt-4 leading-7 text-[#AAACA4]">{tool.description}</p>

      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
        <span className="text-sm text-[#8F928B]">{tool.duration}</span>
        {live ? (
          <Link href={`/tools/${tool.slug}`} className="font-semibold hover:text-[#B8F23D]">
            Open tool →
          </Link>
        ) : (
          <span className="text-sm text-[#6F726C]">In development</span>
        )}
      </div>
    </article>
  );
}

type InstallerInsightProps = {
  children: React.ReactNode;
};

export function InstallerInsight({
  children,
}: InstallerInsightProps) {
  return (
    <aside className="rounded-[26px] border border-[#B8F23D]/30 bg-[#B8F23D]/8 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
        TrackFit installer insight
      </p>
      <div className="mt-3 leading-7 text-[#F4F1E8]">
        {children}
      </div>
    </aside>
  );
}

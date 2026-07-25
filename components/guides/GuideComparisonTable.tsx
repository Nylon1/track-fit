type ComparisonRow = {
  label: string;
  values: string[];
};

type GuideComparisonTableProps = {
  headings: string[];
  rows: ComparisonRow[];
};

export function GuideComparisonTable({
  headings,
  rows,
}: GuideComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-[26px] border border-white/10">
      <table className="min-w-full border-collapse text-left">
        <thead className="bg-white/[0.06]">
          <tr>
            {headings.map((heading) => (
              <th
                key={heading}
                className="px-5 py-4 text-sm font-semibold text-[#F4F1E8]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.label}>
              <th className="px-5 py-4 text-sm font-semibold text-[#F4F1E8]">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={`${row.label}-${index}`}
                  className="px-5 py-4 text-sm text-[#C8C8C1]"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

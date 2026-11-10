import type { BenchmarkResult } from "@/lib/types"

interface BenchmarkComparisonProps {
  benchmarks: BenchmarkResult[]
}

export function BenchmarkComparison({ benchmarks }: BenchmarkComparisonProps) {
  if (!benchmarks.length) return <p className="text-sm text-slate-500">No benchmark records are included in this sample.</p>

  return (
    <div className="divide-y divide-slate-100">
      {benchmarks.map((benchmark) => (
        <div key={benchmark.name} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div><p className="text-sm font-semibold text-slate-900">{benchmark.name}</p><p className="mt-1 text-[11px] text-slate-400">Sample record · {benchmark.date.toLocaleDateString("en", { month: "short", year: "numeric" })}</p></div>
          <p className="text-lg font-semibold tabular-nums text-blue-700">{benchmark.score}<span className="ml-1 text-[10px] font-normal text-slate-400">raw score</span></p>
        </div>
      ))}
    </div>
  )
}

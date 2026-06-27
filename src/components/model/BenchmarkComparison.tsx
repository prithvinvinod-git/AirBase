"use client"

import { Progress } from "@/components/ui/progress"
import type { BenchmarkResult } from "@/lib/types"

interface BenchmarkComparisonProps {
  benchmarks: BenchmarkResult[]
}

export function BenchmarkComparison({ benchmarks }: BenchmarkComparisonProps) {
  if (!benchmarks.length) {
    return (
      <p className="text-body text-muted-indigo">No benchmark data available.</p>
    )
  }

  return (
    <div className="space-y-5">
      {benchmarks.map((benchmark) => (
        <div key={benchmark.name}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-body font-medium text-midnight-navy">{benchmark.name}</span>
            <span className="text-body font-bold text-atlassian-blue">{benchmark.score}%</span>
          </div>
          <Progress value={benchmark.score} className="h-2.5" />
        </div>
      ))}
    </div>
  )
}

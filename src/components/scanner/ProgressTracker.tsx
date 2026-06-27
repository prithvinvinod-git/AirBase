"use client"

import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2, Clock } from "lucide-react"
import type { ScanProgress } from "@/lib/types"

const phases = [
  "Queueing",
  "Crawling",
  "Analyzing HTML",
  "Checking AI-friendliness",
  "Scoring",
  "Generating report",
]

interface ProgressTrackerProps {
  progress: ScanProgress
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  const currentIndex = phases.findIndex(
    (p) => p.toLowerCase() === progress.phase.toLowerCase()
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-atlassian-blue animate-spin" />
          <span className="text-body font-medium text-midnight-navy">
            {progress.phase}
          </span>
        </div>
        <span className="text-caption text-muted-indigo">{progress.percent}%</span>
      </div>

      <Progress value={progress.percent} className="h-2" />

      <div className="space-y-2">
        {phases.map((phase, i) => {
          const isComplete = i < currentIndex
          const isCurrent = i === currentIndex
          return (
            <div
              key={phase}
              className={`flex items-center gap-2 text-caption ${
                isComplete
                  ? "text-green-600"
                  : isCurrent
                  ? "text-atlassian-blue"
                  : "text-ash-gray"
              }`}
            >
              {isComplete ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : isCurrent ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              <span>{phase}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

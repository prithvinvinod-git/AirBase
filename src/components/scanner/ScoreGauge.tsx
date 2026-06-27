"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ScoreGaugeProps {
  score: number
  grade: string
}

function getGradeColor(grade: string): string {
  if (grade.startsWith("A")) return "text-green-600"
  if (grade.startsWith("B")) return "text-blue-600"
  if (grade.startsWith("C")) return "text-yellow-600"
  if (grade.startsWith("D")) return "text-orange-600"
  return "text-red-600"
}

function getProgressColor(score: number): string {
  if (score >= 90) return "bg-green-500"
  if (score >= 70) return "bg-atlassian-blue"
  if (score >= 50) return "bg-taxicab-yellow"
  return "bg-red-500"
}

export function ScoreGauge({ score, grade }: ScoreGaugeProps) {
  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center mb-3">
        <div className="w-32 h-32 rounded-full bg-fog-white flex items-center justify-center">
          <div className="text-center">
            <p className={cn(
              "font-charlie-display font-bold text-display leading-display",
              getGradeColor(grade)
            )}
            style={{ fontSize: "2.5rem" }}
            >
              {grade}
            </p>
            <p className="text-caption text-muted-indigo -mt-1">Grade</p>
          </div>
        </div>
      </div>
      <p className={cn(
        "font-charlie-display font-bold text-heading-lg leading-heading-lg",
        getGradeColor(grade)
      )}>
        {score}/100
      </p>
      <p className="text-body text-muted-indigo mt-1">WebCore Index</p>
      <Progress
        value={score}
        className="h-2.5 mt-4 max-w-xs mx-auto"
        indicatorClassName={getProgressColor(score)}
      />
    </div>
  )
}

"use client"

import { Progress } from "@/components/ui/progress"

interface ScoreBreakdownProps {
  scores: Record<string, number>
}

const scoreLabels: Record<string, string> = {
  ai_readability: "AI Readability",
  schema_markup: "Schema Markup",
  llm_friendliness: "LLM Friendliness",
  content_quality: "Content Quality",
  accessibility: "Accessibility",
  performance: "Performance",
}

function getScoreColor(score: number): string {
  if (score >= 90) return "bg-green-500"
  if (score >= 70) return "bg-atlassian-blue"
  if (score >= 50) return "bg-taxicab-yellow"
  return "bg-red-500"
}

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  const entries = Object.entries(scores)

  if (!entries.length) {
    return <p className="text-body text-muted-indigo">No score data available.</p>
  }

  return (
    <div className="space-y-5">
      {entries.map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-body font-medium text-midnight-navy">
              {scoreLabels[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            <span className="text-body font-bold text-midnight-navy">{value}%</span>
          </div>
          <Progress value={value} className="h-2.5" indicatorClassName={getScoreColor(value)} />
        </div>
      ))}
    </div>
  )
}

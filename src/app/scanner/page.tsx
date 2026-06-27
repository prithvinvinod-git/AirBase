"use client"

import { useState } from "react"
import { Scan, Shield, BarChart3, FileText } from "lucide-react"
import { ScanForm } from "@/components/scanner/ScanForm"
import { ProgressTracker } from "@/components/scanner/ProgressTracker"
import { ScoreGauge } from "@/components/scanner/ScoreGauge"
import { ScoreBreakdown } from "@/components/scanner/ScoreBreakdown"
import type { ScanResults, ScanProgress } from "@/lib/types"
import type { Metadata } from "next"

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState<ScanProgress | null>(null)
  const [results, setResults] = useState<ScanResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = async (url: string) => {
    setIsScanning(true)
    setError(null)
    setResults(null)
    setProgress({ phase: "Queueing", percent: 0 })

    // Simulate scan phases
    const phases: { phase: string; percent: number; duration: number }[] = [
      { phase: "Queueing", percent: 5, duration: 800 },
      { phase: "Crawling", percent: 20, duration: 2000 },
      { phase: "Analyzing HTML", percent: 40, duration: 2500 },
      { phase: "Checking AI-friendliness", percent: 60, duration: 2000 },
      { phase: "Scoring", percent: 80, duration: 1500 },
      { phase: "Generating report", percent: 100, duration: 1500 },
    ]

    for (const phase of phases) {
      setProgress({ phase: phase.phase, percent: phase.percent })
      await new Promise((resolve) => setTimeout(resolve, phase.duration))
    }

    // Simulate results
    const mockResults: ScanResults = {
      webcoreIndex: 87,
      webcoreGrade: "A-",
      scores: {
        ai_readability: 92,
        schema_markup: 78,
        llm_friendliness: 84,
        content_quality: 95,
        accessibility: 82,
        performance: 76,
      },
      findings: [],
      executiveSummary:
        "Your website demonstrates strong AI-readiness with excellent content quality and readability. Consider improving schema markup implementation to enhance LLM comprehension.",
    }

    setResults(mockResults)
    setIsScanning(false)
  }

  return (
    <div className="mx-auto max-w-page-max px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-radius-2xl bg-surface-tinted-surface mb-4">
          <Shield className="w-8 h-8 text-atlassian-blue" />
        </div>
        <h1 className="font-charlie-display font-medium text-heading-lg leading-heading-lg text-midnight-navy mb-3">
          AI Score Scanner
        </h1>
        <p className="text-body text-muted-indigo leading-body max-w-lg mx-auto">
          Scan your website&apos;s AI-readiness. Get actionable insights to make your site
          more discoverable by AI models and LLMs.
        </p>
      </div>

      {/* Scan Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="p-6 rounded-radius-2xl border border-fog-white bg-pure-white shadow-subtle">
          <ScanForm onScan={handleScan} isLoading={isScanning} />
        </div>
      </div>

      {/* Progress */}
      {isScanning && progress && (
        <div className="max-w-lg mx-auto mb-12 p-6 rounded-radius-2xl border border-fog-white bg-pure-white animate-fade-in">
          <ProgressTracker progress={progress} />
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Score gauge */}
          <div className="mb-8 p-8 rounded-radius-2xl border border-fog-white bg-pure-white shadow-subtle">
            <ScoreGauge score={results.webcoreIndex} grade={results.webcoreGrade} />
          </div>

          {/* Score breakdown */}
          <div className="mb-8 p-8 rounded-radius-2xl border border-fog-white bg-pure-white shadow-subtle">
            <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-6">
              Category Scores
            </h2>
            <ScoreBreakdown scores={results.scores} />
          </div>

          {/* Executive Summary */}
          <div className="p-8 rounded-radius-2xl bg-surface-lavender-band">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-midnight-navy mt-0.5 shrink-0" />
              <div>
                <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-2">
                  Executive Summary
                </h2>
                <p className="text-body text-midnight-navy leading-body">
                  {results.executiveSummary}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-lg mx-auto mt-8 p-4 rounded-radius-2xl bg-red-50 border border-red-200">
          <p className="text-body text-red-700">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!isScanning && !results && !error && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-fog-white mb-6">
            <Scan className="w-12 h-12 text-muted-indigo" />
          </div>
          <p className="text-body text-muted-indigo">
            Enter a URL above to start scanning
          </p>
        </div>
      )}
    </div>
  )
}

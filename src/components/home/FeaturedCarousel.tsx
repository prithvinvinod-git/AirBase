"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { formatCurrency, formatLatency } from "@/lib/utils"
import { models } from "@/lib/mock-data"

export function FeaturedCarousel() {
  const featured = models.filter(m => m.demand >= 90)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % featured.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featured.length])

  if (!featured.length) return null

  const model = featured[current]

  return (
    <section className="bg-surface-dark-panel -mt-1">
      <div className="mx-auto max-w-page-max px-6 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-taxicab-yellow" />
            <h2 className="font-charlie-display font-medium text-heading-sm text-pure-white">
              Featured Models
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrent((c) => (c - 1 + featured.length) % featured.length)}
              className="p-2 rounded-full border border-pure-white/20 text-pure-white hover:bg-pure-white/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % featured.length)}
              className="p-2 rounded-full border border-pure-white/20 text-pure-white hover:bg-pure-white/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-radius-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {featured.map((m, i) => (
              <div key={m.id} className="min-w-full px-1">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge variant="dark" className="mb-4">
                      {m.author}
                    </Badge>
                    <h3 className="font-charlie-display font-medium text-heading-lg leading-heading-lg text-pure-white mb-4">
                      {m.name}
                    </h3>
                    <p className="text-body text-ash-gray leading-body mb-6 line-clamp-3">
                      {m.description}
                    </p>
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div>
                        <p className="text-caption text-muted-indigo">Input Price</p>
                        <p className="text-body font-medium text-pure-white">{formatCurrency(m.pricing.input)}/{m.pricing.unit === "per_token" ? "token" : "req"}</p>
                      </div>
                      <div>
                        <p className="text-caption text-muted-indigo">Latency</p>
                        <p className="text-body font-medium text-pure-white">{formatLatency(m.avgLatencyMs)}</p>
                      </div>
                      <div>
                        <p className="text-caption text-muted-indigo">Context</p>
                        <p className="text-body font-medium text-pure-white">{(m.contextWindow / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="yellow" radius="full">
                        Try Now
                      </Button>
                      <Button variant="outline" radius="full" className="border-pure-white/20 text-pure-white hover:bg-pure-white/10">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block bg-surface-dark-panel rounded-radius-2xl border border-pure-white/10 p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-caption text-muted-indigo mb-1">Demand Score</p>
                        <Progress value={m.demand} className="h-2" indicatorClassName="bg-taxicab-yellow" />
                        <p className="text-caption text-right text-ash-gray mt-1">{m.demand}/100</p>
                      </div>
                      {m.benchmarks.slice(0, 3).map((b) => (
                        <div key={b.name}>
                          <div className="flex justify-between text-caption mb-1">
                            <span className="text-ash-gray">{b.name}</span>
                            <span className="text-pure-white font-medium">{b.score}%</span>
                          </div>
                          <Progress value={b.score} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === current ? "w-8 bg-atlassian-blue" : "w-1.5 bg-pure-white/30"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

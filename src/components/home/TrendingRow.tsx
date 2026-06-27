"use client"

import { TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModelCard } from "@/components/model/ModelCard"
import { models } from "@/lib/mock-data"

const trending = models.sort((a, b) => b.demand - a.demand).slice(0, 8)

export function TrendingRow() {
  return (
    <section className="bg-pure-white">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-atlassian-blue" />
            <h2 className="font-charlie-display font-medium text-heading text-midnight-navy">
              Trending Now
            </h2>
          </div>
          <Button variant="ghost" size="sm" className="text-caption">
            View All
            <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-none">
          {trending.map((model) => (
            <div key={model.id} className="min-w-[280px] sm:min-w-[300px] snap-start">
              <ModelCard model={model} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

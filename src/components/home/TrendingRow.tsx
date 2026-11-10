"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { ModelCard } from "@/components/model/ModelCard"
import { models } from "@/lib/mock-data"

const trending = [...models].sort((a, b) => b.demand - a.demand).slice(0, 8)

export function TrendingRow() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Explore candidates</p><h2 className="flex items-center gap-2 font-charlie-display text-3xl font-semibold text-slate-950"><TrendingUp className="h-5 w-5 text-blue-700" />Trending sample models</h2></div><Link href="/models?sort=trending" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900">View directory <ArrowRight className="h-3.5 w-3.5" /></Link></div>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-none">{trending.map((model, index) => <div key={model.id} className="min-w-[280px] snap-start sm:min-w-[300px]"><ModelCard model={model} featured index={index} /></div>)}</div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Layers3, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, formatLatency } from "@/lib/utils"
import { models } from "@/lib/mock-data"
import { readCatalogIds, useCatalogIds, writeCatalogIds } from "@/lib/catalog-storage"

const spotlightModels = [...models].sort((a, b) => b.demand - a.demand).slice(0, 4)

export function FeaturedCarousel() {
  const [current, setCurrent] = useState(0)
  const [notice, setNotice] = useState("")
  const reduceMotion = useReducedMotion()
  const comparedIds = useCatalogIds("compareModels")
  if (!spotlightModels.length) return null

  const model = spotlightModels[current]
  const compared = comparedIds.includes(model.id)
  const moveTo = (next: number) => {
    setCurrent((next + spotlightModels.length) % spotlightModels.length)
    setNotice("")
  }
  const addToCompare = () => {
    const ids = readCatalogIds("compareModels")
    if (!ids.includes(model.id) && ids.length >= 3) {
      setNotice("Your comparison already has three models.")
      return
    }
    writeCatalogIds("compareModels", ids.includes(model.id) ? ids : [...ids, model.id])
    setNotice("Added to your comparison workspace.")
  }

  return (
    <section className="model-spotlight-section relative overflow-hidden bg-slate-950">
      <div className="model-spotlight-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-page-max px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300"><Sparkles className="h-3.5 w-3.5" /> Airbase spotlight · sample data</p><h2 className="font-charlie-display text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">A closer look at a model.</h2><p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">Explore one sample candidate at a time. You control the pace.</p></div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => moveTo(current - 1)} aria-label="Show previous sample model" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white transition hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => moveTo(current + 1)} aria-label="Show next sample model" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white transition hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="model-spotlight-panel rounded-[28px] border border-white/10 p-5 shadow-2xl shadow-black/20 sm:p-7 lg:p-9">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={model.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.24, ease: "easeOut" }} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div className="flex flex-col items-start">
                <Badge variant="dark" className="mb-4 border border-white/10 bg-white/10 text-slate-200">{model.author}</Badge>
                <h3 className="font-charlie-display text-3xl font-bold tracking-[-0.055em] text-white sm:text-4xl">{model.name}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{model.description}</p>
                <div className="mt-6 grid w-full max-w-xl grid-cols-3 gap-2">
                  {[{ label: "Input · sample", value: formatCurrency(model.pricing.input) }, { label: "Latency · sample", value: formatLatency(model.avgLatencyMs) }, { label: "Context · sample", value: model.contextWindow ? `${(model.contextWindow / 1000).toFixed(0)}K` : "—" }].map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3"><p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{item.label}</p><p className="mt-2 truncate text-sm font-semibold text-white">{item.value}</p></div>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild radius="full" className="bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(116,240,210,0.13)] transition hover:bg-cyan-200"><Link href={`/models/${model.slug}`}>Explore model <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
                  <Button onClick={addToCompare} variant="outline" radius="full" className="border-white/20 bg-white/[0.03] text-white hover:border-white/35 hover:bg-white/10"><Layers3 className="mr-2 h-4 w-4" />{compared ? "In comparison" : "Add to compare"}</Button>
                </div>
                {notice && <p role="status" className="mt-3 text-xs text-cyan-200">{notice}</p>}
              </div>

              <div className="model-spotlight-benchmarks rounded-2xl border border-white/10 bg-black/15 p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Reference panel</p><h4 className="mt-1 text-sm font-semibold text-white">Sample benchmark records</h4></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">Unverified</span></div>
                <div className="space-y-2">{model.benchmarks.slice(0, 3).map((benchmark) => <div key={benchmark.name} className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-3"><span className="text-xs font-medium text-slate-300">{benchmark.name}</span><span className="font-mono text-xs font-semibold text-white">{benchmark.score}<span className="ml-2 font-sans font-normal text-slate-500">raw score</span></span></div>)}</div>
                <p className="mt-4 text-[10px] leading-4 text-slate-500">Illustrative values. Scores are not normalized for dataset, model version, metric direction, or evaluation method.</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500">Use the arrows to browse the sample spotlight.</p>
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose a sample spotlight model">{spotlightModels.map((item, index) => <button key={item.id} type="button" onClick={() => moveTo(index)} aria-label={`Show ${item.name}`} aria-current={index === current ? "true" : undefined} className={cn("h-1.5 rounded-full transition-all", index === current ? "w-7 bg-cyan-300" : "w-1.5 bg-white/25 hover:bg-white/50")} />)}</div>
        </div>
      </div>
    </section>
  )
}

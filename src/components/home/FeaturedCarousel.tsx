"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Layers3, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, formatLatency } from "@/lib/utils"
import { models } from "@/lib/mock-data"
import { readCatalogIds, useCatalogIds, writeCatalogIds } from "@/lib/catalog-storage"

const featuredModels = models.filter((model) => model.demand >= 90)

export function FeaturedCarousel() {
  const featured = featuredModels
  const [current, setCurrent] = useState(0)
  const [notice, setNotice] = useState("")
  const comparedIds = useCatalogIds("compareModels")

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % featured.length), 7000)
    return () => window.clearInterval(timer)
  }, [featured.length])

  if (!featured.length) return null
  const model = featured[current]
  const compared = comparedIds.includes(model.id)
  const addToCompare = () => {
    const ids = readCatalogIds("compareModels")
    if (!ids.includes(model.id) && ids.length >= 3) { setNotice("Compare up to three models."); return }
    writeCatalogIds("compareModels", ids.includes(model.id) ? ids : [...ids, model.id])
    setNotice("Added to your comparison workspace.")
  }

  return <section className="bg-slate-950"><div className="mx-auto max-w-page-max px-6 py-12 md:py-16"><div className="mb-8 flex items-center justify-between"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">Suggested candidates · sample data</p><h2 className="font-charlie-display text-2xl font-semibold text-white">Models worth comparing</h2></div><div className="flex gap-2"><button onClick={() => { setCurrent((value) => (value - 1 + featured.length) % featured.length); setNotice("") }} className="rounded-full border border-white/15 p-2 text-white hover:bg-white/10" aria-label="Previous model"><ChevronLeft className="h-4 w-4" /></button><button onClick={() => { setCurrent((value) => (value + 1) % featured.length); setNotice("") }} className="rounded-full border border-white/15 p-2 text-white hover:bg-white/10" aria-label="Next model"><ChevronRight className="h-4 w-4" /></button></div></div><div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10"><div key={model.id} className="animate-fade-in"><Badge variant="dark" className="mb-4">{model.author}</Badge><h3 className="font-charlie-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{model.name}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">{model.description}</p><div className="mt-6 flex flex-wrap gap-6">{[{ label: "Sample input", value: formatCurrency(model.pricing.input) }, { label: "Sample latency", value: formatLatency(model.avgLatencyMs) }, { label: "Context window", value: model.contextWindow ? `${(model.contextWindow / 1000).toFixed(0)}K` : "N/A" }].map((item) => <div key={item.label}><p className="text-[10px] uppercase tracking-wide text-slate-500">{item.label}</p><p className="mt-1 text-sm font-semibold text-white">{item.value}</p></div>)}</div><div className="mt-7 flex flex-wrap gap-3"><Button asChild radius="full" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200"><Link href={`/models/${model.slug}`}>View model details</Link></Button><Button onClick={addToCompare} variant="outline" radius="full" className="border-white/20 text-white hover:bg-white/10"><Layers3 className="mr-2 h-4 w-4" />{compared ? "In comparison" : "Add to compare"}</Button></div>{notice && <p role="status" className="mt-3 text-xs text-cyan-200">{notice}</p>}</div><div className="rounded-2xl border border-white/10 bg-black/10 p-5"><div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white"><Sparkles className="h-4 w-4 text-cyan-300" />Sample benchmark profile</div><div className="space-y-3">{model.benchmarks.slice(0, 3).map((benchmark) => <div key={benchmark.name} className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5"><span className="text-xs text-slate-400">{benchmark.name}</span><span className="text-xs font-semibold text-white">{benchmark.score} <span className="font-normal text-slate-500">raw score</span></span></div>)}</div><p className="mt-5 text-[10px] leading-4 text-slate-500">Illustrative sample values; metric direction and evaluation methodology have not been normalized.</p></div></div><div className="mt-6 flex justify-center gap-2">{featured.map((item, index) => <button key={item.id} onClick={() => { setCurrent(index); setNotice("") }} className={cn("h-1.5 rounded-full transition-all", index === current ? "w-8 bg-cyan-300" : "w-1.5 bg-white/25")} aria-label={`Show ${item.name}`} />)}</div></div></section>
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Heart, Layers3, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, formatLatency, formatNumber } from "@/lib/utils"
import { readCatalogIds, toggleCatalogId, useCatalogIds } from "@/lib/catalog-storage"
import type { AIModel } from "@/lib/types"

interface ModelCardProps { model: AIModel; featured?: boolean; index?: number }

export function ModelCard({ model, featured, index = 0 }: ModelCardProps) {
  const [compareLimit, setCompareLimit] = useState(false)
  const saved = useCatalogIds("savedModels").includes(model.id)
  const compared = useCatalogIds("compareModels").includes(model.id)

  const toggleCompare = () => {
    setCompareLimit(false)
    const current = readCatalogIds("compareModels")
    if (!current.includes(model.id) && current.length >= 3) { setCompareLimit(true); return }
    toggleCatalogId("compareModels", model.id)
  }

  const unit = model.pricing.unit === "per_request" ? " / request" : model.pricing.unit === "per_second" ? " / second" : " / token unit"

  return (
    <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.2) }} className={cn("group flex h-full flex-col rounded-[20px] border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover", featured ? "border-blue-200" : "border-slate-200")}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <Link href={`/models/${model.slug}`} className="flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-bold tracking-tight text-white" aria-hidden="true">{model.author.slice(0, 2).toUpperCase()}</span><span className="min-w-0"><span className="block text-xs font-medium text-slate-500">{model.author}</span><span className="block truncate font-charlie-display text-base font-semibold text-slate-950 group-hover:text-blue-700">{model.name}</span></span></Link>
        <button type="button" onClick={() => toggleCatalogId("savedModels", model.id)} aria-label={saved ? `Remove ${model.name} from saved models` : `Save ${model.name}`} aria-pressed={saved} className={cn("rounded-xl p-2 transition", saved ? "bg-rose-50 text-rose-600" : "text-slate-400 hover:bg-slate-100 hover:text-rose-500")}><Heart className={cn("h-4 w-4", saved && "fill-current")} /></button>
      </div>
      <div className="mb-3 flex items-center gap-1.5 text-xs" title="Illustrative sample rating, not a verified live review score"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><span className="font-semibold text-slate-800">{model.stats.avgRating.toFixed(1)}</span><span className="text-slate-400">sample rating · {formatNumber(model.stats.reviewCount)} sample reviews</span></div>
      <p className="mb-4 line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-600">{model.description}</p>
      <div className="mb-4 flex min-h-7 flex-wrap gap-1.5">{model.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="default" className="text-[10px]">{tag}</Badge>)}</div>
      <div className="mb-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3"><div><p className="text-[10px] uppercase tracking-wide text-slate-400">Input · sample</p><p className="mt-1 text-xs font-semibold text-slate-800">{formatCurrency(model.pricing.input)}{unit}</p></div><div><p className="text-[10px] uppercase tracking-wide text-slate-400">Latency · sample</p><p className="mt-1 text-xs font-semibold text-slate-800">{formatLatency(model.avgLatencyMs)}</p></div></div>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3"><Link href={`/models/${model.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900">Model details <ArrowUpRight className="h-3.5 w-3.5" /></Link><button type="button" onClick={toggleCompare} aria-pressed={compared} className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition", compared ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")}><Layers3 className="h-3.5 w-3.5" />{compared ? "Added" : "Compare"}</button></div>
      {compareLimit && <p className="mt-2 text-right text-[10px] text-amber-700">Compare up to 3 models.</p>}
    </motion.article>
  )
}

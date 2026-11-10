"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Heart, Layers3, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, formatLatency, formatNumber } from "@/lib/utils"
import { readCatalogIds, toggleCatalogId, useCatalogIds } from "@/lib/catalog-storage"
import type { AIModel } from "@/lib/types"

interface ModelCardProps {
  model: AIModel
  featured?: boolean
  index?: number
  layout?: "grid" | "list"
}

const providerTone: Record<string, string> = {
  openai: "from-emerald-500 to-teal-700",
  anthropic: "from-orange-400 to-rose-700",
  google: "from-blue-500 to-violet-600",
  mistral: "from-orange-400 to-amber-700",
  meta: "from-blue-500 to-cyan-700",
  stability: "from-violet-500 to-indigo-700",
}

export function ModelCard({ model, featured = false, index = 0, layout = "grid" }: ModelCardProps) {
  const [compareLimit, setCompareLimit] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const saved = useCatalogIds("savedModels").includes(model.id)
  const compared = useCatalogIds("compareModels").includes(model.id)
  const providerClass = providerTone[model.providerId] ?? "from-slate-500 to-slate-800"
  const priceUnit = model.pricing.unit === "per_request" ? "/ request" : model.pricing.unit === "per_second" ? "/ second" : "/ token unit"

  const moveSpotlight = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`)
    event.currentTarget.style.setProperty("--spot-opacity", "1")
  }

  const clearSpotlight = () => cardRef.current?.style.setProperty("--spot-opacity", "0")
  const toggleCompare = () => {
    setCompareLimit(false)
    const current = readCatalogIds("compareModels")
    if (!current.includes(model.id) && current.length >= 3) {
      setCompareLimit(true)
      return
    }
    toggleCatalogId("compareModels", model.id)
  }

  return (
    <motion.article
      ref={cardRef}
      data-layout={layout}
      onPointerMove={moveSpotlight}
      onPointerLeave={clearSpotlight}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.28, delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.15), ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "airbase-model-card group relative isolate overflow-hidden rounded-[24px] border bg-white transition-[border-color,box-shadow] duration-300",
        layout === "grid" ? "p-5" : "p-4 sm:p-5",
        featured ? "border-blue-200" : "border-slate-200/90"
      )}
    >
      <div className={cn("relative z-[1] flex h-full gap-5", layout === "list" ? "flex-col md:flex-row md:items-center" : "flex-col")}>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <Link href={`/models/${model.slug}`} className="flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-[17px] bg-gradient-to-br text-sm font-bold tracking-tight text-white shadow-sm", providerClass)} aria-hidden="true">
                {model.author.slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">{model.author}</span>
                <span className="mt-0.5 block truncate font-charlie-display text-[17px] font-bold tracking-[-0.025em] text-slate-950 transition-colors group-hover:text-blue-700">{model.name}</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => toggleCatalogId("savedModels", model.id)}
              aria-label={saved ? `Remove ${model.name} from saved models` : `Save ${model.name}`}
              aria-pressed={saved}
              className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", saved ? "bg-rose-50 text-rose-600" : "text-slate-400 hover:bg-rose-50 hover:text-rose-500")}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-current")} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="default" className="border-0 bg-slate-100 text-slate-600">{model.category.replaceAll("-", " ")}</Badge>
            {model.tags.slice(0, 2).map((tag) => <Badge key={tag} variant="default" className="border-0 bg-blue-50/80 text-blue-700">{tag}</Badge>)}
          </div>
          <p className={cn("mt-3 text-[13px] leading-5 text-slate-600", layout === "grid" ? "line-clamp-2 min-h-10" : "line-clamp-2 md:max-w-3xl")}>{model.description}</p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500" title="Illustrative sample rating, not a verified live review score">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">{model.stats.avgRating.toFixed(1)}</span>
            <span>sample rating</span>
            <span aria-hidden="true" className="mx-0.5 h-1 w-1 rounded-full bg-slate-300" />
            <span>{formatNumber(model.stats.reviewCount)} sample reviews</span>
          </div>
        </div>

        <div className={cn("grid shrink-0 grid-cols-3 gap-2 rounded-2xl bg-slate-50/90 p-3", layout === "list" ? "w-full md:w-[330px]" : "w-full")}>
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Input · sample</p>
            <p className="mt-1 truncate text-xs font-bold text-slate-800">{formatCurrency(model.pricing.input)}</p>
            <p className="mt-0.5 truncate text-[10px] text-slate-500">{priceUnit}</p>
          </div>
          <div className="min-w-0 border-l border-slate-200 pl-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Latency</p>
            <p className="mt-1 truncate text-xs font-bold text-slate-800">{formatLatency(model.avgLatencyMs)}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">sample</p>
          </div>
          <div className="min-w-0 border-l border-slate-200 pl-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Context</p>
            <p className="mt-1 truncate text-xs font-bold text-slate-800">{model.contextWindow ? `${formatNumber(model.contextWindow)} tokens` : "—"}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">sample</p>
          </div>
        </div>

        <div className={cn("relative z-[1] flex items-center justify-between gap-3 border-t border-slate-100 pt-3", layout === "list" && "md:w-[190px] md:shrink-0 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-5 md:pt-0")}>
          <Link href={`/models/${model.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Model details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={toggleCompare}
            aria-pressed={compared}
            className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", compared ? "bg-blue-100 text-blue-800" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-blue-50 hover:text-blue-800")}
          >
            <Layers3 className="h-3.5 w-3.5" />{compared ? "Added" : "Compare"}
          </button>
        </div>
      </div>
      {compareLimit && <p role="status" className="relative z-[1] mt-2 text-right text-[10px] font-medium text-amber-700">Compare up to three models.</p>}
    </motion.article>
  )
}

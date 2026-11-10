"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowDownUp, Search, SlidersHorizontal } from "lucide-react"
import { ModelGrid } from "@/components/model/ModelGrid"
import { categories, models } from "@/lib/mock-data"

type SortMode = "trending" | "price" | "speed" | "context" | "rating"
type ModelCatalogProps = { initialSearch: string; initialCategory: string; initialSort: SortMode }
const selectClass = "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"

export function ModelCatalog({ initialSearch, initialCategory, initialSort }: ModelCatalogProps) {
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)
  const [provider, setProvider] = useState("all")
  const [sort, setSort] = useState<SortMode>(initialSort)
  const providers = useMemo(() => [...new Set(models.map((model) => model.author))].sort(), [])
  const filteredModels = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = models.filter((model) => {
      const matchesQuery = !query || [model.name, model.author, model.description, ...model.tags].some((value) => value.toLowerCase().includes(query))
      return matchesQuery && (category === "all" || model.category === category) && (provider === "all" || model.author === provider)
    })
    if (sort === "price") result.sort((a, b) => a.pricing.input - b.pricing.input)
    else if (sort === "speed") result.sort((a, b) => a.avgLatencyMs - b.avgLatencyMs)
    else if (sort === "context") result.sort((a, b) => b.contextWindow - a.contextWindow)
    else if (sort === "rating") result.sort((a, b) => b.stats.avgRating - a.stats.avgRating)
    else result.sort((a, b) => b.demand - a.demand)
    return result
  }, [search, category, provider, sort])

  const resetFilters = () => { setSearch(""); setCategory("all"); setProvider("all"); setSort("trending") }

  return <div className="mx-auto max-w-page-max px-5 py-10 sm:px-6 sm:py-14"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Model directory</p><h1 className="font-charlie-display text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Find the right model.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Search by provider, task, or capability, then compare the trade-offs that matter to your project.</p></div><Link href="/compare" className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 sm:self-auto"><SlidersHorizontal className="h-4 w-4" /> Comparison workspace</Link></div><div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-xs leading-5 text-amber-900"><strong>Preview catalog:</strong> {models.length} sample records. Pricing, ratings, latency, uptime, and benchmark values are illustrative. Price units vary, so the input-price sort is not a normalized cross-model cost comparison.</div><section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/[0.02]" aria-label="Model filters"><div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_auto_auto_auto]"><label className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50"><Search className="h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, provider, or capability" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /></label><select aria-label="Filter by category" className={selectClass} value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><select aria-label="Filter by provider" className={selectClass} value={provider} onChange={(event) => setProvider(event.target.value)}><option value="all">All providers</option>{providers.map((item) => <option key={item} value={item}>{item}</option>)}</select><label className="flex items-center gap-2"><ArrowDownUp className="h-4 w-4 text-slate-400" /><select aria-label="Sort models" className={selectClass} value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="trending">Trending sample</option><option value="price">Lowest sample input value (units vary)</option><option value="speed">Fastest sample latency</option><option value="context">Largest context</option><option value="rating">Highest sample rating</option></select></label></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3"><p className="text-xs text-slate-500"><strong className="text-slate-800">{filteredModels.length}</strong> sample models match</p><button onClick={resetFilters} className="text-xs font-semibold text-blue-700 hover:text-blue-900">Reset filters</button></div></section>{filteredModels.length ? <ModelGrid models={filteredModels} columns={4} /> : <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center"><p className="font-charlie-display text-xl font-semibold text-slate-900">No models match those filters.</p><p className="mt-2 text-sm text-slate-500">Try a broader search or clear one of the filters.</p><button onClick={resetFilters} className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Clear filters</button></div>}</div>
}

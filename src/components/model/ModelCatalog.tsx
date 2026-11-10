"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowDownUp, LayoutGrid, List, Search, SlidersHorizontal, Sparkles, X } from "lucide-react"
import { ModelGrid } from "@/components/model/ModelGrid"
import { categories, models } from "@/lib/mock-data"

 type SortMode = "trending" | "price" | "speed" | "context" | "rating"
type ViewMode = "grid" | "list"
type ModelCatalogProps = { initialSearch: string; initialCategory: string; initialSort: SortMode }
const selectClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"

export function ModelCatalog({ initialSearch, initialCategory, initialSort }: ModelCatalogProps) {
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)
  const [provider, setProvider] = useState("all")
  const [sort, setSort] = useState<SortMode>(initialSort)
  const [view, setView] = useState<ViewMode>("grid")
  const providers = useMemo(() => [...new Set(models.map((model) => model.author))].sort(), [])
  const populatedCategories = useMemo(() => categories.filter((item) => models.some((model) => model.category === item.slug)), [])

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
  const hasFilters = Boolean(search || category !== "all" || provider !== "all" || sort !== "trending")

  return (
    <div className="catalog-page mx-auto max-w-page-max px-5 py-9 sm:px-6 sm:py-12">
      <div className="mb-7 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
        <Link href="/" className="transition-colors hover:text-slate-700">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-700">Model directory</span>
      </div>

      <section className="catalog-heading mb-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_50px_rgba(18,36,68,0.06)] sm:p-9">
        <div className="relative z-[1] flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700"><Sparkles className="h-3.5 w-3.5" /> Explore the catalog</p>
            <h1 className="font-charlie-display text-4xl font-bold tracking-[-0.055em] text-slate-950 sm:text-5xl">Choose by what matters.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">Compare model capabilities, trade-offs, and sample performance before you build. Keep a shortlist as you explore.</p>
          </div>
          <Link href="/compare" className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 lg:self-auto"><SlidersHorizontal className="h-4 w-4" /> Open comparison <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px]">3 max</span></Link>
        </div>
      </section>

      <div className="mb-7 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs leading-5 text-amber-950 sm:items-center">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-800" aria-hidden="true"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /></span>
        <p><strong>Preview catalog:</strong> {models.length} illustrative sample records. Prices, ratings, latency, uptime, run counts, and benchmarks are not live or independently verified. Price units vary, so price sorting is not a normalized cost comparison.</p>
      </div>

      <section className="catalog-controls rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(18,36,68,0.04)] sm:p-5" aria-label="Model directory filters">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Browse by capability</p><p className="mt-1 text-xs text-slate-500">Start broad, then narrow the field.</p></div>
          {hasFilters && <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><X className="h-3.5 w-3.5" /> Reset</button>}
        </div>

        <div className="-mx-1 mb-5 flex snap-x gap-2 overflow-x-auto px-1 pb-1 scrollbar-none" role="group" aria-label="Filter by model capability">
          <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${category === "all" ? "bg-slate-950 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All models <span className="ml-1 opacity-60">{models.length}</span></button>
          {populatedCategories.map((item) => {
            const count = models.filter((model) => model.category === item.slug).length
            return <button type="button" key={item.slug} aria-pressed={category === item.slug} onClick={() => setCategory(item.slug)} className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs font-semibold transition-all ${category === item.slug ? "bg-slate-950 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item.name}<span className="ml-1.5 opacity-60">{count}</span></button>
          })}
        </div>

        <div className="grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-[minmax(240px,1fr)_180px_205px]">
          <label className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search models, providers, or capabilities" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" aria-label="Search models, providers, or capabilities" />
            <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:inline">⌕</kbd>
          </label>
          <label className="sr-only" htmlFor="model-provider">Filter by provider</label>
          <select id="model-provider" className={selectClass} value={provider} onChange={(event) => setProvider(event.target.value)}><option value="all">All providers</option>{providers.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          <label className="relative flex items-center">
            <ArrowDownUp className="pointer-events-none absolute left-3.5 z-[1] h-4 w-4 text-slate-400" />
            <span className="sr-only">Sort models</span>
            <select aria-label="Sort models" className={`${selectClass} pl-10`} value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="trending">Sample sort</option><option value="price">Input value · mixed units</option><option value="speed">Latency · sample</option><option value="context">Context · sample</option><option value="rating">Rating · sample</option></select>
          </label>
        </div>
      </section>

      <div className="mb-4 mt-7 flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-sm font-bold text-slate-900" aria-live="polite">{filteredModels.length} <span className="font-medium text-slate-500">sample {filteredModels.length === 1 ? "model" : "models"}</span></p><p className="mt-1 text-[11px] text-slate-400">Values are examples only; compare verified sources before making a decision.</p></div>
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1" role="group" aria-label="Results layout">
          <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`grid h-8 w-9 place-items-center rounded-lg transition ${view === "grid" ? "bg-slate-950 text-white" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}><LayoutGrid className="h-4 w-4" /></button>
          <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={`grid h-8 w-9 place-items-center rounded-lg transition ${view === "list" ? "bg-slate-950 text-white" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {filteredModels.length ? <ModelGrid models={filteredModels} columns={4} layout={view} /> : (
        <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"><Search className="h-5 w-5" /></span>
          <h2 className="mt-4 font-charlie-display text-xl font-bold text-slate-950">No models match those filters.</h2>
          <p className="mt-2 text-sm text-slate-500">Try a broader search or clear one of the filters.</p>
          <button type="button" onClick={resetFilters} className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Clear filters</button>
        </div>
      )}
    </div>
  )
}

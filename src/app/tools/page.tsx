"use client"

import { useMemo, useState } from "react"
import { Bookmark, Check, Search, WandSparkles } from "lucide-react"
import { toggleCatalogId, useCatalogIds } from "@/lib/catalog-storage"
import { tools } from "@/lib/tool-data"

export default function ToolsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All tools")
  const saved = useCatalogIds("savedTools")
  const categories = useMemo(() => ["All tools", ...new Set(tools.map((tool) => tool.category))], [])
  const filtered = tools.filter((tool) => {
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || [tool.name, tool.maker, tool.description, ...tool.tags].some((part) => part.toLowerCase().includes(q))
    return matchesSearch && (category === "All tools" || tool.category === category)
  })
  const toggleSave = (id: string) => toggleCatalogId("savedTools", id)

  return (
    <div className="mx-auto max-w-page-max px-5 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 max-w-3xl"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Tool directory</p><h1 className="font-charlie-display text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">The tools around the models.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Discover the AI apps people use to research, create, code, and automate. Save listings to your Airbase workspace.</p></div>
      <div className="mb-8 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm"><WandSparkles className="h-5 w-5" /></span><div><h2 className="text-sm font-bold text-slate-900">One Airbase account. No provider accounts for discovery.</h2><p className="mt-1 text-xs leading-5 text-slate-600">These are preview listings. Unified execution and tool connections are not enabled in this repository yet, so this directory does not claim that external services can be launched from Airbase.</p></div></div>
      <div className="mb-7 grid gap-3 md:grid-cols-[minmax(220px,1fr)_auto]"><label className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50"><Search className="h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tools, makers, or use cases" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /></label><div className="flex gap-2 overflow-x-auto pb-1" aria-label="Tool categories">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${category === item ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item}</button>)}</div></div>
      <p className="mb-4 text-xs text-slate-500">{filtered.length} sample tool listings · {saved.length} saved in this browser</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((tool) => { const isSaved = saved.includes(tool.id); return <article key={tool.id} className="flex min-h-[230px] flex-col rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-card-hover"><div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-bold tracking-tight" style={{ color: tool.color, backgroundColor: tool.background }}>{tool.mark}</span><button onClick={() => toggleSave(tool.id)} aria-pressed={isSaved} aria-label={isSaved ? `Remove ${tool.name} from workspace` : `Save ${tool.name} to workspace`} className={`rounded-xl p-2 transition ${isSaved ? "bg-blue-50 text-blue-700" : "text-slate-400 hover:bg-slate-100 hover:text-slate-800"}`}>{isSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}</button></div><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{tool.category} · {tool.maker}</p><h2 className="mt-1 font-charlie-display text-xl font-semibold text-slate-950">{tool.name}</h2><p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{tool.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{tool.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">{tag}</span>)}</div><p className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-400">Listing preview · Airbase connection planned</p></article>})}</div>
    </div>
  )
}

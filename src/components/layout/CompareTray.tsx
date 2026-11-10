"use client"

import Link from "next/link"
import { ArrowRight, Layers3, X } from "lucide-react"
import { useCatalogIds, writeCatalogIds } from "@/lib/catalog-storage"

export function CompareTray() {
  const ids = useCatalogIds("compareModels")
  if (ids.length === 0) return null

  return <aside className="fixed inset-x-0 bottom-4 z-[60] mx-auto flex w-[min(94vw,620px)] items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-2xl shadow-slate-950/20 backdrop-blur" aria-label="Model comparison selection"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-700"><Layers3 className="h-4 w-4" /></span><span><strong className="block text-sm text-slate-900">Compare models</strong><span className="block text-xs text-slate-500">{ids.length} of 3 selected</span></span></div><div className="flex items-center gap-2"><button type="button" onClick={() => writeCatalogIds("compareModels", [])} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800" aria-label="Clear comparison selection"><X className="h-4 w-4" /></button><Link href="/compare" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">Compare <ArrowRight className="h-3.5 w-3.5" /></Link></div></aside>
}

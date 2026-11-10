"use client"

import { useState } from "react"
import { Check, Heart, Layers3, Share2 } from "lucide-react"
import { readCatalogIds, toggleCatalogId, useCatalogIds } from "@/lib/catalog-storage"

export function ModelDetailActions({ modelId, modelName }: { modelId: string; modelName: string }) {
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState("")
  const saved = useCatalogIds("savedModels").includes(modelId)
  const compared = useCatalogIds("compareModels").includes(modelId)

  const compare = () => {
    const current = readCatalogIds("compareModels")
    if (!current.includes(modelId) && current.length >= 3) { setNotice("Compare up to three models at once."); return }
    toggleCatalogId("compareModels", modelId)
    setNotice("")
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setNotice(`Copy this page URL to share ${modelName}.`)
    }
  }

  return <div className="flex flex-col items-end gap-1"><div className="flex items-center gap-2"><button onClick={share} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Copy model link">{copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}</button><button onClick={() => toggleCatalogId("savedModels", modelId)} className={`rounded-xl p-2 transition ${saved ? "bg-rose-50 text-rose-600" : "text-slate-500 hover:bg-slate-100 hover:text-rose-500"}`} aria-label={saved ? "Unsave model" : "Save model"} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} /></button><button onClick={compare} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${compared ? "bg-blue-50 text-blue-700" : "bg-slate-950 text-white hover:bg-blue-700"}`} aria-pressed={compared}>{compared ? <Check className="h-3.5 w-3.5" /> : <Layers3 className="h-3.5 w-3.5" />}{compared ? "In compare" : "Compare"}</button></div>{notice && <p role="status" className="text-[10px] text-amber-700">{notice}</p>}</div>
}

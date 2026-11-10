"use client"

import Link from "next/link"
import { ArrowRight, Layers3, X } from "lucide-react"
import { categories, models } from "@/lib/mock-data"
import { toggleCatalogId, useCatalogIds } from "@/lib/catalog-storage"
import { formatCurrency, formatLatency } from "@/lib/utils"

export default function ComparePage() {
  const ids = useCatalogIds("compareModels")
  const selected = ids
    .map((id) => models.find((model) => model.id === id))
    .filter((model): model is (typeof models)[number] => Boolean(model))
  const benchmarkNames = [...new Set(selected.flatMap((model) => model.benchmarks.map((benchmark) => benchmark.name)))]

  if (selected.length === 0) {
    return (
      <div className="mx-auto max-w-page-max px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-300 px-6 py-14 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700"><Layers3 className="h-6 w-6" /></span>
          <h1 className="mt-5 font-charlie-display text-3xl font-semibold tracking-tight text-slate-950">Build a model shortlist.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Choose up to three models from the directory. Their sample pricing, speed, context, and benchmark records will appear side by side here.</p>
          <Link href="/models" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Browse models <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    )
  }

  const priceLabel = (value: number, unit: string) => `${formatCurrency(value)}${unit === "per_request" ? " / request" : unit === "per_second" ? " / second" : " / token unit"}`
  const rows: { label: string; values: (string | number)[] }[] = [
    { label: "Provider", values: selected.map((model) => model.author) },
    { label: "Category", values: selected.map((model) => categories.find((category) => category.slug === model.category)?.name ?? model.category) },
    { label: "Sample input price", values: selected.map((model) => priceLabel(model.pricing.input, model.pricing.unit)) },
    { label: "Sample output price", values: selected.map((model) => priceLabel(model.pricing.output, model.pricing.unit)) },
    { label: "Sample latency", values: selected.map((model) => formatLatency(model.avgLatencyMs)) },
    { label: "Context window", values: selected.map((model) => model.contextWindow ? `${model.contextWindow.toLocaleString()} tokens` : "Not applicable") },
    { label: "Max output", values: selected.map((model) => model.maxOutputTokens ? `${model.maxOutputTokens.toLocaleString()} tokens` : "Not applicable") },
    { label: "Sample rating", values: selected.map((model) => `${model.stats.avgRating.toFixed(1)} / 5`) },
  ]

  return (
    <div className="mx-auto max-w-page-max px-5 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Decision workspace</p><h1 className="font-charlie-display text-4xl font-semibold tracking-[-0.045em] text-slate-950">Compare models.</h1><p className="mt-3 text-sm text-slate-500">Keep up to three candidates in view while you weigh the trade-offs.</p></div>
        <Link href="/models" className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Add another model <ArrowRight className="h-4 w-4" /></Link>
      </div>

      <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"><strong>Sample data:</strong> figures below are illustrative prototype records, not live provider prices or independently verified benchmark results. Benchmark scores are shown only as raw sample values.</div>
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="w-48 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Metric</th>{selected.map((model) => <th key={model.id} className="min-w-[180px] px-5 py-4 align-top"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{model.author}</p><Link href={`/models/${model.slug}`} className="mt-1 block font-charlie-display text-base font-semibold text-slate-950 hover:text-blue-700">{model.name}</Link></div><button onClick={() => toggleCatalogId("compareModels", model.id)} aria-label={`Remove ${model.name} from comparison`} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-800"><X className="h-4 w-4" /></button></div></th>)}</tr></thead>
          <tbody>
            {rows.map((row) => <tr key={row.label} className="border-b border-slate-100 last:border-0"><th className="px-5 py-4 text-xs font-semibold text-slate-500">{row.label}</th>{selected.map((model, index) => <td key={model.id} className="px-5 py-4 text-sm font-medium text-slate-800">{row.values[index]}</td>)}</tr>)}
            {benchmarkNames.map((name) => <tr key={name} className="border-b border-slate-100 last:border-0"><th className="px-5 py-4 text-xs font-semibold text-slate-500">{name} sample score</th>{selected.map((model) => { const benchmark = model.benchmarks.find((item) => item.name === name); return <td key={model.id} className="px-5 py-4 text-sm font-medium text-slate-800">{benchmark ? `${benchmark.score} · raw sample` : "No record"}</td> })}</tr>)}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-400">For a meaningful benchmark comparison, records need common datasets, versions, score units, metric direction, and evaluation dates. This preview does not normalize those differences. Price units vary by record as well.</p>
    </div>
  )
}

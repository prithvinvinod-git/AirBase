"use client"

import { useState } from "react"
import { ModelGrid } from "@/components/model/ModelGrid"
import { models, categories } from "@/lib/mock-data"

export function BrowseByCategory() {
  const [activeTab, setActiveTab] = useState(categories[0].slug)
  const visibleCategories = categories.slice(0, 5)
  const filteredModels = models.filter((model) => model.category === activeTab).slice(0, 8)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="mb-10 text-center"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Browse the sample set</p><h2 className="font-charlie-display text-3xl font-semibold text-slate-950">Explore models by task</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">Switch categories to see the example records currently in Airbase.</p></div>
        <div className="mb-8 flex flex-wrap justify-center gap-2">{visibleCategories.map((category) => <button key={category.slug} onClick={() => setActiveTab(category.slug)} aria-pressed={activeTab === category.slug} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${activeTab === category.slug ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{category.name}</button>)}</div>
        {filteredModels.length ? <ModelGrid models={filteredModels} columns={4} /> : <p className="py-12 text-center text-sm text-slate-500">No sample records are listed in this category yet.</p>}
      </div>
    </section>
  )
}

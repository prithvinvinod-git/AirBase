import { SlidersHorizontal, Search } from "lucide-react"
import { ModelGrid } from "@/components/model/ModelGrid"
import { models, categories } from "@/lib/mock-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Models",
  description: "Browse and compare AI models from hundreds of providers.",
}

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-page-max px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-charlie-display font-medium text-heading-lg leading-heading-lg text-midnight-navy mb-2">
          All Models
        </h1>
        <p className="text-body text-muted-indigo leading-body">
          Browse {models.length}+ AI models from leading providers
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-fog-white rounded-radius-2xl">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-full bg-pure-white text-caption font-medium text-midnight-navy shadow-subtle">
            All
          </button>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.slug}
              className="px-4 py-2 rounded-full text-caption font-medium text-muted-indigo hover:bg-pure-white hover:shadow-subtle transition-all"
            >
              {cat.name}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-pure-white text-caption font-medium text-midnight-navy shadow-subtle">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>
      </div>

      {/* Model grid */}
      <ModelGrid models={models} columns={4} />
    </div>
  )
}

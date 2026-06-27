"use client"

import { useState } from "react"
import { ModelGrid } from "@/components/model/ModelGrid"
import { models, categories } from "@/lib/mock-data"

export function BrowseByCategory() {
  const [activeTab, setActiveTab] = useState(categories[0].slug)
  const visibleCategories = categories.slice(0, 5)

  const filteredModels = models
    .filter((m) => m.category === activeTab)
    .slice(0, 8)

  return (
    <section className="bg-pure-white">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-charlie-display font-medium text-heading text-midnight-navy mb-3">
            Explore Top Models
          </h2>
          <p className="text-body text-muted-indigo leading-body max-w-lg mx-auto">
            Hand-picked models from each category
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {visibleCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-caption font-medium transition-all duration-200 ${
                activeTab === cat.slug
                  ? "bg-atlassian-blue text-pure-white"
                  : "bg-fog-white text-muted-indigo hover:bg-fog-white/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredModels.length > 0 ? (
          <ModelGrid models={filteredModels} columns={4} />
        ) : (
          <p className="text-center text-body text-muted-indigo py-12">
            No models found in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}

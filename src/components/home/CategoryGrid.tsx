import Link from "next/link"
import {
  MessagesSquare, Image, Code, Headphones,
  Layers, Eye, Brain, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/mock-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessagesSquare, Image, Code, Headphones,
  Layers, Eye, Brain, Sparkles,
}

export function CategoryGrid() {
  return (
    <section className="bg-surface-lavender-band">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-charlie-display font-medium text-heading text-midnight-navy mb-3">
            Browse by Category
          </h2>
          <p className="text-body text-muted-indigo leading-body max-w-lg mx-auto">
            Explore models organized by capability and use case
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Sparkles
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-radius-cards",
                  "bg-pure-white border border-fog-white",
                  "hover:shadow-card-hover hover:scale-[1.02]",
                  "transition-all duration-200 text-center group"
                )}
              >
                <div className="w-12 h-12 rounded-radius-xl bg-surface-tinted-surface flex items-center justify-center group-hover:bg-atlassian-blue transition-colors duration-200">
                  {Icon && <Icon className="w-5 h-5 text-atlassian-blue group-hover:text-pure-white transition-colors duration-200" />}
                </div>
                <div>
                  <h3 className="font-medium text-body text-midnight-navy">
                    {category.name}
                  </h3>
                  <p className="text-caption text-muted-indigo mt-0.5">
                    {category.modelCount} models
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

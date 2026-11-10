import { ModelCard } from "./ModelCard"
import type { AIModel } from "@/lib/types"

interface ModelGridProps {
  models: AIModel[]
  columns?: 3 | 4
  layout?: "grid" | "list"
}

export function ModelGrid({ models, columns = 4, layout = "grid" }: ModelGridProps) {
  return (
    <div className={layout === "list" ? "flex flex-col gap-3" : columns === 4 ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5" : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5"}>
      {models.map((model, index) => <ModelCard key={model.id} model={model} index={index} layout={layout} />)}
    </div>
  )
}

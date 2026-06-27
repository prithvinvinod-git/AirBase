import { ModelCard } from "./ModelCard"
import type { AIModel } from "@/lib/types"

interface ModelGridProps {
  models: AIModel[]
  columns?: 3 | 4
}

export function ModelGrid({ models, columns = 4 }: ModelGridProps) {
  return (
    <div
      className={
        columns === 4
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      }
    >
      {models.map((model, i) => (
        <ModelCard key={model.id} model={model} index={i} />
      ))}
    </div>
  )
}

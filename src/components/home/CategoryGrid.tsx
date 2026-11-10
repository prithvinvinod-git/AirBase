import Link from "next/link"
import { Brain, Code, Eye, Headphones, Image, Layers, MessagesSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories, models } from "@/lib/mock-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { MessagesSquare, Image, Code, Headphones, Layers, Eye, Brain, Sparkles }

export function CategoryGrid() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="mb-10 text-center"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Explore the landscape</p><h2 className="font-charlie-display text-3xl font-semibold tracking-tight text-slate-950">Browse by capability</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">A small prototype catalog grouped by what models can do.</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Sparkles
            const count = models.filter((model) => model.category === category.slug).length
            return <Link key={category.id} href={`/category/${category.slug}`} className={cn("group flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-card-hover")}><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-slate-950 group-hover:text-white"><Icon className="h-5 w-5" /></span><span><span className="block text-sm font-semibold text-slate-900">{category.name}</span><span className="mt-1 block text-[11px] text-slate-400">{count} sample {count === 1 ? "model" : "models"}</span></span></Link>
          })}
        </div>
      </div>
    </section>
  )
}

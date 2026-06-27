import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModelGrid } from "@/components/model/ModelGrid"
import { models, categories } from "@/lib/mock-data"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: category.name,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const categoryModels = models.filter((m) => m.category === category.slug)

  return (
    <div className="mx-auto max-w-page-max px-6 py-12">
      <Link
        href="/models"
        className="inline-flex items-center gap-1.5 text-caption text-muted-indigo hover:text-atlassian-blue mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Models
      </Link>

      <div className="mb-10">
        <h1 className="font-charlie-display font-medium text-heading-lg leading-heading-lg text-midnight-navy mb-2">
          {category.name}
        </h1>
        <p className="text-body text-muted-indigo leading-body max-w-xl">
          {category.description}
        </p>
        <p className="text-caption text-muted-indigo mt-2">
          {categoryModels.length} models available
        </p>
      </div>

      {categoryModels.length > 0 ? (
        <ModelGrid models={categoryModels} columns={4} />
      ) : (
        <div className="text-center py-20">
          <p className="text-body text-muted-indigo mb-4">No models in this category yet.</p>
          <Button variant="outline" asChild>
            <Link href="/models">Browse all models</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

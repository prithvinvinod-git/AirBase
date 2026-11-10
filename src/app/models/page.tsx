import type { Metadata } from "next"
import { ModelCatalog } from "@/components/model/ModelCatalog"
import { categories } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Model directory", description: "Search and compare the Airbase sample catalog of AI models." }

type ModelsPageProps = { searchParams: Promise<{ search?: string | string[]; category?: string | string[]; sort?: string | string[] }> }
const allowedSorts = new Set(["trending", "price", "speed", "context", "rating"])
const firstValue = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] ?? "" : value ?? ""

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
  const query = await searchParams
  const categoryParam = firstValue(query.category)
  const sortParam = firstValue(query.sort)
  const initialCategory = categories.some((category) => category.slug === categoryParam) ? categoryParam : "all"
  const initialSort = allowedSorts.has(sortParam) ? sortParam as "trending" | "price" | "speed" | "context" | "rating" : "trending"
  return <ModelCatalog initialSearch={firstValue(query.search)} initialCategory={initialCategory} initialSort={initialSort} />
}

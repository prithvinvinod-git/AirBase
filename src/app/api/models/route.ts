import { NextResponse } from "next/server"
import { categories, models } from "@/lib/mock-data"

const allowedSorts = new Set(["trending", "newest", "rating", "price", "latency", "context"])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const sort = searchParams.get("sort") ?? "trending"
  const search = (searchParams.get("search") ?? "").trim().toLowerCase()
  const rawLimit = Number(searchParams.get("limit") ?? "24")
  const limit = Number.isFinite(rawLimit) ? Math.min(100, Math.max(1, Math.floor(rawLimit))) : 24
  const cursor = searchParams.get("cursor")

  if (category && !categories.some((item) => item.slug === category)) {
    return NextResponse.json({ error: "Unknown category" }, { status: 400 })
  }
  if (!allowedSorts.has(sort)) {
    return NextResponse.json({ error: "Unsupported sort option" }, { status: 400 })
  }

  let filtered = [...models]
  if (category) filtered = filtered.filter((model) => model.category === category)
  if (search) {
    filtered = filtered.filter((model) => [model.name, model.author, model.description, ...model.tags].some((value) => value.toLowerCase().includes(search)))
  }

  if (sort === "trending") filtered.sort((a, b) => b.demand - a.demand)
  else if (sort === "newest") filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  else if (sort === "rating") filtered.sort((a, b) => b.stats.avgRating - a.stats.avgRating)
  else if (sort === "price") filtered.sort((a, b) => a.pricing.input - b.pricing.input)
  else if (sort === "latency") filtered.sort((a, b) => a.avgLatencyMs - b.avgLatencyMs)
  else if (sort === "context") filtered.sort((a, b) => b.contextWindow - a.contextWindow)

  const cursorIndex = cursor ? filtered.findIndex((model) => model.id === cursor) : -1
  if (cursor && cursorIndex < 0) return NextResponse.json({ error: "Invalid cursor" }, { status: 400 })
  const startIndex = cursor ? cursorIndex + 1 : 0
  const page = filtered.slice(startIndex, startIndex + limit)
  const hasMore = startIndex + page.length < filtered.length

  return NextResponse.json({
    data: page,
    nextCursor: hasMore ? page[page.length - 1]?.id ?? null : null,
    total: filtered.length,
    source: "illustrative-sample-catalog",
  })
}

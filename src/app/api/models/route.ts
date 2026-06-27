import { NextResponse } from "next/server"
import { models } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const sort = searchParams.get("sort")
  const search = searchParams.get("search")
  const limit = parseInt(searchParams.get("limit") || "50")
  const cursor = searchParams.get("cursor")

  let filtered = [...models]

  if (category) {
    filtered = filtered.filter((m) => m.category === category)
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some((t) => t.includes(q))
    )
  }

  if (sort === "trending") {
    filtered.sort((a, b) => b.demand - a.demand)
  } else if (sort === "newest") {
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.stats.avgRating - a.stats.avgRating)
  }

  // Cursor-based pagination
  const startIndex = cursor ? filtered.findIndex((m) => m.id === cursor) + 1 : 0
  const page = filtered.slice(startIndex, startIndex + limit)
  const nextCursor = page.length === limit ? page[page.length - 1].id : null

  return NextResponse.json({
    data: page,
    nextCursor,
    total: filtered.length,
  })
}

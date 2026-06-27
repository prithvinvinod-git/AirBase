import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Share2, Heart, Star, Clock, Zap, BarChart3, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingChart } from "@/components/model/PricingChart"
import { BenchmarkComparison } from "@/components/model/BenchmarkComparison"
import { models } from "@/lib/mock-data"
import { formatCurrency, formatLatency, formatNumber } from "@/lib/utils"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const model = models.find((m) => m.slug === slug)
  if (!model) return { title: "Model Not Found" }
  return {
    title: model.name,
    description: model.description,
    openGraph: {
      title: `${model.name} by ${model.author}`,
      description: model.description,
    },
  }
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params
  const model = models.find((m) => m.slug === slug)
  if (!model) notFound()

  const statsCards = [
    { label: "Context Window", value: model.contextWindow >= 1000 ? `${(model.contextWindow / 1000).toFixed(0)}K` : `${model.contextWindow}`, icon: BarChart3 },
    { label: "Avg Latency", value: formatLatency(model.avgLatencyMs), icon: Clock },
    { label: "Max Output", value: `${(model.maxOutputTokens / 1000).toFixed(0)}K`, icon: Zap },
    { label: "Uptime", value: `${model.stats.uptimePercent}%`, icon: CheckCircle },
  ]

  return (
    <div className="mx-auto max-w-page-max px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/models"
          className="inline-flex items-center gap-1.5 text-caption text-muted-indigo hover:text-atlassian-blue transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Models
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-indigo hover:text-midnight-navy hover:bg-fog-white rounded-radius-md transition-colors" aria-label="Share">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-muted-indigo hover:text-red-500 hover:bg-red-50 rounded-radius-md transition-colors" aria-label="Save">
            <Heart className="w-4 h-4" />
          </button>
          <Button size="sm" radius="full">Try Now</Button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-48 md:h-64 rounded-radius-2xl bg-gradient-to-br from-atlassian-blue/10 via-surface-tinted-surface to-surface-lavender-band mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-pure-white/80 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <Badge variant="dark" className="mb-3">{model.author}</Badge>
          <h1 className="font-charlie-display font-medium text-display leading-display text-midnight-navy" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {model.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-taxicab-yellow text-taxicab-yellow" />
              <span className="text-body font-medium text-midnight-navy">{model.stats.avgRating}</span>
              <span className="text-caption text-muted-indigo">({formatNumber(model.stats.reviewCount)} reviews)</span>
            </div>
            <span className="text-ash-gray">|</span>
            <span className="text-caption text-muted-indigo">{formatNumber(model.stats.totalRuns)} runs</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-3">Description</h2>
                <p className="text-body text-midnight-navy leading-body">{model.description}</p>
              </div>
              <div>
                <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <Badge key={tag} variant="default">#{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-3">Pricing</h2>
                <div className="flex gap-6 text-body">
                  <div className="p-4 rounded-radius-xl bg-fog-white">
                    <p className="text-caption text-muted-indigo mb-1">Input</p>
                    <p className="font-medium text-midnight-navy">{formatCurrency(model.pricing.input)}/{model.pricing.unit}</p>
                  </div>
                  <div className="p-4 rounded-radius-xl bg-fog-white">
                    <p className="text-caption text-muted-indigo mb-1">Output</p>
                    <p className="font-medium text-midnight-navy">{formatCurrency(model.pricing.output)}/{model.pricing.unit}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="space-y-4">
              <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy">Key Stats</h2>
              {statsCards.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-3 p-4 rounded-radius-xl border border-fog-white">
                    <div className="w-10 h-10 rounded-radius-lg bg-surface-tinted-surface flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-atlassian-blue" />
                    </div>
                    <div>
                      <p className="text-caption text-muted-indigo">{stat.label}</p>
                      <p className="text-body font-semibold text-midnight-navy">{stat.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="max-w-3xl">
            <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-2">Price History</h2>
            <p className="text-body text-muted-indigo mb-6">30-day price trend for input and output tokens</p>
            <div className="p-6 rounded-radius-2xl border border-fog-white bg-pure-white">
              <PricingChart />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks">
          <div className="max-w-2xl">
            <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-2">Benchmark Scores</h2>
            <p className="text-body text-muted-indigo mb-6">Performance on standard AI benchmarks</p>
            <div className="p-6 rounded-radius-2xl border border-fog-white bg-pure-white">
              <BenchmarkComparison benchmarks={model.benchmarks} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="max-w-2xl">
            <h2 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-2">Community Reviews</h2>
            <p className="text-body text-muted-indigo mb-6">
              {formatNumber(model.stats.reviewCount)} reviews &middot; {model.stats.avgRating} average rating
            </p>
            <div className="p-6 rounded-radius-2xl border border-fog-white bg-fog-white text-center">
              <p className="text-body text-muted-indigo">Review system coming soon.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BarChart3, CheckCircle, Clock, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingChart } from "@/components/model/PricingChart"
import { BenchmarkComparison } from "@/components/model/BenchmarkComparison"
import { ModelDetailActions } from "@/components/model/ModelDetailActions"
import { models } from "@/lib/mock-data"
import { formatCurrency, formatLatency, formatNumber } from "@/lib/utils"
import type { Metadata } from "next"

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const model = models.find((item) => item.slug === slug)
  if (!model) return { title: "Model not found" }
  return { title: model.name, description: model.description, openGraph: { title: `${model.name} by ${model.author}`, description: model.description } }
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params
  const model = models.find((item) => item.slug === slug)
  if (!model) notFound()

  const unit = model.pricing.unit === "per_request" ? " / request" : model.pricing.unit === "per_second" ? " / second" : " / token unit"
  const stats = [
    { label: "Context window", value: model.contextWindow ? `${formatNumber(model.contextWindow)} tokens` : "Not applicable", icon: BarChart3 },
    { label: "Sample latency", value: formatLatency(model.avgLatencyMs), icon: Clock },
    { label: "Max output", value: model.maxOutputTokens ? `${formatNumber(model.maxOutputTokens)} tokens` : "Not applicable", icon: Zap },
    { label: "Sample uptime", value: `${model.stats.uptimePercent}%`, icon: CheckCircle },
  ]

  return (
    <div className="mx-auto max-w-page-max px-5 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/models" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-blue-700"><ArrowLeft className="h-3.5 w-3.5" /> Back to models</Link>
        <ModelDetailActions modelId={model.id} modelName={model.name} />
      </div>

      <div className="relative mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative"><Badge variant="dark" className="mb-4">{model.author}</Badge><h1 className="font-charlie-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{model.name}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{model.description}</p><div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300"><span>Illustrative rating {model.stats.avgRating} / 5</span><span className="text-white/30">·</span><span>{formatNumber(model.stats.reviewCount)} sample reviews</span><span className="text-white/30">·</span><span>{formatNumber(model.stats.totalRuns)} sample runs</span></div></div>
      </div>

      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"><strong>Prototype record:</strong> price, performance, uptime, ratings, and benchmark values are illustrative sample data, not live or independently verified provider claims.</div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="pricing">Pricing</TabsTrigger><TabsTrigger value="benchmarks">Benchmarks</TabsTrigger><TabsTrigger value="reviews">Reviews</TabsTrigger></TabsList>
        <TabsContent value="overview">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-7">
              <section><h2 className="mb-3 font-charlie-display text-xl font-semibold text-slate-950">Model overview</h2><p className="text-sm leading-7 text-slate-600">{model.description}</p></section>
              <section><h2 className="mb-3 font-charlie-display text-xl font-semibold text-slate-950">Capabilities</h2><div className="flex flex-wrap gap-2">{model.tags.map((tag) => <Badge key={tag} variant="default">{tag}</Badge>)}</div></section>
              <section><div className="mb-3 flex items-center justify-between"><h2 className="font-charlie-display text-xl font-semibold text-slate-950">Sample pricing</h2><span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700">verify before use</span></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Input rate · sample</p><p className="mt-1 text-lg font-semibold text-slate-950">{formatCurrency(model.pricing.input)}<span className="text-xs font-normal text-slate-500">{unit}</span></p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Output rate · sample</p><p className="mt-1 text-lg font-semibold text-slate-950">{formatCurrency(model.pricing.output)}<span className="text-xs font-normal text-slate-500">{unit}</span></p></div></div></section>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs leading-5 text-blue-900"><strong>Airbase access concept:</strong> the product is designed around one Airbase account, without individual provider sign-ups. The provider gateway is not configured in this code preview, so this page is for discovery and comparison only.</div>
            </div>
            <aside><h2 className="mb-3 font-charlie-display text-xl font-semibold text-slate-950">At a glance</h2><div className="space-y-3">{stats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-4 w-4" /></span><div><p className="text-[11px] text-slate-500">{stat.label}</p><p className="text-sm font-semibold text-slate-900">{stat.value}</p></div></div> })}</div></aside>
          </div>
        </TabsContent>
        <TabsContent value="pricing"><div className="max-w-3xl"><h2 className="font-charlie-display text-xl font-semibold text-slate-950">Illustrative price history</h2><p className="mb-5 mt-2 text-sm text-slate-500">This chart is placeholder data. It is not connected to provider price history.</p><div className="rounded-2xl border border-slate-200 bg-white p-5"><PricingChart /></div></div></TabsContent>
        <TabsContent value="benchmarks"><div className="max-w-3xl"><h2 className="font-charlie-display text-xl font-semibold text-slate-950">Benchmark records in this sample</h2><p className="mb-5 mt-2 text-sm leading-6 text-slate-500">Scores are displayed as entered in the prototype. Dataset versions, score units, metric direction, and evaluation methodology have not been normalized.</p><div className="rounded-2xl border border-slate-200 bg-white p-5"><BenchmarkComparison benchmarks={model.benchmarks} /></div></div></TabsContent>
        <TabsContent value="reviews"><div className="max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-6"><h2 className="font-charlie-display text-xl font-semibold text-slate-950">Community reviews</h2><p className="mt-2 text-sm leading-6 text-slate-500">Review submission and verified community ratings are not implemented yet. The displayed rating is sample data.</p></div></TabsContent>
      </Tabs>
    </div>
  )
}

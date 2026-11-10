import Link from "next/link"
import { ArrowRight, ArrowUpRight, Search, ShieldCheck, Sparkles } from "lucide-react"
import { LogoField } from "@/components/home/LogoField"
import { models } from "@/lib/mock-data"
import { tools } from "@/lib/tool-data"

export function HeroSection() {
  const providerCount = new Set(models.map((model) => model.author)).size

  return (
    <section className="airbase-hero relative overflow-hidden">
      <div className="hero-grain" aria-hidden="true" />
      <div className="mx-auto grid max-w-page-max items-center gap-10 px-6 py-16 md:min-h-[620px] md:grid-cols-[1fr_0.95fr] md:gap-8 md:py-20">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            The discovery layer for AI
          </div>
          <h1 className="mb-6 max-w-2xl font-charlie-display text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Find your next <span className="hero-gradient-text">AI advantage.</span>
          </h1>
          <p className="mb-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Compare models and tools by what matters: quality, speed, cost, and fit. One clear place to choose before you build.
          </p>
          <form action="/models" className="hero-search mb-5 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-2 shadow-2xl shadow-black/20">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              name="search"
              type="search"
              placeholder="Search models, providers, or capabilities"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              aria-label="Search AI models"
            />
            <button type="submit" className="hidden h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex">
              Explore <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400">
            <Link href="/models" className="group inline-flex items-center gap-1.5 text-white transition hover:text-cyan-200">
              Browse models <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tools" className="transition hover:text-white">Explore tools</Link>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-300" /> One Airbase account for your workspace</span>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Preview catalog: {models.length} sample models · {providerCount} providers · {tools.length} tool listings. Prices and benchmarks are illustrative, not live.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] md:ml-auto">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <LogoField />
        </div>
      </div>
      <div className="hero-bottom-line" aria-hidden="true" />
    </section>
  )
}

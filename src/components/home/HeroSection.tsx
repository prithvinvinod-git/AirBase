import Link from "next/link"
import { ArrowRight, ArrowUpRight, Search, ShieldCheck, Sparkles } from "lucide-react"
import { LogoField } from "@/components/home/LogoField"
import { categories, models } from "@/lib/mock-data"
import { tools } from "@/lib/tool-data"

export function HeroSection() {
  const providerCount = new Set(models.map((model) => model.author)).size
  const quickCategories = categories.filter((category) => models.some((model) => model.category === category.slug)).slice(0, 4)

  return (
    <section className="airbase-hero relative overflow-hidden">
      <div className="hero-grain" aria-hidden="true" />
      <div className="mx-auto grid max-w-page-max items-center gap-10 px-5 py-14 sm:px-6 sm:py-16 md:min-h-[660px] md:grid-cols-[1.04fr_0.96fr] md:gap-8 md:py-20">
        <div className="hero-copy relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            The discovery layer for AI
          </div>
          <h1 className="mb-5 max-w-2xl font-charlie-display text-[2.85rem] font-bold leading-[0.99] tracking-[-0.065em] text-white sm:text-6xl lg:text-[4.6rem]">
            Find the model <span className="hero-gradient-text">that fits.</span>
          </h1>
          <p className="mb-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Explore models and AI tools by task, then compare the trade-offs before you build. Clear choices start here.
          </p>

          <form action="/models" className="hero-search mb-4 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white px-3 py-2 shadow-2xl shadow-black/20 sm:px-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><Search className="h-4 w-4" /></span>
            <input name="search" type="search" placeholder="Try ‘coding’, ‘fast’, or a provider" className="h-10 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" aria-label="Search AI models, providers, or capabilities" />
            <button type="submit" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-3 text-xs font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:px-4 sm:text-sm">Explore <ArrowRight className="h-4 w-4" /></button>
          </form>

          <div className="mb-7 flex flex-wrap gap-2" aria-label="Quick browse by capability">
            {quickCategories.map((category) => <Link key={category.slug} href={`/models?category=${category.slug}`} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] font-medium text-slate-300 transition hover:border-cyan-200/40 hover:bg-white/10 hover:text-white">{category.name}<ArrowUpRight className="ml-1 inline h-3 w-3 opacity-60" /></Link>)}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs text-slate-400">
            <Link href="/models" className="group inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-cyan-200">Browse models <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            <Link href="/tools" className="font-medium transition hover:text-white">Explore tools</Link>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-300" /> One Airbase identity</span>
          </div>
          <p className="mt-4 text-[10px] leading-5 text-slate-500">Preview only: {models.length} sample models · {providerCount} providers · {tools.length} tool listings. Pricing and benchmarks are illustrative, not live.</p>
        </div>

        <div className="hero-art relative mx-auto w-full max-w-[520px] md:ml-auto">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <LogoField />
        </div>
      </div>
      <div className="hero-bottom-line" aria-hidden="true" />
    </section>
  )
}

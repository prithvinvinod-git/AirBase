import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, FileSearch, ShieldAlert } from "lucide-react"

export const metadata: Metadata = { title: "AI readiness scanner preview", description: "The website-scanning feature is not enabled in this Airbase preview." }

export default function ScannerPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700"><FileSearch className="h-6 w-6" /></span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Feature preview</p>
        <h1 className="mt-2 font-charlie-display text-4xl font-semibold tracking-[-0.045em] text-slate-950">AI readiness scanner</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">The original scanner flow displayed simulated progress and fixed sample results. It has been paused so Airbase does not present a mock score as a real website audit.</p>
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"><ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><p className="text-xs leading-5 text-amber-900"><strong>Not scanning URLs yet.</strong> A real version needs a secure crawl service, server-side URL/SSRF protections, and a transparent scoring methodology.</p></div>
        <Link href="/models" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Explore model discovery <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  )
}

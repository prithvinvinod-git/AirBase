import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/AuthForm"
import { Boxes, Check, CircleDot, LockKeyhole } from "lucide-react"

export const metadata: Metadata = { title: "Create an account", description: "Create one Airbase identity for the AI discovery workspace." }

const points = ["One Airbase account for your workspace", "No provider sign-up required to browse", "Saved models and comparisons stay in this browser preview"]

type SignupPageProps = { searchParams: Promise<{ mode?: string | string[] }> }

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const query = await searchParams
  const initialMode = query.mode === "sign-in" ? "sign-in" : "create"

  return <div className="mx-auto grid max-w-page-max gap-10 px-5 py-10 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1fr] lg:items-center"><section className="max-w-xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800"><Boxes className="h-4 w-4" /> airbase account</div><h1 className="font-charlie-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">One home for your AI stack.</h1><p className="mt-4 text-base leading-7 text-slate-600">Create a single Airbase identity instead of juggling separate accounts just to explore the ecosystem.</p><ul className="mt-7 space-y-3">{points.map((point) => <li key={point} className="flex items-start gap-3 text-sm text-slate-700"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700"><Check className="h-3 w-3" /></span>{point}</li>)}</ul><div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2"><div className="flex gap-3"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><p className="text-xs leading-5 text-slate-600"><strong className="text-slate-800">Account scope</strong><br />This form creates an Airbase account only.</p></div><div className="flex gap-3"><CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><p className="text-xs leading-5 text-slate-600"><strong className="text-slate-800">Preview status</strong><br />Provider execution and tool connections need Airbase backend setup.</p></div></div></section><AuthForm initialMode={initialMode} /></div>
}

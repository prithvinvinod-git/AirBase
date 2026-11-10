"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "@firebase/auth"
import { Bookmark, Boxes, Layers3, LogOut, ShieldCheck } from "lucide-react"
import { ModelGrid } from "@/components/model/ModelGrid"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { useCatalogIds } from "@/lib/catalog-storage"
import { models } from "@/lib/mock-data"
import { tools } from "@/lib/tool-data"

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const savedModelIds = useCatalogIds("savedModels")
  const savedToolIds = useCatalogIds("savedTools")
  const compareIds = useCatalogIds("compareModels")

  useEffect(() => auth ? onAuthStateChanged(auth, setUser) : undefined, [])

  const savedModels = useMemo(() => models.filter((model) => savedModelIds.includes(model.id)), [savedModelIds])
  const savedTools = useMemo(() => tools.filter((tool) => savedToolIds.includes(tool.id)), [savedToolIds])

  return <div className="mx-auto max-w-page-max px-5 py-10 sm:px-6 sm:py-14"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Your workspace</p><h1 className="font-charlie-display text-4xl font-semibold tracking-[-0.045em] text-slate-950">Airbase dashboard</h1><p className="mt-3 text-sm text-slate-500">A lightweight preview of the things you have saved in this browser.</p></div>{user ? <button onClick={() => auth && signOut(auth)} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LogOut className="h-4 w-4" /> Sign out</button> : <Link href="/signup" className="inline-flex items-center gap-2 self-start rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><ShieldCheck className="h-4 w-4" /> Create one Airbase account</Link>}</div>
    <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ label: "Saved models", value: savedModelIds.length, icon: Bookmark }, { label: "Saved tool listings", value: savedToolIds.length, icon: Boxes }, { label: "Models in comparison", value: compareIds.length, icon: Layers3 }, { label: "Airbase identity", value: user ? "Signed in" : isFirebaseConfigured ? "Not signed in" : "Not configured", icon: ShieldCheck }].map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-4 w-4" /></span><div><p className="text-xs text-slate-500">{stat.label}</p><p className="mt-0.5 text-lg font-semibold text-slate-950">{stat.value}</p></div></div> })}</div>
    {user && <p className="mb-7 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">Signed in as <strong>{user.displayName || user.email}</strong>. This preview does not yet sync saved items to an account database.</p>}
    <section className="mb-12"><div className="mb-4 flex items-end justify-between"><div><h2 className="font-charlie-display text-2xl font-semibold text-slate-950">Saved models</h2><p className="mt-1 text-xs text-slate-500">Saved locally in this browser.</p></div><Link href="/models" className="text-xs font-semibold text-blue-700 hover:text-blue-900">Browse models</Link></div>{savedModels.length ? <ModelGrid models={savedModels} columns={3} /> : <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center text-sm text-slate-500">No saved models yet. Use the heart on a model card to keep one here.</div>}</section>
    <section><div className="mb-4 flex items-end justify-between"><div><h2 className="font-charlie-display text-2xl font-semibold text-slate-950">Saved tool listings</h2><p className="mt-1 text-xs text-slate-500">Directory bookmarks only; provider connections are not enabled.</p></div><Link href="/tools" className="text-xs font-semibold text-blue-700 hover:text-blue-900">Explore tools</Link></div>{savedTools.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{savedTools.map((tool) => <div key={tool.id} className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{tool.category}</p><h3 className="mt-1 font-semibold text-slate-900">{tool.name}</h3><p className="mt-1 text-xs text-slate-500">{tool.maker}</p></div>)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center text-sm text-slate-500">No saved tool listings yet. Browse the tool directory to add a few.</div>}</section>
  </div>
}

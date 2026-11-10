"use client"

import Link from "next/link"
import { useState } from "react"
import { Boxes, Menu, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Models", href: "/models" },
  { label: "Tools", href: "/tools" },
  { label: "Compare", href: "/compare" },
  { label: "Workspace", href: "/dashboard" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-page-max items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Airbase home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-cyan-200 shadow-sm"><Boxes className="h-[18px] w-[18px]" /></span>
          <span className="font-charlie-display text-[21px] font-bold tracking-[-0.06em] text-slate-950">airbase<span className="text-blue-600">.</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={() => setSearchOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950" aria-label={searchOpen ? "Close search" : "Search models"} aria-expanded={searchOpen}>
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>
          <Link href="/signup?mode=sign-in" className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700 sm:inline-flex">Sign in</Link>
          <Link href="/signup" className="hidden items-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:inline-flex">Create account</Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-800 hover:bg-slate-100 md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-3 sm:px-6">
          <form action="/models" className="mx-auto flex max-w-page-max items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <Search className="h-4 w-4 text-slate-400" />
            <input autoFocus name="search" type="search" placeholder="Search models, providers, and capabilities" className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
            <button className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">Search</button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden">
          <nav className="mx-auto flex max-w-page-max flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={cn("rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50", link.label === "Compare" && "text-blue-700")}>{link.label}</Link>)}
            <Link href="/signup" onClick={() => setMobileOpen(false)} className="mt-2 rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white">Create your Airbase account</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

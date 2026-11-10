"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/75 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-page-max items-center justify-between gap-3 px-5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Airbase home">
          <span className="grid h-9 w-9 place-items-center rounded-[13px] bg-slate-950 text-cyan-200 shadow-sm"><Boxes className="h-[18px] w-[18px]" /></span>
          <span className="font-charlie-display text-[21px] font-extrabold tracking-[-0.065em] text-slate-950">airbase<span className="text-blue-600">.</span></span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-2xl bg-slate-50 p-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={cn("rounded-xl px-3 py-2 text-xs font-semibold transition-colors", isActive(link.href) ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200/70" : "text-slate-500 hover:text-slate-950")}>{link.label}</Link>)}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button type="button" onClick={() => { setSearchOpen((open) => !open); setMobileOpen(false) }} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100" aria-label={searchOpen ? "Close search" : "Search models"} aria-expanded={searchOpen}>
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}<span className="hidden text-xs font-medium sm:inline">Search</span>
          </button>
          <Link href="/signup?mode=sign-in" className="hidden rounded-xl px-2 py-2 text-xs font-semibold text-slate-600 transition hover:text-blue-700 sm:inline-flex">Sign in</Link>
          <Link href="/signup" className="hidden items-center rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:inline-flex">Create account</Link>
          <button type="button" onClick={() => { setMobileOpen((open) => !open); setSearchOpen(false) }} className="grid h-10 w-10 place-items-center rounded-xl text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && <div className="border-t border-slate-100 bg-white px-5 py-3 sm:px-6"><form action="/models" onSubmit={() => setSearchOpen(false)} className="mx-auto flex max-w-page-max items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"><Search className="h-4 w-4 text-slate-400" /><input autoFocus name="search" type="search" placeholder="Search models, providers, and capabilities" className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /><button className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">Search</button></form></div>}

      {mobileOpen && <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden"><nav className="mx-auto flex max-w-page-max flex-col gap-1" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} aria-current={isActive(link.href) ? "page" : undefined} className={cn("rounded-xl px-3 py-3 text-sm font-semibold transition-colors", isActive(link.href) ? "bg-blue-50 text-blue-800" : "text-slate-700 hover:bg-slate-50")}>{link.label}</Link>)}<div className="mt-2 grid grid-cols-2 gap-2"><Link href="/signup?mode=sign-in" onClick={() => setMobileOpen(false)} className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Sign in</Link><Link href="/signup" onClick={() => setMobileOpen(false)} className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white">Create account</Link></div></nav></div>}
    </header>
  )
}

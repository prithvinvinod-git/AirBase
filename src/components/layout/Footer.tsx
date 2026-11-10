import Link from "next/link"
import { Boxes } from "lucide-react"

const footerLinks = {
  Explore: [
    { label: "Browse models", href: "/models" },
    { label: "AI tools", href: "/tools" },
    { label: "Compare models", href: "/compare" },
  ],
  Workspace: [
    { label: "Create an account", href: "/signup" },
    { label: "Saved items", href: "/dashboard" },
  ],
  Project: [
    { label: "Product preview", href: "/" },
    { label: "Catalog notes", href: "/models" },
  ],
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-page-max px-6 py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5" aria-label="Airbase home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-cyan-200"><Boxes className="h-[18px] w-[18px]" /></span>
              <span className="font-charlie-display text-xl font-bold tracking-[-0.06em] text-slate-950">airbase<span className="text-blue-600">.</span></span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-500">A calmer way to discover, compare, and choose the right AI for the work.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{title}</h2>
              <ul className="space-y-3">
                {links.map((link) => <li key={link.label}><Link href={link.href} className="text-sm text-slate-600 transition hover:text-blue-700">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Airbase. Preview catalog contains illustrative sample data.</p>
          <p>One Airbase account · provider execution is not enabled in this preview</p>
        </div>
      </div>
    </footer>
  )
}

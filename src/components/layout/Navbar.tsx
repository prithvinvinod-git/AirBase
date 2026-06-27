"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, Sparkles, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Models", href: "/models", children: [
    { label: "Text Generation", href: "/category/text-generation" },
    { label: "Image Generation", href: "/category/image-generation" },
    { label: "Code Generation", href: "/category/code-generation" },
    { label: "Audio & Speech", href: "/category/audio-speech" },
    { label: "Embeddings", href: "/category/embeddings" },
    { label: "All Models", href: "/models" },
  ]},
  { label: "Categories", href: "/models" },
  { label: "Scanner", href: "/scanner" },
  { label: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-pure-white border-b border-fog-white">
      <div className="mx-auto flex h-14 max-w-page-max items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-atlassian-blue rounded-radius-md">
            <Sparkles className="w-4 h-4 text-pure-white" />
          </div>
          <span className="font-charlie-display font-bold text-heading-sm text-midnight-navy hidden sm:block">
            Hacker<span className="text-atlassian-blue">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-caption font-medium text-midnight-navy hover:text-atlassian-blue rounded-radius-md transition-colors",
                  link.children && "pr-2"
                )}
              >
                {link.label}
                {link.children && (
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    activeDropdown === link.label && "rotate-180"
                  )} />
                )}
              </Link>
              {link.children && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-pure-white rounded-radius-2xl border border-fog-white shadow-subtle py-2 animate-fade-in">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-caption text-midnight-navy hover:bg-fog-white hover:text-atlassian-blue transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-muted-indigo hover:text-midnight-navy hover:bg-fog-white rounded-radius-md transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <Button variant="ghost" size="sm" className="hidden sm:flex text-caption">
            Sign in
          </Button>
          <Button size="sm" radius="full" className="hidden sm:flex text-caption">
            Get Started
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-midnight-navy hover:bg-fog-white rounded-radius-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-fog-white bg-pure-white px-6 py-4 animate-fade-in">
          <div className="mx-auto max-w-page-max">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-indigo" />
              <input
                type="text"
                placeholder="Search models, categories, authors..."
                className="w-full h-12 pl-12 pr-4 rounded-radius-inputs border border-carbon-edge bg-pure-white text-body text-midnight-navy placeholder:text-muted-indigo focus:outline-none focus:ring-2 focus:ring-atlassian-blue"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-fog-white bg-pure-white animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-body text-midnight-navy hover:bg-fog-white rounded-radius-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-3 border-fog-white" />
            <Button variant="ghost" size="sm" className="w-full justify-start text-caption">
              Sign in
            </Button>
            <Button size="sm" radius="full" className="w-full text-caption mt-2">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

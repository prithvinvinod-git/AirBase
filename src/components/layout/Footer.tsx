import Link from "next/link"
import { Sparkles } from "lucide-react"

const footerLinks = {
  "Platform": [
    { label: "Browse Models", href: "/models" },
    { label: "Categories", href: "/models" },
    { label: "Trending", href: "/models?sort=trending" },
    { label: "Scanner", href: "/scanner" },
  ],
  "Resources": [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Benchmarks", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  "Company": [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-fog-white bg-pure-white">
      <div className="mx-auto max-w-page-max px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-atlassian-blue rounded-radius-md">
                <Sparkles className="w-4 h-4 text-pure-white" />
              </div>
              <span className="font-charlie-display font-bold text-heading-sm text-midnight-navy">
                Hacker<span className="text-atlassian-blue">AI</span>
              </span>
            </Link>
            <p className="text-body text-muted-indigo leading-body max-w-xs">
              The App Store for AI Models — browse, compare, test, and deploy AI models from hundreds of providers.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-medium text-caption text-midnight-navy mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-muted-indigo hover:text-atlassian-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-fog-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-muted-indigo">
            &copy; {new Date().getFullYear()} HackerAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-caption text-muted-indigo hover:text-atlassian-blue transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-caption text-muted-indigo hover:text-atlassian-blue transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-caption text-muted-indigo hover:text-atlassian-blue transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

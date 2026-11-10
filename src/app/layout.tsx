import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "Airbase — Discover AI models and tools",
    template: "%s — Airbase",
  },
  description: "Compare AI models and tools by capability, cost, speed, and fit. One clear discovery workspace for AI.",
  applicationName: "Airbase",
  keywords: ["AI models", "AI tools", "model marketplace", "benchmarks", "AI comparison"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-slate-950 font-charlie-text antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

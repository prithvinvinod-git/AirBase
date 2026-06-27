import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "HackerAI — The App Store for AI Models",
    template: "%s — HackerAI",
  },
  description:
    "Browse, compare, test, and deploy AI models from hundreds of providers. The unified marketplace for AI models.",
  keywords: ["AI models", "machine learning", "LLM", "marketplace", "GPT", "Claude", "AI"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-pure-white text-midnight-navy font-charlie-text antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

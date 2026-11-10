"use client"

import { useRef } from "react"
import type { PointerEvent } from "react"

const brands = [
  { name: "OpenAI", mark: "◎", background: "#e8f6f3", color: "#087f69" },
  { name: "Claude", mark: "✳", background: "#fbefe8", color: "#c25a36" },
  { name: "Gemini", mark: "✦", background: "#eef1ff", color: "#5064dc" },
  { name: "Meta", mark: "∞", background: "#eaf3ff", color: "#1769e0" },
  { name: "Mistral", mark: "M", background: "#fff1e5", color: "#ed702e" },
  { name: "DeepSeek", mark: "D", background: "#e8f0ff", color: "#2766d5" },
  { name: "Perplexity", mark: "P", background: "#e5f6f5", color: "#167e79" },
  { name: "Midjourney", mark: "M·", background: "#f0edff", color: "#6655bd" },
  { name: "Runway", mark: "R", background: "#f0efff", color: "#5147bd" },
  { name: "ElevenLabs", mark: "11", background: "#f5f0ec", color: "#563f31" },
  { name: "Cursor", mark: "C", background: "#eef0f2", color: "#25282c" },
  { name: "Cohere", mark: "Co", background: "#e9f4e8", color: "#337b3d" },
  { name: "Stability AI", mark: "S", background: "#f5ecff", color: "#8353b5" },
  { name: "GitHub Copilot", mark: "⌘", background: "#e9efff", color: "#3b58a6" },
  { name: "Hugging Face", mark: "HF", background: "#fff5d9", color: "#a56c00" },
  { name: "NotebookLM", mark: "N", background: "#edf2fc", color: "#475a87" },
]

const tiles = Array.from({ length: 72 }, (_, index) => brands[(index * 7 + Math.floor(index / 8) * 3) % brands.length])

export function LogoField() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !fieldRef.current) return
    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)

    frameRef.current = requestAnimationFrame(() => {
      const field = fieldRef.current
      if (!field) return
      const radius = Math.min(field.clientWidth * 0.34, 170)
      field.querySelectorAll<HTMLElement>("[data-logo-tile]").forEach((tile) => {
        const rect = tile.getBoundingClientRect()
        const dx = rect.left + rect.width / 2 - pointerRef.current.x
        const dy = rect.top + rect.height / 2 - pointerRef.current.y
        const distance = Math.hypot(dx, dy)
        const proximity = Math.max(0, 1 - distance / radius)
        const eased = proximity * proximity * (3 - 2 * proximity)
        tile.style.setProperty("--lift", `${-20 * eased}px`)
        tile.style.setProperty("--scale", `${1 + 0.22 * eased}`)
        tile.style.setProperty("--glow", `${eased}`)
      })
    })
  }

  const resetField = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    fieldRef.current?.querySelectorAll<HTMLElement>("[data-logo-tile]").forEach((tile) => {
      tile.style.setProperty("--lift", "0px")
      tile.style.setProperty("--scale", "1")
      tile.style.setProperty("--glow", "0")
    })
  }

  return (
    <div className="logo-field-shell" aria-label="A field of AI product icons that responds to pointer movement" role="img">
      <div className="logo-field-halo" />
      <div ref={fieldRef} className="logo-field-grid" onPointerMove={handlePointerMove} onPointerLeave={resetField}>
        {tiles.map((brand, index) => <span key={`${brand.name}-${index}`} data-logo-tile className="logo-tile" title={brand.name} style={{ backgroundColor: brand.background, color: brand.color }}>{brand.mark}</span>)}
      </div>
      <div className="logo-field-caption"><span className="logo-field-status-dot" />One catalog. Many ways to build.</div>
    </div>
  )
}

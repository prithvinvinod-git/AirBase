"use client"

import { useSyncExternalStore } from "react"

const KEYS = {
  savedModels: "airbase:saved-models:v1",
  savedTools: "airbase:saved-tools:v1",
  compareModels: "airbase:compare-models:v1",
} as const

const CHANGE_EVENT = "airbase:catalog-storage-change"
const emptySnapshot: string[] = []
const cache: Record<string, { raw: string; ids: string[] } | undefined> = {}

export type CatalogStorageKey = keyof typeof KEYS

function parseIds(raw: string): string[] {
  try {
    const value = JSON.parse(raw)
    return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : []
  } catch {
    return []
  }
}

function getSnapshot(key: CatalogStorageKey): string[] {
  if (typeof window === "undefined") return emptySnapshot
  try {
    const raw = window.localStorage.getItem(KEYS[key]) ?? "[]"
    if (cache[key]?.raw !== raw) cache[key] = { raw, ids: parseIds(raw) }
    return cache[key]?.ids ?? emptySnapshot
  } catch {
    return cache[key]?.ids ?? emptySnapshot
  }
}

export function readCatalogIds(key: CatalogStorageKey): string[] {
  return getSnapshot(key)
}

export function useCatalogIds(key: CatalogStorageKey): string[] {
  return useSyncExternalStore(
    (listener) => subscribeCatalogStorage(listener),
    () => getSnapshot(key),
    () => emptySnapshot
  )
}

export function writeCatalogIds(key: CatalogStorageKey, ids: string[]) {
  if (typeof window === "undefined") return
  const uniqueIds = [...new Set(ids)]
  const raw = JSON.stringify(uniqueIds)
  cache[key] = { raw, ids: uniqueIds }
  try {
    window.localStorage.setItem(KEYS[key], raw)
  } catch {
    // Keep the current session usable if browser storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { key } }))
}

export function toggleCatalogId(key: CatalogStorageKey, id: string): string[] {
  const current = readCatalogIds(key)
  const next = current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]
  writeCatalogIds(key, next)
  return next
}

export function subscribeCatalogStorage(listener: () => void) {
  if (typeof window === "undefined") return () => undefined
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener("storage", listener)
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener("storage", listener)
  }
}

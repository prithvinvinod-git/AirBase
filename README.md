# Airbase

Airbase is a discovery workspace for AI models and tools. The product direction is to help people find the right option by task, compare the trade-offs, and eventually access connected services through one Airbase account rather than creating separate provider accounts.

## Current preview

This repository contains a front-end product preview with a sample model catalog, a tool directory, searchable model facets, browser-local bookmarks, a three-model comparison workspace, and a Firebase email/password account entry point. The requested cursor-reactive logo field is built as a small Airbase component and does not depend on a third-party animation package.

The model directory now supports capability/provider filters, sample-metric sorting, and grid/list presentation. Model cards use restrained pointer spotlights inspired by ReactBits interaction patterns; motion is reduced for users who request it, and the homepage spotlight is manually navigated rather than autoplayed. See [`UI-DESIGN-PROMPT.md`](./UI-DESIGN-PROMPT.md) for the researched UI brief and references.

The catalog is illustrative. Pricing, ratings, run counts, uptime, latency, and benchmark scores are not live or independently verified. Provider execution, tool launching, account-backed storage, live catalog ingestion, and benchmark provenance are not enabled yet. The preview explicitly labels these boundaries rather than implying a working provider gateway.

## Run locally

Use Node.js 20 or newer. Install dependencies with `npm install`, then start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`. Run checks with:

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

## Airbase account setup

The sign-up page uses Firebase Authentication with email and password. To enable it, create a Firebase project, enable Email/Password sign-in, and copy the public web-app values listed in `.env.example` into a local `.env.local` or the deployment environment. Firebase client configuration is public application config; never place service-account credentials or provider API keys in `NEXT_PUBLIC_*` variables.

The current app only authenticates an Airbase identity. It does not yet verify account tokens on a provider gateway, meter usage, sync bookmarks to a database, or grant model/tool execution. Those pieces require a deliberate server-side integration and security design before real AI provider credentials are connected.

## Product roadmap ideas

- **Task-to-model finder:** describe the job and constraints; rank models by capability, budget, speed, context, and modality, with reasons for each recommendation.
- **Model decision room:** compare up to three candidates, estimate cost for a supplied workload, and show only comparable benchmark runs with source, dataset/version, units, metric direction, and evaluation date.
- **Real-world eval lab:** run a user-approved prompt set against eligible models, anonymize outputs, collect pairwise preferences, and publish reproducible results.
- **Tool graph:** map tools to the models and file formats they support, then compose multi-step workflows such as research → summarize → draft → generate media.
- **Unified Airbase access:** one Airbase account and billing/usage surface, with server-side provider adapters, per-user limits, privacy controls, and no provider signup or API key required from end users.
- **Trust and freshness layer:** provider/source links, last-checked timestamps, pricing units, regional availability, licensing, data retention, and clear separation of verified facts from community estimates.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS 4, Firebase client SDK scaffold, Radix UI primitives, Framer Motion, TanStack Query, and Recharts.

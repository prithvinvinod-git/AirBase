# Airbase product design

## Product position

Airbase is a decision workspace for discovering AI models and tools, comparing the trade-offs, and eventually accessing connected services through one Airbase identity. Public discovery should be useful before sign-in. This repository remains a front-end preview: catalog values and provider integrations must never be presented as live or verified when they are not.

## Visual direction

Build a composed editorial interface: a deep-ink hero, cool paper-like browse surfaces, confident Manrope headings, precise Inter UI copy, electric blue actions, and restrained mint highlights. Prefer clear hierarchy, thin cool-gray borders, open spacing, and selective gradients over heavy shadows or glass effects everywhere. Rounded cards should feel tactile without making every surface pill-shaped.

The signature visual is a responsive field of AI-product marks. Each tile is an Airbase monogram treatment, not a promise that an official logo is displayed. As a pointer approaches, neighboring tiles lift, scale, and softly brighten in a damped wave. Keep the surface calm and static on touch; disable movement for reduced-motion users.

The model directory uses a compact browse hierarchy inspired by familiar marketplace information architecture: capability facets, provider/search/sort controls, clear results count, and an accessible grid/list switch. Model cards prioritize provider and model identity, capability tags, short description, and sample context/pricing/latency before secondary actions. Airbase maintains its own palette, typography, copy, and component composition rather than cloning another product's page.

## Motion and accessibility

Use a small number of purposeful motion moments: a brief hero entrance, short model-card reveal, and cursor-follow card highlight. The model spotlight is manually controlled rather than autoplaying. Pointer effects update CSS variables instead of causing React renders on every movement. Keep hover effects subtle, reversible, and nonessential for understanding controls.

Respect `prefers-reduced-motion` in both component behavior and CSS. Touch screens must not simulate a cursor. Preserve keyboard focus rings, accessible names for icon-only buttons, semantic headings, sufficient contrast, responsive layouts, and comfortable touch targets. Avoid layout shifts and infinite decorative animations.

## Interaction principles

- Search, category/provider facets, sorting, and results presentation update the visible catalog immediately.
- Model-card navigation stays separate from save and compare controls.
- Comparison is limited to three candidates and shows sample/provenance warnings with its metrics.
- Saved models and tools in this preview are browser-local; never describe them as account-synced.
- One Airbase account is the product direction. Do not route users to provider-specific sign-up as a substitute for a unified Airbase gateway.
- Do not present a simulated scan, benchmark, provider response, price, review, run count, or uptime as live or verified.
- Keep source, unit, version, evaluation date, and freshness visible when future integrations supply changing metrics.

## Voice

Direct, curious, and precise. Prefer “Find the model that fits this task” to broad “best AI” claims. Explain trade-offs and what is known versus illustrative. The detailed implementation prompt and references are in [`UI-DESIGN-PROMPT.md`](./UI-DESIGN-PROMPT.md).

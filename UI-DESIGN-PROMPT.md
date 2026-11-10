# Airbase UI redesign prompt

## Reference notes for this implementation

OpenRouter’s inspected model directory provides useful information-architecture patterns: a compact top-level product nav, discover/compare entry points, list/table presentation choices, modality filters, and model rows that surface provider, context, pricing, and usage context. Use those patterns as inspiration for browseability, not as a visual or brand template. [OpenRouter model directory](https://openrouter.ai/models) [OpenRouter product overview](https://openrouter.ai/)

ReactBits describes its components as editable source that can be copied into a project. Its guidance recommends limiting a page to two or three prominent motion effects and using lighter or static versions on smaller screens. Its Dot Grid uses a soft spring response around pointer movement; Spotlight Card follows the pointer with a soft card highlight. Adapt these interaction ideas to Airbase’s existing logo field and model cards instead of introducing a generic animation-library dependency. [ReactBits introduction](https://reactbits.dev/get-started/introduction) [ReactBits Dot Grid](https://reactbits.dev/backgrounds/dot-grid) [ReactBits Spotlight Card](https://reactbits.dev/components/spotlight-card) [ReactBits Grid Motion](https://reactbits.dev/backgrounds/grid-motion)

## Prompt

You are a senior product designer and frontend engineer improving **Airbase**, an AI-model and AI-tool discovery workspace. Create a polished, production-minded interface that feels as clear and information-rich as a model marketplace such as OpenRouter, but is unmistakably Airbase: calmer typography, more useful task-oriented browsing, tactile but restrained motion, strong provenance cues, and a distinctive field of app marks. Do not copy OpenRouter’s exact page composition, words, logo, colors, icons, or proprietary code.

### Product and technical context

Airbase currently runs on Next.js App Router, React, TypeScript, Tailwind CSS 4, and Framer Motion. The existing `framer-motion` dependency is already installed. Reuse the existing pages, `ModelCatalog`, `ModelCard`, `ModelGrid`, `LogoField`, shared navigation, and local-browser save/compare store. Keep all work inside the existing Airbase repository; do not touch another repository or add a dependency unless a concrete feature truly requires it.

The model catalog currently contains 12 illustrative records across several capabilities. Pricing, ratings, run counts, uptime, latency, and benchmarks are **not live or independently verified**. Keep the preview notice visible and label every affected metric at the point of use. Do not fabricate freshness, popularity, verified benchmarks, provider availability, price normalization, or AI execution. Saved items remain browser-local. One Airbase identity is the product direction, but provider execution and the secure gateway are not enabled yet.

### Visual direction

Build a confident, premium discovery product rather than a generic AI SaaS template. Pair the existing deep-ink hero with cool paper-like catalog surfaces, precise navy typography, an electric blue action color, and a restrained mint highlight. Use open spacing, thin cool-gray borders, subtle gradients, and sharply organized information. Avoid glass on every surface, oversized radii on every element, heavy shadows, glowing text everywhere, and busy animated backdrops.

The signature motif is a responsive field of AI-product marks: individual monogram/app tiles that rise and softly brighten near the cursor, with a controlled, damped response. Keep the logo field legible and calm; do not claim the monograms are official logos. Preserve the existing Airbase wordmark and icon.

### Information architecture and interactions

1. **Navigation:** Keep Models, Tools, Compare, and Workspace easy to find. Make the search affordance discoverable and keyboard accessible. Keep the single Airbase account route clear. Ensure the mobile menu is compact, touch-friendly, and closes after navigation.
2. **Homepage hero:** Lead with a task-oriented promise and a prominent model search. Include a small set of useful capability shortcuts and a direct path into the tool directory. Keep catalog counts explicitly framed as preview counts. Pair the copy with the interactive app-mark field.
3. **Model directory:** Make the search and filters immediately understandable. Provide sensible category/provider facets, sort choices with honest units, and a visible results count. Add a clear card/list presentation switch if it can be implemented accessibly without duplicating business logic. On each model card, prioritize provider/name, short description, capability tags, context, sample pricing, and sample latency. Keep Save and Compare distinct from model navigation. Use sample/provenance labels wherever values may be misread as live.
4. **Comparison and detail:** Keep the up-to-three-model comparison workflow visible. Surface provider, context, pricing unit, speed, and raw sample benchmark values with caveats. Do not append percentage symbols or rank incompatible metrics as if they were normalized.
5. **Tools and workspace:** Apply the same typography, surfaces, spacing, and focus/hover states to the AI-tool directory, comparison tray, and dashboard. State clearly when a connection or account-backed capability is not enabled.

### Motion and accessibility rules

Use only a few deliberate motion moments: a brief hero-content entrance, a restrained model-card reveal, and cursor-follow spotlights on interactive cards. Keep hover movement short, soft, and reversible; avoid infinite autoplay and large scroll-jacking effects. For pointer-follow highlights, update CSS variables directly rather than causing React renders on every pointer event. Do not make hover the only way to discover a control.

Honor `prefers-reduced-motion` in JavaScript and CSS. On touch devices, use a static or very subtle fallback; do not simulate a cursor. Preserve keyboard focus rings, visible button labels, accessible names for icon-only controls, semantic headings, usable contrast, and comfortable touch targets. Avoid layout shifts during transitions.

### Implementation constraints

Use the existing sample data and shared storage helpers. Keep components readable and modular; do not compress the page into a single component. Reuse current route behavior and avoid dead buttons, fake live results, or unsupported claims. Add no new provider sign-up paths. Update `design.md` to reflect the final direction and keep this prompt as the implementation brief.

### Acceptance

The result should feel like a coherent Airbase product across the homepage and model directory, not merely a recolored table. Desktop, tablet, and mobile layouts must remain clear. Search, filters, view switching, save, compare, and navigation must work. The logo field and card highlights must respect reduced-motion and touch input. All sample values must remain transparently labeled. `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` must pass.

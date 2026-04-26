# AGENTS.md

This file provides guidance to any agent (Claude Code, Codex, Pi, etc.) working in this repository. `CLAUDE.md` is a one-line `@AGENTS.md` import.

## What this is

Marketing site for **Exact Welds** — a mobile welder in Toledo, OH (sole owner Zack Miller). Solo developer (Justin) maintains the codebase; the customer-visible business goal is being found in search and converting on Facebook shares. There is no test runner; verification is build-gated and manual. The site lives at `https://exactwelds.com` and deploys to Cloudflare Workers.

**Conversion mechanism: phone, not form.** All "Get a Free Quote" CTAs are `<a href={\`tel:${NAP.phoneE164}\`}>` — clicking dials Zack directly. There is no quote-intake form, no `/quote` route, and no inbound email handler. If you find yourself wanting to add one, ask first; the deliberate choice is to keep the funnel as short as possible.

## Stack

| Layer | Tooling |
|---|---|
| Runtime / PM | Bun 1.x (npm `package-lock.json` coexists for Cloudflare deploy paths; do not migrate without a dedicated effort) |
| Framework | Vite 6 + React 19 + TypeScript strict (`tsc --noEmit` is the only static check) |
| Styling | Tailwind v4 (`@tailwindcss/vite`), `clsx` + `tailwind-merge` via `src/lib/cn.ts` |
| Routing | `react-router-dom` v7 (CSR only, no SSR/prerender) |
| SEO meta | `react-helmet-async` for per-route runtime tags; **static** OG/Twitter/description meta in `index.html` for crawlers |
| Forms / validation | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Images | `sharp` for build-time validation (devDep); ESM imports for in-page assets (Vite hashes them) |
| Deploy | `wrangler` + `@cloudflare/vite-plugin`; SPA fallback via `assets.not_found_handling: "single-page-application"` in `wrangler.jsonc` |

The repo was originally scaffolded by Google AI Studio. Most leftovers (`metadata.json`, root-level `fetch-*.ts`/`debug-cf.ts`/`test-*.ts` debug scripts, the AI Studio README) have been removed. Two scaffold artifacts remain and are intentional for now:

- `.env.example` lists `GEMINI_API_KEY` and `APP_URL` alongside `VITE_SITE_URL`. The first two are unused in source but harmless; AI Studio injects them at runtime if the project ever returns there.
- `vite.config.ts` keeps a `DISABLE_HMR` env-var check in `server.hmr` from the AI Studio era. Remove only if you confirm the project no longer needs to run inside AI Studio.

Do not chase these without a deliberate cleanup pass.

## Commands

```bash
bun run dev        # Vite dev server on port 3000, host 0.0.0.0
bun run lint       # tsc --noEmit (the ONLY automated correctness check; treat failures as blocking)
bun run build      # Runs `prebuild` (image validator) then `vite build`. Production mode REQUIRES `VITE_SITE_URL`.
bun run preview    # `npm run build && wrangler dev` — preview Cloudflare Worker locally
bun run deploy     # `npm run build && wrangler deploy` — deploy to Cloudflare
bun run prebuild   # tsx scripts/validate-images.ts — runs sharp-based image checks standalone
```

There are no unit/integration tests and no test framework. Do **not** introduce one casually; doing so would expand scope beyond any current effort. Verification flows are: `bun run lint`, `bun run build` (prebuild validator + Vite), manual browser smoke, and post-deploy curl/Sharing-Debugger checks per `docs/runbooks/post-deploy.md`.

## Critical build-time invariants

- **`VITE_SITE_URL` must be set in production builds.** A custom Vite plugin (`siteUrlGuard` in `vite.config.ts`) throws if `mode === 'production'` and the var is missing/empty — checked from both `process.env` and `loadEnv()` so CI shell vars and `.env.*` files both work. Dev mode falls back to `http://localhost:3000`. **The value is build-time only** — Vite inlines `import.meta.env.VITE_SITE_URL` and substitutes `%VITE_SITE_URL%` tokens in `index.html`. Cloudflare dashboard runtime env vars do **not** reach Vite.
- **`scripts/validate-images.ts` runs as `prebuild`** before every `vite build` (and via npm/bun lifecycle, also before `preview` and `deploy`). It walks `src/assets/**` and `public/**` images, fails the build on any undecodable file, and asserts `public/og-image.jpg` is present, ≤300 KB, and ~1200×630 (±5%). If you add new images, ensure they are valid; if you must skip validation for a one-off, use `vite build` directly (not `bun run build`).
- **`tsconfig.json` `include` covers `src` and `scripts`.** Keep both type-checked. Do not move scripts elsewhere without updating include.

## Architecture (big picture)

### Image pipeline (recently load-bearing — see Lessons learned)

- **Single source of truth: `src/assets/gallery/`.** All in-page images load via per-file ESM imports (e.g., `import imgMarineDock from '../assets/gallery/img-marine-dock.jpg'`). Vite hashes them and emits to `dist/assets/`. **Do not** introduce `import.meta.glob` manifests, replace this pattern, or duplicate files into `public/`.
- **`public/` only holds files that need a stable URL across deploys.** Currently: `og-image.jpg` (the social-share asset, hardcoded into `index.html` at build via `%VITE_SITE_URL%`) and `_redirects` (Cloudflare Pages-style; `/gallery/hero.jpg /og-image.jpg 301` preserves cached share previews from the previous URL). Anything else added here should be similarly justified.
- **SeoHead does NOT emit `og:image` / `twitter:image`** when no `ogImage` prop is passed. The static `index.html` tags are canonical. This is deliberate: in a CSR SPA, OG crawlers (Facebook, Slack, iMessage, LinkedIn) do not run JS — they only see what `index.html` ships with. Per-route OG override at `<SeoHead ogImage=…>` would produce two `og:image` tags in the DOM, and OG spec / Facebook crawler use first-match. **Per-route OG meta is structurally blocked until SSR/prerender lands.**

### Layered structure

```
src/
  main.tsx, App.tsx       # bootstraps StrictMode + HelmetProvider + BrowserRouter; declares 6 routes
  routes/                 # one file per route (Home, Services, Work, About, Reviews, Faq)
  components/
    layout/               # Header, Footer, MobileCtaBar, TrustBar, SectionDivider
    ui/                   # Button, Card, Accordion, Tag, SpecPlate
    seo/SeoHead.tsx       # react-helmet-async wrapper; emits title, description, canonical, JSON-LD
  content/                # static data (no logic): nap.ts, gallery.ts, services.ts, faq.ts
  lib/
    cn.ts                 # twMerge + clsx helper for className composition
    schema.ts             # JSON-LD generators (LocalBusiness, Service, Person, FAQPage, ItemList)
```

Routes call `<SeoHead title=… description=… jsonLd={...} />`. JSON-LD generators in `src/lib/schema.ts` build their content from `src/content/`. The local-business schema and `canonical` URL both read `import.meta.env.VITE_SITE_URL` (with `?? 'http://localhost:3000'` fallback). NAP data (`src/content/nap.ts`) is the single source for business name, phone, service area, cities, hours — referenced from schema.ts, Header, Footer, etc.

### `@/*` alias is a footgun

`tsconfig.json` and `vite.config.ts` map `@/*` to the **repo root**, not `src/`. This means `@/welding2.jpg` would resolve to a file at the repo root, not `src/welding2.jpg`. The alias is currently unused in source. **Do not adopt it.** Use relative imports (`../assets/...`) like the existing code.

## Repo / workflow conventions

- **Conventional commits** (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`). Commit messages do not include attribution footers; only the final PR description carries the Compound Engineered badge.
- **Push permission:** `JustinBeaudry` is **not** a direct collaborator on `Mifmum/exactwelds`. Branches push to a fork at `JustinBeaudry/exactwelds` (already wired as the `fork` remote). PRs go from `JustinBeaudry:branch` to `Mifmum:main`. Do not retry pushes to `origin` without that path.
- **Compound Engineering artifacts** live under:
  - `docs/ideation/YYYY-MM-DD-<topic>-ideation.md`
  - `docs/brainstorms/YYYY-MM-DD-<topic>-requirements.md`
  - `docs/plans/YYYY-MM-DD-NNN-<type>-<name>-plan.md`
  - `docs/runbooks/<topic>.md`
  - `docs/solutions/` does not exist yet — write a new entry here after solving any reusable project-specific problem.
- **`.compound-engineering/config.local.yaml`** holds Codex delegation consent (`work_delegate_consent: true`, `work_delegate_sandbox: yolo`). The whole `.compound-engineering/` and `.context/` directories are gitignored.

## Lessons learned (from prior cleanups)

- **Latent JPEG corruption.** All 13 actively imported gallery binaries previously had UTF-8 replacement chars (`ef bf bd …`) where their JFIF headers should have been — they rendered in browsers (lazy decoders are forgiving) but failed `sharp().metadata()`. The cleanup PR (#6, April 2026) restored them from valid historical git blobs and added the `prebuild` validator to prevent recurrence. **If a new gallery image silently fails to load in production but works locally, suspect the same corruption mode and check with `xxd -l 16 <file>`** — a real JPEG starts with `FF D8 FF`.
- **Image cleanup recurs.** Multiple prior commits (`ba6718d`, `551b07a`, `2dc2e9d`, `aa986ca`, `037233f`, `b0ba0d3`, `e1fd71d`) churned on broken/duplicate images before the validator existed. Trust the validator; do not bypass it without strong reason.
- **The build script's defensive cache-wipe is gone.** A previous build script started with `rm -rf node_modules/.vite node_modules/.cache && vite build && rm -f dist/_redirects public/_redirects` — both halves were removed (the first was unnecessary, the second was actively destroying the load-bearing `_redirects` file). If a future Vite cache issue prompts re-adding the wipe, fix the cache root cause instead.

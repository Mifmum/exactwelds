---
date: 2026-04-26
topic: image-pipeline-cleanup
---

# Image Pipeline Cleanup

## Problem Frame

The exactwelds repo (Vite + React + Cloudflare Workers SPA) carries two parallel image directories — `src/assets/gallery/` and `public/gallery/` — that are byte-for-byte duplicates of each other (20 files, ~5 MB). The codebase imports gallery images via ESM from `src/assets/gallery/` (Vite-hashes them at build), but `public/gallery/hero.jpg` exists only to anchor a hardcoded OG image URL — `https://exactwelds.com/gallery/hero.jpg` — in `src/lib/schema.ts:11` and `src/components/seo/SeoHead.tsx:19`. The hero file in `public/` is 1.9 MB, far larger than recommended for OG/social. Both gallery trees also contain `metal-gate-placeholder.jpg`, which is a Wikimedia HTML error page renamed `.jpg` (corrupt, would render as a broken image if it were ever referenced). Six other unused placeholder images sit in `src/assets/gallery/` with zero imports.

Effects today:
- ~5 MB of duplication; image edits silently drift between the two trees, doubling the surface area for corruption.
- One known corrupt "image" in the repo. Git history (commits `ba6718d`, `551b07a`, `2dc2e9d`, `aa986ca`) shows broken-image bugs recur in this codebase.
- Oversized OG image hurts share-preview quality, which matters for a marketing site whose entire job is being shared.
- No invariant in writing for "where do images live and what URL serves social cards" → next agent or future-Justin re-litigates.

## Requirements

**Image source of truth**
- R1. `src/assets/gallery/` is the only directory containing in-page images. All in-page image references load via ESM imports from there (existing pattern; no change to current import sites).
- R2. `public/` contains only files whose URL must be stable across deploys. After this work, that's a single purpose-built OG image plus any future Cloudflare-specific files (`_redirects`, `_headers`).
- R3. Remove the `public/gallery/` directory entirely.

**OG / social image**
- R4. Add `public/og-image.jpg` — a purpose-built social-share image at 1200×630, ≤300 KB. Source can be derived from the existing `hero.jpg` or another representative welding photo; visual choice is a planning detail.
- R5. Replace the literal `https://exactwelds.com/gallery/hero.jpg` in `src/lib/schema.ts` and `src/components/seo/SeoHead.tsx` with `${VITE_SITE_URL}/og-image.jpg`.
- R6. Move the hardcoded `https://exactwelds.com` (currently in `SeoHead.tsx:15` as the `canonical` default and `schema.ts:14` as `"url"`) to a `VITE_SITE_URL` env var. Provide a sensible fallback so dev still works without `.env.local`, and document the variable in `.env.example`.
- R7. Add a baseline `<meta property="og:image">` (and matching `twitter:image`) tag to `index.html` so JS-disabled OG crawlers (Facebook, Slack, iMessage) see a working share image even before hydration. Use the production URL string directly here — `index.html` is static at deploy time, so the env-var substitution can be done at build via Vite's `transformIndexHtml` or a simple inline replacement.

**Cleanup of unused / corrupt assets**
- R8. Delete the 7 unused placeholder images from `src/assets/gallery/`: `aluminum-placeholder.jpg`, `blueprint-placeholder.jpg`, `cutting-placeholder.jpg`, `drilling-placeholder.jpg`, `equipment-placeholder.jpg`, `metal-gate-placeholder.jpg` (the corrupt HTML file), `metal-gate-placeholder2.jpg` (decodable image, just unused). Verified zero imports across `src/`.

**Build-time validation**
- R9. A `prebuild` script (Node + `sharp`) walks every image under `src/assets/**/*.{jpg,jpeg,png,webp}` and `public/**/*.{jpg,jpeg,png,webp}` and fails the build if any file is not a decodable image (catches HTML-as-image, truncated files, wrong-format files).
- R10. The same script asserts `public/og-image.jpg` is present, ≤300 KB, and dimensions are 1200×630 (tolerance to be picked in planning, but a small one — say ±5%).
- R11. The validator runs on every local `bun run build` via the `prebuild` lifecycle hook. CI integration is future work and does not block this effort.

## Visual

**Before**

```
public/
└── gallery/                          (20 files, ~5 MB — 100% duplicates)
    ├── hero.jpg                      (1.9 MB — load-bearing OG anchor)
    ├── img-marine-dock.jpg
    ├── img-stainless-steel.jpg
    ├── ... (17 more)
    ├── metal-gate-placeholder.jpg    (CORRUPT: HTML, not image)
    └── aluminum-placeholder.jpg      (unused)

src/assets/gallery/
    ├── hero.jpg                      (imported by Home.tsx, About.tsx, services.ts)
    ├── img-marine-dock.jpg           (imported by gallery.ts)
    ├── ... (13 active total)
    ├── metal-gate-placeholder.jpg    (CORRUPT: HTML, not image — unused)
    ├── metal-gate-placeholder2.jpg   (decodable but unused)
    └── *-placeholder.jpg             (5 more decodable-but-unused placeholders)
```

**After**

```
public/
└── og-image.jpg                      (1200×630, ≤300 KB, sole social-share file)

src/assets/gallery/
    ├── hero.jpg                      (13 active gallery files only)
    ├── img-marine-dock.jpg
    └── ... (no placeholders, no corrupt files)
```

**OG image flow:**
`src/lib/schema.ts` + `SeoHead.tsx` read `VITE_SITE_URL` → emit `<meta property="og:image" content="${VITE_SITE_URL}/og-image.jpg">` → `index.html` carries the same value statically for JS-disabled crawlers → crawler GETs `https://exactwelds.com/og-image.jpg` → Cloudflare static asset bundler serves `dist/og-image.jpg` (copied from `public/`).

## Success Criteria
- `public/gallery/` no longer exists; `public/` contains `og-image.jpg` and any Cloudflare-specific files (`_redirects`, `_headers`) added separately per R2.
- `find src/assets -name "*-placeholder*"` returns nothing.
- `git grep "exactwelds.com/gallery/hero.jpg"` returns no results.
- `git grep -E "https?://exactwelds\.com"` returns only `.env.example` and the env-loading module. (Note: `src/content/nap.ts` contains an email address `zack@exactwelds.com`; that is a data field, not a URL, and is intentionally out of scope for `VITE_SITE_URL`.)
- `bun run build` fails fast when any image is undecodable, when `og-image.jpg` is missing, or when its size/dimensions are out of bounds.
- Deployed `https://exactwelds.com/og-image.jpg` returns 200 with `Content-Type: image/jpeg`.
- Facebook Sharing Debugger and Twitter Card Validator render the new OG image correctly when given the home, services, and quote URLs.
- Lighthouse "image too large" warnings on the deployed home page do not flag the OG asset.

## Scope Boundaries
- **Out of scope:** Server-side rendering or prerendering for per-route SEO/OG metadata. The baseline `<meta>` in `index.html` (R7) is a single fallback used for every URL until SSR/prerender lands separately. **Per-route share previews will still show the home-page baseline until then.**
- **Out of scope:** Adopting `vite-imagetools` or any auto-resize pipeline. Manual one-time optimization is sufficient at this scale.
- **Out of scope:** Adopting `knip` for dead-code detection (Idea #3 in the ideation doc).
- **Out of scope:** Lighthouse CI (Idea #5).
- **Out of scope:** Repo identity reset — README rewrite, `@/*` alias fix, AI Studio scaffold deletion (Idea #6).
- **Out of scope:** Migrating off `package-lock.json` to a Bun-only toolchain.
- **Out of scope:** Replacing the existing source-tree gallery imports with an `import.meta.glob` manifest. The existing per-image import pattern stays.

## Key Decisions
- **OG image lives at a stable URL in `public/og-image.jpg`** (Approach A from the brainstorm). Stable URLs are how social platforms cache; Vite-hashed URLs (Approach C) would invalidate share previews on every deploy. A Vite-config exception that emits an unhashed asset from `src/assets/` (Approach B) trades public-directory policing for build-config policing — net neutral with extra complexity.
- **`VITE_SITE_URL` env var replaces the hardcoded domain.** Same value drives both the canonical-URL default and the OG URL prefix. Cleaner for staging/preview deploys, removes a foot-gun if the domain changes, and lets `.env.local` control behavior without code edits.
- **Validator runs on `prebuild`, not in CI.** No CI pipeline exists today; the validator must be a local gate to be effective. CI integration is welcome future work but doesn't gate this effort.
- **`sharp` over a magic-byte check.** `sharp().metadata()` parses real image data; catches truncated files, wrong-format files, and dimension regressions in one library. ~15 lines of script.
- **Add baseline OG meta to `index.html`.** Discovered during the brainstorm: most OG crawlers don't execute JS, so client-side `react-helmet-async` injection alone leaves crawlers with no `og:image` at all. A static fallback in `index.html` is a one-line fix that materially improves share-preview reliability while SSR/prerender remains out of scope.

## Dependencies / Assumptions
- Cloudflare Workers' `assets.not_found_handling: "single-page-application"` config in `wrangler.jsonc` correctly serves `public/og-image.jpg` from the deployed asset bundle. This is the same mechanism that serves `public/gallery/hero.jpg` today — verified by the live OG URL working in production.
- Vite copies `public/*` verbatim into `dist/` at build, served by the Cloudflare Workers static asset bundler at root paths.
- `react-helmet-async` (already a dependency) handles client-side OG meta injection; no SSR/SSG runtime needed for in-app navigation.
- `sharp` 0.34.x is already resolved transitively via `miniflare` (Cloudflare Workers' local dev runtime), but transitive deps aren't contractual — it must be added as a direct `devDependency` in `package.json` so the prebuild script can rely on it.
- The 7 placeholder images in `src/assets/gallery/` and the 19 non-hero duplicates in `public/gallery/` are confirmed unimported (verified via `grep -rn`).

## Outstanding Questions

### Resolve Before Planning
*(none — all product decisions are settled)*

### Deferred to Planning
- [Affects R4][Technical] Source image for `public/og-image.jpg`: resize the existing `hero.jpg`, or pick a different welding shot that reads better at 1200×630 and at small thumbnail sizes. Visual review during planning.
- [Affects R6][Technical] Default for `VITE_SITE_URL` when `.env.local` is missing: fall back to `http://localhost:3000` only in dev mode (`import.meta.env.DEV`) and require the var in production builds, or use a single hardcoded fallback. Pick a default that won't accidentally leak `localhost:3000` into a deployed OG meta if the env var goes missing in CI.
- [Affects R7][Technical] How to inject `VITE_SITE_URL` into static `index.html`: Vite's `transformIndexHtml` plugin, or `%VITE_SITE_URL%` token replacement (Vite supports `%MODE%` natively but custom tokens need a small plugin). Hardcoding the domain in `index.html` is **not** an acceptable option — it would defeat R6's single-source-of-truth goal and reintroduce the foot-gun the env var exists to prevent.
- [Affects R10][Technical] Tolerance for the 1200×630 dimension assertion (exact, ±5%, ±10%). Planning can pick.
- [Affects R9, R10][Needs research] Whether `sharp` installs cleanly on Cloudflare Workers' build environment (it shouldn't matter — the script runs at build time on the developer machine, not in the worker — but verify if a CI build is ever wired up).

## Next Steps
→ `/ce:plan` for structured implementation planning

---
title: "refactor: Image pipeline cleanup"
type: refactor
status: completed
date: 2026-04-26
origin: docs/brainstorms/2026-04-26-image-pipeline-cleanup-requirements.md
---

# refactor: Image pipeline cleanup

## Overview

Remove the duplicated `public/gallery/` directory, replace the hardcoded production URL with a `VITE_SITE_URL` env var, ship a purpose-built OG image at a stable path, fix the duplicate-meta-tag risk between static `index.html` and runtime `react-helmet-async`, prevent silent breakage of cached share-preview URLs via a `_redirects` rule, delete unused/corrupt placeholder images and orphan repo-root files, and gate future image regressions with a `prebuild` validator.

The plan is structured for delegation to external CLI agents (Codex, Pi). Each unit is self-contained with an explicit Goal, Files, Approach, Patterns, and Verification so the orchestrator can dispatch units in parallel batches without inter-agent coordination.

## Problem Frame

The exactwelds repo (Vite 6 + React 19 + TypeScript on Cloudflare Workers) currently maintains two byte-for-byte identical image directories — `src/assets/gallery/` and `public/gallery/` — totalling ~10 MB of duplicated bytes. The codebase imports gallery images via Vite-hashed ESM from `src/assets/`, but `public/gallery/hero.jpg` is kept alive solely to anchor a hardcoded OG URL `https://exactwelds.com/gallery/hero.jpg` in `src/lib/schema.ts:11` and `src/components/seo/SeoHead.tsx:19`. The same hero file is 1.9 MB — far too large for a social-share image. Both gallery trees also contain `metal-gate-placeholder.jpg`, which is a Wikimedia HTML error page renamed `.jpg` (corrupt). Six other decodable-but-unused placeholders sit in `src/assets/gallery/` (seven total including the corrupt one). Git history (commits `ba6718d`, `551b07a`, `2dc2e9d`, `aa986ca`) shows broken-image bugs recur in this codebase; the duplication and the corrupt file would have been caught by a build-time gate.

The site's job is to be found in search and convert when shared on Facebook (the customer's primary word-of-mouth channel). The current OG setup actively undermines that — the file is too big to render well at thumbnail size, and the URL is invisibly coupled to the deployment domain such that any future rename would silently break share previews across all platforms. This plan fixes the underlying pipeline so the OG outcome stops depending on one developer's memory.

(See origin: `docs/brainstorms/2026-04-26-image-pipeline-cleanup-requirements.md`)

## Requirements Trace

- **R1.** `src/assets/gallery/` is the only directory containing in-page images (existing pattern).
- **R2.** `public/` contains only files whose URL must be stable across deploys: the OG image and any Cloudflare-specific config files (`_redirects`, `_headers`).
- **R3.** Remove the `public/gallery/` directory entirely.
- **R4.** Add `public/og-image.jpg` — purpose-built 1200×630, ≤300 KB.
- **R5.** Replace the literal `https://exactwelds.com/gallery/hero.jpg` in `src/lib/schema.ts` and `src/components/seo/SeoHead.tsx` with `${VITE_SITE_URL}/og-image.jpg`.
- **R6.** Move the hardcoded `https://exactwelds.com` to a `VITE_SITE_URL` env var (covers `canonical` default in `SeoHead.tsx` and `"url"` in `schema.ts`).
- **R7.** Add a baseline static set of OG/social meta tags to `index.html` for JS-disabled OG crawlers — `og:image`, `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, `twitter:image`, `twitter:title`, `twitter:description`, plus a generic `<meta name="description">`. Title/description copy is generic site-level (e.g., "Exact Welds | Mobile Welding Toledo, OH" / a one-sentence service description). Per-route differentiation remains out of scope until SSR/prerender lands.
- **R8.** Delete the 7 unused placeholder images from `src/assets/gallery/`.
- **R9.** A `prebuild` script (Node + sharp) walks every image under `src/assets/**` and `public/**` and fails the build on any undecodable file.
- **R10.** Validator asserts `public/og-image.jpg` is present, ≤300 KB, dimensions 1200×630 ±5%.
- **R11.** Validator runs on every local `bun run build` via `prebuild`. No CI integration in scope.
- **R12.** *(New, derived from doc-review concern #3)* Preserve cached share-preview URLs by adding a `_redirects` rule mapping `/gallery/hero.jpg` → `/og-image.jpg` (301), and remove the build script's defensive `rm -f dist/_redirects public/_redirects` step that would otherwise wipe the rule.

## Scope Boundaries

- Per-route OG/SEO metadata via SSR or prerendering. The static `index.html` tag from R7 is a single fallback for every URL until that effort lands separately. **The highest-leverage product follow-up to this plan is per-route OG**, but it requires SSR/prerender and is intentionally out of scope here.
- Adopting `vite-imagetools` or any auto-resize image pipeline (rejected at brainstorm).
- Adopting `knip` for dead-code detection (separate effort; ideation Idea #3).
- Lighthouse CI (separate effort; ideation Idea #5).
- Repo identity reset — README rewrite, `@/*` alias fix, AI Studio scaffold deletion, removing `untitled.tsx` (separate effort; ideation Idea #6).
- Migrating off `package-lock.json` to a Bun-only toolchain (separate effort).
- Replacing the existing per-image gallery imports with an `import.meta.glob` manifest.

### Deferred to Separate Tasks

- Per-route OG meta via SSR/prerender — likely a larger architectural effort tied to whether this site stays a CSR SPA.
- Repo identity reset (Idea #6 in `docs/ideation/2026-04-26-cleanup-ideation.md`) — handles `untitled.tsx`, `@/*` alias, README, AI Studio scaffolding.

## Context & Research

### Relevant Code and Patterns

- `src/components/seo/SeoHead.tsx` — current SEO/OG meta component using `react-helmet-async`. All 7 routes call `<SeoHead title=… description=… />` without an `ogImage` prop, so today every route emits the same hardcoded OG URL.
- `src/lib/schema.ts:11,14` — JSON-LD `LocalBusiness` schema with two literal `https://exactwelds.com` references.
- `src/content/gallery.ts`, `src/content/services.ts` — current ESM-import pattern for gallery images (`import imgX from '../assets/gallery/img-x.jpg'`). Plan does not change this pattern.
- `index.html` — current Vite entry. Has `<title>` but no OG/twitter meta tags. Mounts `/src/main.tsx`.
- `vite.config.ts` — already calls `loadEnv(mode, '.', '')`. Extend the existing pattern; do not introduce a new env-loading approach.
- `wrangler.jsonc` — `assets: { not_found_handling: "single-page-application" }` is the SPA fallback. Cloudflare Workers honors `public/_redirects` from the deployed asset bundle (same mechanism that serves `public/gallery/hero.jpg` today).

### Institutional Learnings

- No prior `docs/solutions/` entries for this project (verified during ideation). Recommend writing one after this plan ships, but capturing it is out of scope.
- Git history shows recurring image churn (`ba6718d`, `551b07a`, `2dc2e9d`, `aa986ca`) and prior cleanup commits (`037233f`, `b0ba0d3`, `e1fd71d`) that left rot behind — confirming this plan's leverage value.

### External References

- Cloudflare Workers static assets honor `_redirects` syntax (Pages-style): one rule per line, `<from> <to> <status>`. Documented at `developers.cloudflare.com/workers/static-assets/redirects`.
- Vite's `transformIndexHtml` plugin hook supports both `dev` and `build` contexts; the right shape for env-var token substitution into `index.html`.

## Key Technical Decisions

- **OG image lives at a stable URL: `public/og-image.jpg`** (Approach A from brainstorm). Stable URLs are how social-platform caches work; Vite-hashed URLs would invalidate share previews on every deploy.
- **Helmet duplicate-tag strategy: option (a) — `SeoHead.tsx` only emits `og:image`/`twitter:image` when an explicit `ogImage` prop is passed.** Today, no route passes `ogImage`, so this means the static `index.html` tag is the sole OG image for all current routes — exactly what JS-disabled crawlers need. When per-route OG eventually ships (out of scope here), it'll be a one-line change at the relevant `<SeoHead>` callsite, with helmet overriding the static fallback at hydration. This avoids hydration-race conditions and duplicate tags entirely.
- **`VITE_SITE_URL` substitution into `index.html` via a small Vite plugin** (`transformIndexHtml` hook) replacing a `%VITE_SITE_URL%` token. Hardcoding the domain in `index.html` is explicitly prohibited per origin doc — defeats R6's single-source-of-truth goal.
- **`VITE_SITE_URL` fallback semantics:**
    - Production builds (`mode === 'production'`): missing or empty `VITE_SITE_URL` **fails the build** with a clear error message. Prevents `localhost:3000` from leaking into deployed OG meta.
    - Dev builds (`mode === 'development'`): default to `http://localhost:3000` if env unset.
- **Validator runs on `prebuild`, not in CI.** No CI exists today. Adding a CI integration is out of scope and would be its own decision.
- **`sharp` over magic-byte check.** Sharp parses real image data, catches truncated files and dimension regressions in one library; ~30 lines of script. **Add it as a direct devDependency** (`bun add -d sharp`); it appears in the lockfile only as a transitive of `miniflare`, which provides no contractual guarantee.
- **Build script simplified.** Drop both the cache wipe (`rm -rf node_modules/.vite node_modules/.cache`) and the `_redirects` cleanup. The cache wipe is unnecessary; the `_redirects` cleanup is defensive dead code from a Cloudflare Pages → Workers migration. After this plan, `_redirects` is a load-bearing file that must survive builds (R12).
- **Legacy URL redirect: `/gallery/hero.jpg` → `/og-image.jpg` (301).** Existing Facebook/iMessage cached previews referencing the old hero URL will continue resolving correctly after `public/gallery/` is deleted.
- **Dimension tolerance: ±5% on each axis** for the OG image (1140-1260 wide, 599-661 tall). Tight enough to catch wildly wrong images; loose enough to allow tooling-induced minor variation.
- **80/20 split: not chosen — single bundled effort.** Product-lens reviewer argued for splitting the user-visible win (R3, R4, R5, R7, R8) from the env-var/validator follow-up (R6, R9, R10, R11). Both are folded together because the env var + validator are small (<100 lines combined) and prevent immediate recurrence of the bug class this effort fixes. If review at PR time disagrees, units are ordered to make a split trivially achievable (units 4–6 can be deferred without affecting units 1–3).

## Open Questions

### Resolved During Planning

- **Helmet duplicate-tag strategy** → Option (a): SeoHead omits og:image/twitter:image meta when no explicit `ogImage` prop is provided. Current callers don't pass it, so static index.html tag is canonical.
- **`VITE_SITE_URL` injection into `index.html`** → Vite plugin using `transformIndexHtml` and a `%VITE_SITE_URL%` token. Hardcoding prohibited.
- **`VITE_SITE_URL` fallback semantics** → Production: fail build. Dev: `http://localhost:3000`.
- **Cached share-preview breakage mitigation** → Add `public/_redirects` with `/gallery/hero.jpg /og-image.jpg 301`. Build script must stop wiping `_redirects`.
- **Build script `rm -f`** → Remove the entire defensive prelude (`rm -rf` cache + `rm -f _redirects`); reduce to `vite build`.
- **`check-images.ts`** → Delete in Unit 4. It's a manual HTTP-probe for deployed image URLs (hits a personal `trevor-shep.workers.dev`) and is obviated by the new validator.
- **`welding2.jpg`** → Delete in Unit 4. 3 MB orphan at repo root with the same shape as the unused placeholders.
- **OG image dimension tolerance** → ±5% on each axis.
- **80/20 split** → Folded; rationale documented in Key Technical Decisions.

### Deferred to Implementation

- **Source image for `public/og-image.jpg`** — the existing `src/assets/gallery/hero.jpg` is one candidate; another welding photo that reads better at 1200×630 thumbnail size is also acceptable. Visual choice during Unit 3.
- **OG cache invalidation post-deploy** — after deploy lands, manually hit Facebook's Sharing Debugger and LinkedIn Post Inspector to refresh preview caches for `https://exactwelds.com/`, `/services`, `/quote`. Document as a runbook step in the PR description; not an automated step in this plan.

## Implementation Units

Dependency graph:

```
Unit 1 (env var infra) ──→ Unit 2 (runtime refs) ──┐
                                                    ├─→ Unit 4 (cleanup) ──→ Unit 6 (validator)
Unit 3 (og asset) ─────────────────────────────────┤
                                                    │
Unit 5 (redirect + build script) ──────────────────┘
```

**Parallelizable batches:**
- **Batch A:** Unit 1 + Unit 3 + Unit 5 (no overlap; Unit 5 is fully independent)
- **Batch B:** Unit 2 (after Unit 1)
- **Batch C:** Unit 4 (after Units 2, 3, 5)
- **Batch D:** Unit 6 (after Unit 4 — must run after the corrupt file is gone; also depends on Unit 3 for the og-image.jpg presence assertion, and Unit 5 for the simplified build script that won't wipe `_redirects`)

---

- [ ] **Unit 1: Add `VITE_SITE_URL` env var infrastructure**

**Goal:** Introduce `VITE_SITE_URL` env var, a Vite plugin to substitute `%VITE_SITE_URL%` into `index.html`, and the production-mode-required guard. Establishes the env-loading invariant the rest of the plan depends on.

**Requirements:** R6, R7

**Dependencies:** None. Parallelizable with Unit 3.

**Files:**
- Modify: `.env.example` — add `VITE_SITE_URL=https://exactwelds.com` (with comment explaining production-required, dev-fallback semantics)
- Modify: `vite.config.ts` — extend the existing `defineConfig(({mode}) => { const env = loadEnv(mode, '.', ''); … })` to include a small inline plugin that uses `transformIndexHtml` and the production-mode required-env guard
- Modify: `index.html` — add a baseline set of social/SEO meta tags inside `<head>`. The image and URL tokens are substituted at build time via `%VITE_SITE_URL%`; titles and descriptions are static literals (generic, site-level — implementer picks the exact copy):
    - `<meta name="description" content="Mobile welding services in Toledo, OH. Truck repair, custom fabrication, and on-site structural welding by Exact Welds." />`
    - `<meta property="og:type" content="website" />`
    - `<meta property="og:url" content="%VITE_SITE_URL%" />`
    - `<meta property="og:title" content="Exact Welds | Mobile Welding Toledo, OH" />`
    - `<meta property="og:description" content="Mobile welding services in Toledo, OH. Truck repair, custom fabrication, and on-site structural welding." />`
    - `<meta property="og:image" content="%VITE_SITE_URL%/og-image.jpg" />`
    - `<meta name="twitter:card" content="summary_large_image" />`
    - `<meta name="twitter:title" content="Exact Welds | Mobile Welding Toledo, OH" />`
    - `<meta name="twitter:description" content="Mobile welding services in Toledo, OH. Truck repair, custom fabrication, and on-site structural welding." />`
    - `<meta name="twitter:image" content="%VITE_SITE_URL%/og-image.jpg" />`
    - **Note:** SeoHead.tsx will continue to emit per-route `<title>`, `<meta name="description">`, `og:title`, `og:description`, `twitter:title`, and `twitter:description` via `react-helmet-async`. Per the OG spec (first-match wins) and the static-tag-first DOM order, crawlers see the static (generic) values for the social meta. JS-enabled browsers and devtools see helmet's per-route values overlaid in the runtime DOM. Cleaning up SeoHead.tsx's now-dead-for-crawlers OG emissions is a small follow-up; not in scope here.

**Approach:**
- **Vite natively replaces `%VITE_*%` tokens in `index.html`** for any `VITE_`-prefixed env var loaded from `.env*` files (since Vite 2.7). No custom `transformIndexHtml` hook is required for the substitution itself — placing `%VITE_SITE_URL%` in `index.html` and setting `VITE_SITE_URL` in `.env.local` or `.env.production` is sufficient.
- The plugin's only responsibility is the **production-mode required-env guard.** Use a `configResolved` (or `config`) hook that:
    - Reads both `process.env.VITE_SITE_URL` and the result of `loadEnv(mode, '.', '')` (the latter only sees `.env*` files; CI shell vars are only in `process.env`)
    - If `mode === 'production'` and the resolved value is missing/empty → call `this.error('VITE_SITE_URL is required for production builds; set it in .env.local, .env.production, or your CI environment')` (cleaner Vite-formatted error than `throw new Error`). If `this.error` is unavailable in the chosen hook, `throw` is acceptable.
    - In dev mode (`mode === 'development'`), if unset, write `VITE_SITE_URL=http://localhost:3000` into `process.env` (or update the loaded env) so both the HTML token replacement and `import.meta.env` reads pick up the same value.
- Verify with a `vite dev` smoke test that the served `index.html` has the substituted URL (Vite's HTML token replacement runs in dev too).

**Patterns to follow:**
- Existing `loadEnv` usage in `vite.config.ts` — reuse the same call; don't duplicate it.
- Vite's plugin shape (object with `name`, optional `transformIndexHtml`, optional `config`). Keep the plugin inline in `vite.config.ts`; no external file.

**Test scenarios:**
- *Happy path (dev):* `bun run dev` with `.env.local` containing `VITE_SITE_URL=https://exactwelds.com` → server starts; visiting `http://localhost:3000` and viewing source shows `<meta property="og:image" content="https://exactwelds.com/og-image.jpg">`.
- *Happy path (build):* `bun run build` with `.env.local` set → `dist/index.html` contains the substituted production URL, no `%VITE_SITE_URL%` tokens remain.
- *Error path (prod, missing env):* `bun run build` with `VITE_SITE_URL` unset → fails fast with the documented error message.
- *Edge case (prod, empty env):* `VITE_SITE_URL=` (empty) → fails with the same error message.
- *Dev fallback:* `bun run dev` with no `.env.local` → server starts; `og:image` shows `http://localhost:3000/og-image.jpg`.

**Verification:**
- All five scenarios above pass when run manually.
- `git grep "%VITE_SITE_URL%"` shows the token in `index.html` only.

---

- [ ] **Unit 2: Update runtime OG references in source code**

**Goal:** Replace literal hardcoded URLs in `schema.ts` and `SeoHead.tsx` with `import.meta.env.VITE_SITE_URL`, and change `SeoHead`'s contract so it doesn't double-emit `og:image` / `twitter:image` on top of the static `index.html` tag.

**Requirements:** R5, R6

**Dependencies:** Unit 1 (env var must be defined and substituted in build)

**Files:**
- Modify: `src/lib/schema.ts` — replace line 11's literal `https://exactwelds.com/gallery/hero.jpg` with a template-literal using `import.meta.env.VITE_SITE_URL` and the new `/og-image.jpg` path; replace line 14's `"url": "https://exactwelds.com"` with the env var value.
- Modify: `src/components/seo/SeoHead.tsx`:
    - Line 15: change `canonical = 'https://exactwelds.com'` default to `canonical = import.meta.env.VITE_SITE_URL`
    - Line 19: remove the `finalOgImage = ogImage || …` line entirely
    - Inside the `<Helmet>` JSX: only render `<meta property="og:image" …>` and `<meta name="twitter:image" …>` when `ogImage` is truthy. When `ogImage` is undefined/empty, emit no og:image/twitter:image at all — the static `index.html` baseline (Unit 1) is the canonical default for crawlers and hydrated browsers alike.

**Approach:**
- Vite inlines `import.meta.env.VITE_SITE_URL` at build time as a string constant. No runtime fetch.
- Existing `<SeoHead>` callers in 7 routes (`Home.tsx`, `Services.tsx`, `Work.tsx`, `Quote.tsx`, `About.tsx`, `Reviews.tsx`, `Faq.tsx`) do not pass `ogImage` today. After this change, all 7 routes rely on the static `index.html` baseline for OG image — exactly the desired behavior for JS-disabled crawlers.
- TypeScript strict: `import.meta.env.VITE_SITE_URL` is typed as `string | undefined` by Vite's default `ImportMetaEnv`. **Use a `?? 'http://localhost:3000'` fallback at the read site** rather than augmenting `vite-env.d.ts` to claim the var is non-optional. Rationale: the production build guard from Unit 1 enforces presence at build time, but in dev mode (or any context where the build skips the guard), the env can legitimately be undefined; a TypeScript augmentation would mask that and produce literal `"undefined"` strings in URLs at runtime. The `??` is explicit and self-documenting:
    - `src/components/seo/SeoHead.tsx`: `canonical = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000'`
    - `src/lib/schema.ts`: `const siteUrl = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000';` then use `\`${siteUrl}/og-image.jpg\`` and `siteUrl` as the `"url"` value.
- Do **not** modify `src/vite-env.d.ts`. Keep `VITE_SITE_URL` typed as the default `string | undefined`.

**Patterns to follow:**
- Existing `vite-env.d.ts` is a one-liner referencing `vite/client`; the augmentation pattern is well-documented in Vite docs.
- No changes to the `Helmet` import or the JSX shape outside the og/twitter meta tags.

**Test scenarios:**
- *Happy path (any route):* After build, the rendered HTML head contains exactly one `<meta property="og:image">` (the static one from Unit 1) and one `<meta name="twitter:image">`. None of the 7 current routes emit additional `og:image` tags via Helmet since none pass `ogImage`.
- *Type check:* `bun run lint` (`tsc --noEmit`) passes; `import.meta.env.VITE_SITE_URL` reads compile cleanly with the `??` fallback.
- *Dev mode without env:* `bun run dev` with no `.env.local` → home route's `<link rel="canonical">` shows `http://localhost:3000` (from the `??` fallback); JSON-LD `"url"` and OG image URL both use `http://localhost:3000`.
- *Grep verification:* `git grep -E "https?://exactwelds\.com" src/` returns only `src/content/nap.ts:5` (`zack@exactwelds.com` email — intentional data, not a URL).
- *Note on per-route OG override:* The plan does **not** support per-route `og:image` customization via `<SeoHead ogImage=…>` because the static `index.html` tag appears first in the DOM and OG crawlers use the first match (per the Open Graph spec). Per-route OG is structurally blocked until SSR/prerender lands; see the deferred follow-up in Scope Boundaries.

**Verification:**
- All four scenarios above pass.
- Visiting any of the 7 routes in dev and inspecting `<head>` shows exactly one `og:image` tag.
- `bun run lint` succeeds.

---

- [ ] **Unit 3: Add `public/og-image.jpg`**

**Goal:** Create the purpose-built social-share image at the stable URL anchor.

**Requirements:** R4

**Dependencies:** None. Parallelizable with Unit 1.

**Files:**
- Create: `public/og-image.jpg` — a 1200×630 JPEG, ≤300 KB, derived from `src/assets/gallery/hero.jpg` or another representative welding shot.

**Approach:**
- The `sharp` npm package is a Node library, **not** a CLI — there is no `sharp` shell command. Use a one-shot Node script. Two options:
    1. **Inline one-liner** (preferred — no new files): `bun --eval "import('sharp').then(s => s.default('src/assets/gallery/hero.jpg').resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toFile('public/og-image.jpg'))"` — adjust the quality (60–85) until output lands in 200–300 KB range.
    2. **Throwaway script** (if the one-liner is awkward): create `scripts/generate-og-image.ts`, run with `bunx tsx scripts/generate-og-image.ts`, then delete the script after the asset is committed. The Unit 6 validator covers ongoing checks; this script is one-time.
- The image should communicate "mobile welding in Toledo" at thumbnail size — readable at ~500 px wide on a phone Messenger preview. If the existing hero doesn't reduce well, choose a different welding photo that does.
- Add `sharp` to `devDependencies` first (`bun add -d sharp`) so the import resolves cleanly. (Sharp 0.34.x is already in the lockfile as a transitive of `miniflare`, but transitive deps aren't contractual — declaring it directly is required.)
- Commit only the produced JPEG; do not commit a build pipeline for it (vite-imagetools is explicitly out of scope).

**Patterns to follow:**
- None applicable (one-time asset creation).

**Test expectation:** none — asset creation. The validator in Unit 6 verifies presence, size, and dimensions automatically once it lands.

**Verification:**
- `file public/og-image.jpg` reports JPEG.
- `sharp public/og-image.jpg --metadata` (or any image-info tool) reports 1200×630 ±5% (1140–1260 wide, 599–661 tall).
- `wc -c < public/og-image.jpg` ≤ 307200 bytes (300 KB).
- Visually, the file communicates the business at thumbnail size — confirmed by the implementer.

---

- [ ] **Unit 4: Asset cleanup — delete duplicates, placeholders, orphans, obsolete scripts**

**Goal:** Remove `public/gallery/` entirely, delete the 7 unused placeholder images from `src/assets/gallery/` (including the corrupt one), and delete the orphan repo-root files (`welding2.jpg`, `check-images.ts`).

**Requirements:** R1, R2, R3, R8 (R1 and R2 are invariants this unit enforces — `src/assets/gallery/` becomes the sole image directory; `public/` retains only stable-URL files)

**Dependencies:** Units 1, 2, 3 (the new OG path must be live and tested before deleting `public/gallery/hero.jpg`)

**Files:**
- Delete: `public/gallery/` (entire directory, 20 files)
- Delete: `src/assets/gallery/aluminum-placeholder.jpg`
- Delete: `src/assets/gallery/blueprint-placeholder.jpg`
- Delete: `src/assets/gallery/cutting-placeholder.jpg`
- Delete: `src/assets/gallery/drilling-placeholder.jpg`
- Delete: `src/assets/gallery/equipment-placeholder.jpg`
- Delete: `src/assets/gallery/metal-gate-placeholder.jpg` (the corrupt HTML file)
- Delete: `src/assets/gallery/metal-gate-placeholder2.jpg` (decodable but unused)
- Delete: `welding2.jpg` (3.0 MB orphan at repo root)
- Delete: `check-images.ts` (manual HTTP probe; obviated by Unit 6's validator)

**Approach:**
- Use `git rm -r public/gallery` for the directory; `git rm` for individual files.
- Single commit acceptable; or split if reviewers prefer per-category commits.
- **`welding2.jpg` and `check-images.ts` are deliberately included** despite both being listed in the broader "repo identity reset" inventory (ideation Idea #6). Justification: they shape-match this plan's scope. `welding2.jpg` is a 3 MB image at the wrong location — same bug class as the placeholder images this plan deletes (R8). `check-images.ts` is an obsolete image-health script, directly obviated by Unit 6's validator. Both are image-pipeline artifacts. Other Idea #6 items (`untitled.tsx` zero-byte source file; `fetch-*.ts`, `debug-cf.ts`, `test-*.ts` Node debug scripts; `metadata.json` AI Studio scaffold leftover; README rewrite; `@/*` alias fix) are non-image source/code artifacts and remain out of scope here.

**Patterns to follow:**
- None applicable (deletions only).

**Test expectation:** none — file deletions verified by success-criteria greps and a clean `bun run build`.

**Verification:**
- `find public -type d -name gallery` returns nothing.
- `find src/assets -name "*-placeholder*"` returns nothing.
- `ls welding2.jpg check-images.ts` returns "No such file or directory" for both.
- `bun run dev` starts without import errors on any of the 7 routes.
- `bun run build` succeeds with `.env.local` set; `dist/og-image.jpg` exists; `dist/gallery/` does not exist.
- All 7 routes render in dev without broken images on the gallery and hero sections.

---

- [ ] **Unit 5: Legacy URL redirect + build script cleanup**

**Goal:** Preserve already-cached share previews of `/gallery/hero.jpg` by 301-redirecting to `/og-image.jpg`, and clean up the build script's defensive prelude that would otherwise wipe the redirect file.

**Requirements:** R12

**Dependencies:** None — Unit 5 only modifies `package.json` and creates `public/_redirects`; it does not depend on Unit 1's env-var infrastructure. Can run in parallel with any other unit.

**Files:**
- Create: `public/_redirects` with content: `/gallery/hero.jpg /og-image.jpg 301`
- Modify: `package.json` — change `scripts.build` from:
    ```
    "rm -rf node_modules/.vite node_modules/.cache && vite build && rm -f dist/_redirects public/_redirects"
    ```
    to:
    ```
    "vite build"
    ```

**Approach:**
- Cloudflare Workers static-asset bundler honors `_redirects` syntax (Pages-style: `<from> <to> <status>`, one rule per line).
- The `rm -rf node_modules/.vite node_modules/.cache` was speculative cache invalidation; Vite's cache invalidation works correctly without it. Removing speeds up every build.
- The `rm -f dist/_redirects public/_redirects` was defensive dead code from an apparent Cloudflare Pages → Workers migration. With the modern Workers `assets` config (`not_found_handling: "single-page-application"`), `_redirects` from `public/` is a valid and load-bearing file.

**Patterns to follow:**
- Cloudflare Pages/Workers `_redirects` file format. One rule per line. Status codes: 301 (permanent) for retiring URLs; 302 (temporary) for short-term moves. Use 301 here — `/gallery/hero.jpg` is going away permanently.

**Test expectation:** none for the file itself (config). Manual verification post-deploy.

**Verification:**
- `bun run build` produces a `_redirects` file at the **root of the assets directory that `@cloudflare/vite-plugin` outputs**. Locate it (likely `dist/_redirects`, but verify — the plugin auto-configures the assets directory, and the output path is not in `wrangler.jsonc`). If the file ends up at `dist/client/_redirects` or some other nested path, the plan needs to adjust (see Risks).
- Before removing the existing `rm -f dist/_redirects public/_redirects` from the build script, run one build with those `rm -f` lines temporarily commented out and inspect what `vite build` produces in `dist/`. If the plugin generates an empty or pre-populated `dist/_redirects` of its own, design a merge strategy (append the redirect rule rather than overwrite) instead of relying on Vite's `public/` copy to win.
- After deploy: `curl -I https://exactwelds.com/gallery/hero.jpg` returns `HTTP/2 301` with `location: /og-image.jpg` (or the absolute equivalent).
- After redirect, `curl -I https://exactwelds.com/og-image.jpg` returns `HTTP/2 200` with `content-type: image/jpeg`.
- Build time on a clean machine is measurably faster than the previous build script (informal — no benchmark required).

---

- [ ] **Unit 6: Build-time image validator (R9–R11)**

**Goal:** Prevent corrupt or oversized images from ever shipping. Add a `prebuild` script that fails the build if any file under `src/assets/**` or `public/**` matching image extensions is undecodable, and that asserts `public/og-image.jpg` is present, ≤300 KB, dimensions 1200×630 ±5%.

**Requirements:** R9, R10, R11

**Dependencies:** Unit 3 (the OG image must exist before the validator's R10 assertion can pass) and Unit 4 (the corrupt `metal-gate-placeholder.jpg` must be deleted first; otherwise the prebuild fails on its first run). Unit 5 should also land first — wiring the `prebuild` hook before the build script's `rm -f public/_redirects` is removed would let the old script delete the `_redirects` file Unit 5 just created.

**Files:**
- Create: `scripts/validate-images.ts`
- Modify: `package.json`:
    - Add `"sharp": "^0.34.5"` (or current major) to `devDependencies`. (Sharp is in the lockfile as a transitive of `miniflare`, but a direct declaration is required since transitive deps aren't contractual.)
    - Add `"prebuild": "tsx scripts/validate-images.ts"` to `scripts`. The `prebuild` lifecycle hook is honored by both `bun run build` (used directly) and `npm run build` (used inside `scripts.preview` and `scripts.deploy`), so the validator runs in all build contexts.
- Modify: `tsconfig.json` — add `"scripts"` to the `include` array (currently `["src"]`) so `bun run lint` (`tsc --noEmit`) covers `scripts/validate-images.ts`. Without this change, type errors in the validator script are not caught by lint.

**Approach:**
- Use `tsx` (already a devDep) to run TypeScript directly.
- Use `node:fs/promises` and `node:path` for the directory walk; no glob library needed.
- Use `sharp(file).metadata()` to validate each image. Catch any throw; on error, log the file path and reason, then `process.exit(1)` after collecting all failures (so the implementer sees every problem in one run, not one-at-a-time).
- For `public/og-image.jpg` specifically: assert presence, `stat().size <= 300 * 1024`, dimensions in `[1140, 1260] × [599, 661]`. Fail with a clear message naming the actual values when off.
- Output should be readable: list each validated file with a tick/cross, then summary count. Exit 0 on all-pass; 1 on any fail.
- Keep the script under ~80 lines. No abstractions for "future" use cases.

**Execution note:** Write the validator's failure paths first — drop a known-corrupt file, a known-oversized file, and a known-wrong-dim file into a tmp directory, run the validator against the tmp tree, confirm each failure is reported correctly. Only then wire the `prebuild` hook into `package.json`.

**Patterns to follow:**
- None in repo. The script is a new artifact; the toolchain is bun + tsx + sharp.

**Test scenarios:**
- *Happy path:* All current images valid + `og-image.jpg` matches spec → `tsx scripts/validate-images.ts` exits 0; `bun run build` proceeds.
- *Edge case:* `src/assets/` empty (hypothetical) → script exits 0 with "no images to validate" message.
- *Error path — missing OG file:* delete `public/og-image.jpg`, run script → exits 1 with message naming `public/og-image.jpg` as missing.
- *Error path — oversized OG:* swap in a 500 KB JPEG → exits 1 with message including actual size in bytes.
- *Error path — wrong dimensions:* swap in a 1920×1080 JPEG → exits 1 with message including actual dimensions.
- *Error path — corrupt file:* drop a file with `.jpg` extension but HTML content (e.g., `echo '<html></html>' > src/assets/gallery/test-corrupt.jpg`) → exits 1 with message naming the file as undecodable.
- *Multiple failures:* introduce two of the above at once → script reports both failures, exits 1 (does not stop at first failure).

**Verification:**
- All seven scenarios above pass when run manually.
- `bun run build` succeeds end-to-end with the validator wired in (corrupt file already deleted in Unit 4).
- The validator script is the only image-validation tool in the repo — `check-images.ts` was deleted in Unit 4.

## System-Wide Impact

- **Interaction graph:**
    - `<SeoHead>` is rendered on every route via React Router. All 7 routes invoke it. After Unit 2, no route emits `og:image` or `twitter:image` via Helmet (since none pass an explicit `ogImage` prop). The static `index.html` tag is the sole `og:image` for every route. **Per-route OG override is structurally not supported in this design** — adding `<SeoHead ogImage=…>` to a route would produce two `og:image` tags in the DOM (static first, helmet second), and OG crawlers use the first match per spec, so the static fallback always wins. Per-route OG is genuinely blocked until SSR/prerender lands; see Scope Boundaries.
    - Vite's native `%VITE_*%` HTML token replacement substitutes `%VITE_SITE_URL%` in `index.html` at both `vite dev` and `vite build`. The custom Vite plugin from Unit 1 only enforces the production-required guard.
    - The `prebuild` script from Unit 6 runs as part of `bun run build` AND `npm run build`'s lifecycle (npm 7+ honors `prebuild`/`postbuild` hooks; bun does too). Validator failure halts the build pipeline before `vite build` runs.
- **Error propagation:**
    - Production-build env-var miss → Vite plugin throws in `config` hook → `vite build` exits non-zero → `bun run build` exits non-zero.
    - Validator detects bad image → script `process.exit(1)` → `bun run build` exits non-zero before reaching `vite build`.
    - SeoHead ogImage absent + index.html static missing → would result in zero og:image meta on all routes. Mitigated by the static tag being part of Unit 1's index.html change, never independently optional.
- **State lifecycle risks:** None. All operations are deterministic file ops or build-time substitutions.
- **API surface parity:** `<SeoHead>`'s `ogImage` prop semantics change (was: emit fallback when absent. Now: emit nothing when absent, relying on static tag). All 7 current callers behave identically since none pass `ogImage`. Future callers must understand the new contract — document it in the JSDoc above the `SeoHead` component.
- **Integration coverage:** No automated tests exist in this repo (no test runner). Verification relies on:
    - `bun run lint` (`tsc --noEmit`) for type correctness.
    - Manual smoke test in dev: visit each of the 7 routes, inspect `<head>` for exactly one og:image.
    - Manual smoke test in built output: `bun run build && grep og:image dist/index.html` shows the substituted production URL.
    - Post-deploy: Facebook Sharing Debugger and Twitter Card Validator on home, services, quote URLs.
    - Post-deploy: `curl -I https://exactwelds.com/gallery/hero.jpg` returns 301 to `/og-image.jpg`.
- **Unchanged invariants:**
    - The `<SeoHead>` component's title, description, canonical, and JSON-LD behaviors are unchanged.
    - Per-route navigation, routing, and component rendering are unchanged.
    - Gallery imports in `src/content/gallery.ts` and `src/content/services.ts` remain ESM imports from `src/assets/gallery/` (Vite-hashed). No imports change.
    - The 13 actively imported gallery images (`hero.jpg`, `img-marine-dock.jpg`, `img-damaged-bumper.jpg`, `img-aluminum-fabrication.jpg`, `img-handrail.jpg`, `img-truck-bumper-repaired.jpg`, `img-plate-weld-1.jpg`, `img-plate-weld-2.jpg`, `img-propane-racks.jpg`, `img-skid-steer.jpg`, `img-stainless-steel.jpg`, `img-service-01.webp`, `img-service-02.webp`) all survive Unit 4.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Vite plugin's `transformIndexHtml` may not run during `vite dev` for the served `index.html` if hook ordering is off | Smoke test `bun run dev` after Unit 1; verify the served HTML at `http://localhost:3000` has the substituted URL. If broken, set `enforce: 'pre'` or move the hook into the `transformIndexHtml: { order: 'pre', handler: … }` shape. |
| Cloudflare Workers may handle `_redirects` differently from Cloudflare Pages | Cloudflare's docs explicitly cover `_redirects` for Workers static assets; verify post-deploy with `curl -I` per Unit 5 verification. If Workers ignores it, fallback is a Worker route handler — out of scope unless verification fails. |
| Existing OG meta cached by Facebook/LinkedIn/Slack will continue showing the old (or no) preview until manually re-scraped | Document a runbook step in the PR description: hit Facebook Sharing Debugger and LinkedIn Post Inspector after deploy. Not automated. |
| `sharp` install on bun (vs npm) for the developer machine | `sharp` ships prebuilt binaries for darwin-x64, darwin-arm64, linux-x64, linux-arm64; bun resolves npm packages cleanly. If install fails, the implementer can manually `bun install --no-cache sharp`. |
| OG image visual quality (subjective) | Implementer's call during Unit 3. Confirm legibility at 500 px width on a phone preview before committing. |
| Type augmentation of `ImportMetaEnv` may conflict with Vite's built-in types | The augmentation pattern is documented in Vite's docs; conflicts are rare and surface immediately as `tsc` errors. Resolve by running `bun run lint` after Unit 2's edit. |

## Documentation / Operational Notes

- **Post-deploy runbook (committed to the repo, not just the PR description).** Create `docs/runbooks/post-deploy.md` as part of Unit 5 with the following content. Also include a one-line `postdeploy` script in `package.json` that prints "See docs/runbooks/post-deploy.md for required post-deploy verification steps" — `wrangler deploy` doesn't trigger npm lifecycle hooks, so this is a printed reminder, not an automated step.
    1. After merge + deploy, open Facebook Sharing Debugger (`developers.facebook.com/tools/debug/`) and "Scrape Again" each of: `https://exactwelds.com/`, `https://exactwelds.com/services`, `https://exactwelds.com/quote`.
    2. Open LinkedIn Post Inspector (`linkedin.com/post-inspector/`) and re-scrape the same URLs.
    3. `curl -I https://exactwelds.com/gallery/hero.jpg` — confirm `301` to `/og-image.jpg`.
    4. `curl -I https://exactwelds.com/og-image.jpg` — confirm `200` and `content-type: image/jpeg`.
- **`VITE_SITE_URL` deployment topology.** Vite inlines `import.meta.env.VITE_SITE_URL` at **build time**, not runtime. This means the value baked into `dist/index.html` and the JS bundle is whatever is in the build environment when `vite build` runs. **`VITE_SITE_URL` must live in `.env.local`/`.env.production` on the developer's machine (or as a build-time CI secret if CI is ever added) — NOT in the Cloudflare dashboard's runtime environment-variable settings.** Cloudflare dashboard env vars are runtime values for the Worker, never seen by Vite at build time. The `.env.example` documents this distinction.
- **Lighthouse follow-up** (optional, deferred to ideation Idea #5): once Lighthouse CI lands, add a budget assertion that no image asset exceeds 500 KB. Until then, the validator from Unit 6 enforces the OG image's size cap directly.

## Sources & References

- **Origin document:** `docs/brainstorms/2026-04-26-image-pipeline-cleanup-requirements.md`
- **Ideation document:** `docs/ideation/2026-04-26-cleanup-ideation.md` (Idea #1, Idea #2, Idea #4)
- Related code:
    - `src/components/seo/SeoHead.tsx`
    - `src/lib/schema.ts`
    - `src/content/gallery.ts`, `src/content/services.ts`
    - `vite.config.ts`, `wrangler.jsonc`, `index.html`, `package.json`, `.env.example`
- External docs:
    - Cloudflare Workers static-asset redirects: `developers.cloudflare.com/workers/static-assets/redirects`
    - Vite `transformIndexHtml`: `vitejs.dev/guide/api-plugin.html#transformindexhtml`
    - Open Graph image specs: `developers.facebook.com/docs/sharing/webmasters/images`

---
date: 2026-04-26
topic: cleanup
focus: dead code, dead assets, broken images
---

# Ideation: Dead Code, Dead Assets, Broken Images

## Codebase Context

**Project shape.** Vite 6 + React 19 + TypeScript + Tailwind 4 + react-router-dom v7. Deploys to Cloudflare Workers (SPA mode via `@cloudflare/vite-plugin` + wrangler). Marketing site for Exact Welds (Toledo). Solo developer. ~20 components, no tests, no CI gates beyond local `tsc --noEmit`. Originally scaffolded by Google AI Studio.

**Confirmed dead assets.**
- `welding2.jpg` — 3.0 MB orphan at repo root (reportedly deleted in commit `2d33479`, then resurrected).
- `untitled.tsx` — 0 bytes at repo root.
- `metadata.json` — AI Studio scaffold leftover (`"Millers updated site / newest update"`).
- 7 unused placeholder images in `src/assets/gallery/` (~1.6 MB): `aluminum-placeholder.jpg`, `blueprint-placeholder.jpg`, `cutting-placeholder.jpg`, `drilling-placeholder.jpg`, `equipment-placeholder.jpg`, `metal-gate-placeholder.jpg`, `metal-gate-placeholder2.jpg`.
- `src/assets/gallery/metal-gate-placeholder.jpg` is **not an image** — it's a Wikimedia HTML error page renamed `.jpg` (confirmed via `file(1)`).
- `public/gallery/*` is a 100% byte-for-byte duplicate of `src/assets/gallery/*` (20 files, ~5 MB). Code imports gallery images via ESM from `src/assets/gallery/`; only `hero.jpg` is load-bearing in `public/` because of the hardcoded OG URL.
- `public/gallery/hero.jpg` is 1.9 MB — oversized for an OG/social image (recommended ≤300 KB at 1200×630).

**Confirmed dead code.**
- 9 top-level debug scripts: `check-images.ts`, `debug-cf.ts`, `fetch.ts`, `fetch-all.ts`, `fetch-cache.ts`, `fetch-html.ts`, `fetch-js.ts`, `test-dev.ts`, `test-proxy.ts`. None referenced in `package.json scripts`. All hit a personal `cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev` URL.
- Orphan components: `src/components/layout/SectionDivider.tsx`, `src/components/ui/SpecPlate.tsx` (zero imports).
- Unused dependencies: `@google/genai`, `express`, `@types/express`, `dotenv`, `motion` (zero imports in `src/`).

**Brittle / broken patterns.**
- Hardcoded `https://exactwelds.com/gallery/hero.jpg` as OG image in `src/lib/schema.ts:11` and `src/components/seo/SeoHead.tsx:19` — invisibly couples to domain + public path + a 1.9 MB file that was never sized for social.
- `tsconfig.json` `paths: { "@/*": ["./*"] }` aliases to repo root, not `src/`. Footgun: `@/welding2.jpg` would import the 3 MB orphan.
- `vite.config.ts` resolve.alias `'@': path.resolve(__dirname, '.')` mirrors the same pointer-at-the-trash-heap problem.
- Build script: `rm -rf node_modules/.vite node_modules/.cache && vite build && rm -f dist/_redirects public/_redirects` — defensive code against problems that no longer exist (no `_redirects` file in `public/`; Wrangler config already declares SPA fallback).
- README still references AI Studio scaffolding, the original AI Studio app URL, and `GEMINI_API_KEY` setup. `vite.config.ts` has a `DISABLE_HMR` env-var dance with the comment "HMR is disabled in AI Studio."
- Two lockfiles fighting: `package-lock.json` (npm) committed alongside Bun toolchain; build/preview/deploy scripts call `npm run build` mid-pipeline.
- Git history shows recurrent broken-image churn (commits `ba6718d`, `551b07a`, `2dc2e9d`, `aa986ca`) and prior cleanup commits (`037233f`, `b0ba0d3`, `e1fd71d`) that did not stop rot from coming back.
- No tests, no `docs/`, no automated dead-code or broken-image gates.

## Ranked Ideas

### 1. Delete `public/gallery/` duplication; `src/assets/gallery/` becomes the only image source of truth
**Description:** Remove all 20 duplicated files in `public/gallery/`. The codebase already imports every gallery image via ESM from `src/assets/gallery/` (Vite hashes them in build). Only `hero.jpg` is load-bearing in `public/` because of the hardcoded OG URL — that's handled in idea #2.
**Rationale:** Eliminates ~5 MB of duplicated bytes and the structural reason images drift / corrupt silently in two places. Both copies of `metal-gate-placeholder.jpg` are HTML files masquerading as JPEG — the duplication doubled the surface area for that exact bug.
**Downsides:** Need to verify Wrangler SPA fallback still serves the bundled assets (it does — `not_found_handling: "single-page-application"` + Vite hashed `dist/assets/` already cover this).
**Confidence:** 90%
**Complexity:** Low
**Status:** Explored

### 2. Decouple and right-size the OG image
**Description:** Replace the literal `https://exactwelds.com/gallery/hero.jpg` in `src/lib/schema.ts:11` and `src/components/seo/SeoHead.tsx:19` with a build-emitted import (or a single purpose-built `og-image.jpg` resized to 1200×630, ~250 KB) plus a `VITE_SITE_URL` env var. The current 1.9 MB hero.jpg is too large for OG/social.
**Rationale:** The hardcoded URL silently couples the site to a specific domain and a specific public path; rename or move the file and OG breaks invisibly across Facebook/Twitter for weeks. Right-sizing also fixes a real perf bug.
**Downsides:** Social platforms cache OG images; URL strategy needs to stay stable across deploys (Vite's hashed filenames would force a re-fetch each deploy, which can be either a bug or a feature depending on cadence).
**Confidence:** 80%
**Complexity:** Low–Medium
**Status:** Unexplored

### 3. Adopt `knip` as the dead-code gate, replacing the `tsc --noEmit` lint script
**Description:** Add `knip` with a small config listing entry points (`index.html`, `src/main.tsx`, `vite.config.ts`, `wrangler.jsonc`) and wire to `package.json scripts.lint` (or replace with `tsc --noEmit && knip`). Catches unused files, exports, and dependencies in one shot.
**Rationale:** `tsc --noEmit` doesn't catch dead code or unused deps. Today's repo has `SectionDivider.tsx`, `SpecPlate.tsx`, `untitled.tsx`, and 5 unused deps (`@google/genai`, `express`, `@types/express`, `dotenv`, `motion`) — knip surfaces all of them. This is the leverage move that prevents the next manual cleanup pass.
**Downsides:** First run will need a baseline / config tweaks (knip flags genuine entry points as "unused" if you forget to declare them). One-time cost.
**Confidence:** 85%
**Complexity:** Low
**Status:** Unexplored

### 4. Add a build-time image validation gate
**Description:** Pre-build script (~10 lines, `sharp().metadata()` or `file(1)` magic-byte check) that walks `src/assets/**/*.{jpg,jpeg,png,webp}` and fails the build if any file isn't a decodable image. Wire as `prebuild` in `package.json`.
**Rationale:** `src/assets/gallery/metal-gate-placeholder.jpg` is literally an HTML page from Wikimedia; this kind of corruption recurs across the git history (commits `ba6718d`, `551b07a`, `2dc2e9d`, `aa986ca`). Magic-byte validation turns a "renders broken in prod" bug into a build failure that can't ship.
**Downsides:** Fails on intentional non-image files in the assets tree (mitigated by scoping the glob narrowly).
**Confidence:** 90%
**Complexity:** Low
**Status:** Unexplored

### 5. Lighthouse CI with budgets for image bytes and broken resources
**Description:** One `.github/workflows/lhci.yml` running `@lhci/cli autorun` against the built SPA on each PR, with assertions on `resource-summary:image:size` and a non-200 resource budget. Catches oversized hero, corrupt placeholders, and any `<img>` 404 in production-like conditions.
**Rationale:** Solo dev with no team to enforce vigilance. An external automated reviewer catches what manual review misses, and SEO/perf is the whole point of a marketing site. Compounds because budgets only get tighter.
**Downsides:** Adds CI infra to a small repo; Lighthouse runs are slow (~30s); can be flaky on cold workers.
**Confidence:** 65%
**Complexity:** Medium
**Status:** Unexplored

### 6. Reset the repo's identity: rewrite README, fix `@/*` alias, simplify build script, delete AI Studio scaffold
**Description:** A single "stop lying about yourself" pass:
- Rewrite `README.md` as a 20-line invariants doc (Bun, Cloudflare Workers, images live in `src/assets/`, no top-level scripts).
- Delete `metadata.json`, `untitled.tsx`, `welding2.jpg`, all 9 root-level debug scripts, and the `DISABLE_HMR` block in `vite.config.ts`.
- Change `tsconfig.json` `paths: { "@/*": ["./*"] }` and `vite.config.ts` resolve.alias to point at `./src/*`.
- Simplify the build script to just `vite build` (drop the cache wipe and the dead `_redirects` cleanup).
- Add a tiny `.gitignore` line so root-level debug scripts can't recur (e.g., `/welding*.jpg`, `/test-*.ts`, `/fetch-*.ts`, `/debug-*.ts`, `/check-*.ts`, `/untitled.*`).

**Rationale:** Future-Justin and any AI agent reads README first and currently gets misled (Gemini API key, AI Studio URL, `npm install`). The `@/*` alias today resolves to repo root, meaning `@/welding2.jpg` would happily import the 3 MB orphan into a bundle. Five small wins that pay for themselves the first time someone (you or an agent) opens the repo cold.
**Downsides:** Largest "diff surface" of the survivors; touches lots of files even though each change is trivial. Not a single atomic concept — better to brainstorm sequencing.
**Confidence:** 90%
**Complexity:** Low
**Status:** Unexplored

## Rejection Summary

| # | Idea | Reason Rejected |
|---|------|-----------------|
| R1 | Replace gallery imports with typed `import.meta.glob` manifest | Duplicates the build-time image validation in #4; adds indirection without proportional gain |
| R2 | Adopt `vite-imagetools` + per-asset size budget | New tool/syntax for a 20-image marketing site; size budget is already covered by Lighthouse CI in #5 |
| R3 | Drop npm/`package-lock.json`, switch all scripts to `bun run` | Real drift risk but the build currently works; defer to a focused effort with its own testing |
| R4 | Standalone `.gitignore` glob for `/test-*.ts`, `/fetch-*.ts`, etc. | Folded into #6 as a one-liner; not worth a separate idea |
| R5 | Standalone "fix `@/*` alias" idea | Folded into #6; it's a 2-line change that belongs with the rest of the identity reset |
| R6 | Standalone "burn AI Studio scaffold" idea | Folded into #6 |
| R7 | Standalone "simplify build script" idea | Folded into #6 |
| R8 | Standalone "decouple OG URL via env var only" (no resize) | Subsumed into #2, which handles both decoupling and right-sizing |

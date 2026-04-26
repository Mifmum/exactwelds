# Exact Welds

Marketing site for **Exact Welds** — a mobile welder serving Toledo and Northwest Ohio. Live at [exactwelds.com](https://exactwelds.com).

Single-page React app deployed as a Cloudflare Worker. The primary CTA is `tel:` — clicking "Get a Free Quote" places a call to Zack directly. There is no quote-intake form.

## Local development

**Prerequisites:** [Bun](https://bun.sh) 1.x, Node 22+ (for `wrangler` toolchain compatibility).

```bash
bun install
cp .env.example .env.local       # then edit if needed (defaults work for dev)
bun run dev                      # http://localhost:3000
```

Dev mode falls back to `VITE_SITE_URL=http://localhost:3000` automatically. No `.env.local` is strictly required to start the server.

## Build & deploy

```bash
bun run lint                     # tsc --noEmit
bun run build                    # prebuild image validator + vite build (REQUIRES VITE_SITE_URL in production)
bun run preview                  # build, then serve via wrangler locally
bun run deploy                   # build + wrangler deploy to Cloudflare
```

**Production builds require `VITE_SITE_URL`.** Set it in `.env.local`, `.env.production`, or your shell before running `bun run build`. Vite inlines the value at build time — Cloudflare dashboard runtime env vars are NOT seen by the build. A custom Vite plugin fails the build with a clear error if the var is missing.

## Post-deploy verification

Always run the post-deploy checklist after a deploy: [`docs/runbooks/post-deploy.md`](./docs/runbooks/post-deploy.md). It covers Facebook Sharing Debugger refresh, LinkedIn Post Inspector refresh, and the OG image / legacy redirect curl checks. `bun run postdeploy` prints a reminder.

## For agents

Project-level conventions, architecture (image pipeline, OG strategy, build-time invariants), repo workflow, and lessons learned live in [`AGENTS.md`](./AGENTS.md). Claude Code reads it via `CLAUDE.md` (a one-line `@AGENTS.md` import).

Planning artifacts:

- `docs/ideation/` — open-ended idea generation (`/ce:ideate`)
- `docs/brainstorms/` — requirements documents (`/ce:brainstorm`)
- `docs/plans/` — implementation plans (`/ce:plan`)
- `docs/runbooks/` — operational checklists

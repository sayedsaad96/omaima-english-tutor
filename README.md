# Omaima Ashour — English Tutor Website

Bilingual (English LTR / Arabic RTL), mobile-first Hybrid Conversion Website for
**Omaima Ashour — English Tutor**. Converts visitors into free-assessment leads
through a short level quiz and WhatsApp-assisted booking. V1 is a marketing site,
not an LMS: no accounts, payments, dashboards, or stored learner data.

Spec: `docs/superpowers/specs/2026-09-17-omaima-english-tutor-website-design.md`
Plan: `docs/superpowers/plan/2026-09-17-omaima-english-tutor-website-implementation-plan.md`

## Design system & theming

- All colors live as CSS variables in `src/app/globals.css` (`:root` for light,
  `[data-theme="dark"]` for dark). Components must use `var(--…)` tokens —
  never hardcode theme colors.
- `text-[var(--primary-text)]` is the readable primary for body text/links in
  both modes; `bg-[var(--primary)]` stays fixed so white button text keeps its
  contrast. Fixed-white surfaces (e.g. spotlight CTAs) also keep `--primary`.
- Theme preference persists in `localStorage` (`omaima-theme`); an inline script
  included by each document root (`src/app/document-init.ts`) applies it before
  paint (no flash), defaulting to the OS color scheme. `ThemeToggle` uses
  `useSyncExternalStore` so SSR and hydration always match.
- Animations are CSS-only (`globals.css` keyframes + `Reveal` with
  `delay`/`variant` props) and fully disabled under
  `prefers-reduced-motion: reduce`.

## Tech stack

Next.js App Router · React · TypeScript · Tailwind CSS · Zod · Vitest +
React Testing Library · Playwright + axe-core · ESLint · Vercel

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000 (redirects to /en)
```

## Required environment variables

| Variable                         | Purpose                                              |
| -------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Final HTTPS production domain (canonical URLs, SEO)  |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | Omaima's verified WhatsApp number, international digits only (e.g. `2010…`) |
| `NEXT_PUBLIC_CONTACT_EMAIL`      | Optional public contact email (footer hidden when empty) |

`NEXT_PUBLIC_*` values are inlined at **build time** — set them before `npm run build`.

## Scripts

| Command            | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Start the dev server                                 |
| `npm run build`    | Production build (run before `test:e2e` with a fresh server) |
| `npm run start`    | Serve the production build                           |
| `npm run lint`     | ESLint                                               |
| `npm run typecheck`| `tsc --noEmit`                                       |
| `npm test`         | Unit + component tests (Vitest)                      |
| `npm run test:e2e` | E2E tests (Playwright, production server)            |
| `npm run verify`   | `lint && typecheck && test && build`                 |

E2E WhatsApp assertions need a number at build time:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=201111111111 npm run build
NEXT_PUBLIC_WHATSAPP_NUMBER=201111111111 npm run test:e2e
```

## Verification rig

The official check is `npm run verify` (lint → typecheck → unit → build).
CI (`.github/workflows/ci.yml`, Node 22) runs the same steps plus `test:e2e`.

Conditions that matter (Go "B07"):

- **Build-time env**: `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER`
  must be set before `npm run build` (`NEXT_PUBLIC_*` is inlined at build time).
  Locally both were set to placeholder values for the recorded green runs; CI
  sets the same placeholders in the workflow env.
- **Network access for fonts**: `next/font/google` downloads Plus Jakarta Sans
  and Tajawal at build time. The build needs internet access (or a warm
  `.next/cache`); offline builds fail with a font-fetch error.
- **Bundler**: Turbopack is the default and the official path
  (`✓ Compiled successfully`, ~1s, full static generation green). The Webpack
  override (`next build --webpack`) is *known-broken* in this environment — it
  crashes with `TypeError: Cannot read properties of undefined (reading
  'length')` inside Next's bundled `WasmHash` on Node 24.15.0. Do not switch
  engines based on this; record the failure and stay on the default.
- **Vitest pool**: default `forks` and `--pool=threads` both pass 47/47 with
  identical timing (~5.5s). No recurring flake justified a change — stay on
  `forks` for stronger isolation.
- **e2e server trap**: Playwright's `webServer` reuses a server already bound to
  port 3000. A production server holds its build in memory at startup — after
  `npm run build`, kill any stale `next start` (e.g.
  `Get-NetTCPConnection -LocalPort 3000 | Stop-Process`) or e2e silently tests
  the *previous* build. `next start` also serves only the build it loaded: never
  edit tests/state expectations before confirming the served build is current.
- **Vitest config**: `vitest.config.mts` is ESM-native and must keep avoiding
  `__dirname` — use `import.meta.dirname` — so the native config loader accepts
  it (closes the `configLoader: 'native'` warning without touching package
  module type).

## Deployment (Vercel)

1. Import the GitHub repository in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain,
   `NEXT_PUBLIC_WHATSAPP_NUMBER` to the verified number, and optionally
   `NEXT_PUBLIC_CONTACT_EMAIL`.
3. Deploy from `main` and verify:

```bash
curl -I "$PRODUCTION_URL/en"
curl -I "$PRODUCTION_URL/ar"
```

## Before public launch

See `docs/launch-checklist.md` — Omaima must sign off on portrait usage,
About-page wording, quiz content, the WhatsApp number, and any first-person
quote. Replace `public/images/omaima-*.webp` placeholders with approved photos.

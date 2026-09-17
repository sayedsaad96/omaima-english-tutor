# Omaima Ashour — English Tutor Website

Bilingual (English LTR / Arabic RTL), mobile-first Hybrid Conversion Website for
**Omaima Ashour — English Tutor**. Converts visitors into free-assessment leads
through a short level quiz and WhatsApp-assisted booking. V1 is a marketing site,
not an LMS: no accounts, payments, dashboards, or stored learner data.

Spec: `docs/superpowers/specs/2026-09-17-omaima-english-tutor-website-design.md`
Plan: `docs/superpowers/plan/2026-09-17-omaima-english-tutor-website-implementation-plan.md`

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

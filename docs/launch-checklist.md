# Launch Checklist — Omaima Ashour English Tutor Website (V1)

Date: 2026-09-17
Scope: bilingual marketing + conversion site. Not an LMS.

## 1. Automated verification (all must exit 0)

```bash
npm run lint
npm run typecheck
npm run test
npm run build
NEXT_PUBLIC_WHATSAPP_NUMBER=201111111111 NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000 npm run test:e2e
```

Note: `NEXT_PUBLIC_*` values are inlined at build time, so the E2E build must
be produced with the same number the tests assert on (dummy `201111111111` in
CI/local verification, the real verified number for the production build).

## 2. Manual checks on a real phone (record pass/fail)

- [ ] Visitor understands who Omaima teaches within seconds
- [ ] Relevant service can be found without reading the full site
- [ ] Quiz completes comfortably on mobile
- [ ] Assessment completes comfortably on mobile
- [ ] WhatsApp prefilled message is correct (name, goal, format, level)
- [ ] AR/EN switch preserves the equivalent route
- [ ] Arabic layout is genuinely RTL and readable
- [ ] Home does not feel children-only
- [ ] No fabricated testimonials or unsupported credentials are present
- [ ] Primary CTA is reachable from several points without feeling aggressive

## 3. Omaima content sign-off (explicit approval required before public launch)

- [ ] Portrait usage (`public/images/omaima-hero.webp`, `public/images/omaima-about.webp` are currently clearly-marked placeholders)
- [ ] About-page credentials and wording
- [ ] Quiz questions and answer key (`src/content/quiz.ts` — educational content)
- [ ] Any first-person quote attributed to Omaima (none published in V1 until approved)
- [ ] WhatsApp number and public email
- [ ] Specific exam-preparation claims, if any (generic in V1 by design)
- [ ] Real testimonials, if later added (`src/content/social.ts` is an empty typed seam; the site shows “What Students Can Expect” until then)

## 4. Privacy & contact behavior in production

- [ ] Assessment data is not stored by the site (stays in browser memory until the user opens WhatsApp)
- [ ] No personal form values appear in site URLs (only inside the WhatsApp deep link created on user action)
- [ ] WhatsApp only opens on explicit user action
- [ ] Copy-message fallback works when WhatsApp cannot open
- [ ] `NEXT_PUBLIC_SITE_URL` is the final HTTPS domain (no localhost canonicals)
- [ ] Privacy Policy page reflects actual behavior (no analytics claimed unless enabled)

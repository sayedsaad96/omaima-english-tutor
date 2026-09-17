# Omaima Ashour English Tutor Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the approved bilingual, mobile-first Hybrid Conversion Website for Omaima Ashour, optimized to convert visitors into free-assessment leads through a short level quiz and WhatsApp-assisted booking.

**Architecture:** Use a statically optimized Next.js App Router site with locale-prefixed routes (`/en` and `/ar`), typed code-managed content, reusable conversion components, and no persistent learner database in V1. Assessment data stays in browser memory and is transformed into a WhatsApp deep link; quiz scoring is local and deliberately indicative rather than a formal CEFR placement. Public pages remain SEO-friendly and can later coexist with a separate student area without restructuring the marketing site.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Zod, Next Image, `next/font`, Vitest + React Testing Library, Playwright + `@axe-core/playwright`, ESLint, Vercel deployment.

**Spec:** `docs/superpowers/specs/2026-09-17-omaima-english-tutor-website-design.md`

## Global Constraints

- Entire site must be bilingual: English LTR and Arabic RTL.
- V1 pages: Home, About Omaima, Lessons & Services, Free Level Quiz, Free Assessment / Booking, Privacy Policy.
- V1 is not an LMS and must not add accounts, payments, dashboards, attendance, homework portals, course marketplaces, or live lesson systems.
- Primary conversion CTA: **Book Your Free Assessment** / **احجز تقييمك المجاني**.
- Free assessment is 15–20 minutes and is not a free educational lesson.
- Level quiz is 7–10 questions, approximately 2 minutes, one question per screen, and must never claim a definitive CEFR level.
- Primary teaching format is online-first; offline is by arrangement/location.
- Public fixed pricing must not be shown in V1.
- Only real testimonials may be published; until real testimonials are supplied, show **What Students Can Expect** instead.
- Do not market preparation for a specific international exam unless Omaima explicitly confirms it as an offered service.
- Assessment form fields are limited to: learner target, age group, main goal, current level, preferred format, name, WhatsApp number.
- Assessment form must not persist learner data in a database in V1.
- Missing translations must never render raw translation keys to users.
- Mobile-first, keyboard-accessible, reduced-motion aware, RTL-compatible, and no essential interaction may depend only on hover.
- Use optimized responsive imagery, lazy-load non-critical media, avoid heavy 3D/parallax, and minimize third-party scripts.
- Every public page must have localized title, meta description, canonical URL, meaningful headings, human-readable URLs, and social metadata.
- About-page credentials must remain conservative and consistent with the approved spec; course completion must not be presented as authorization to provide official exam-preparation services.

---

## File Structure

Create the project with the following responsibility boundaries:

```text
omaima-english-tutor/
├─ docs/
│  └─ superpowers/
│     ├─ specs/
│     │  └─ 2026-09-17-omaima-english-tutor-website-design.md
│     └─ plans/
│        └─ 2026-09-17-omaima-english-tutor-website-implementation-plan.md
├─ public/
│  └─ images/
│     ├─ omaima-hero.webp
│     └─ omaima-about.webp
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  ├─ robots.ts
│  │  ├─ sitemap.ts
│  │  └─ [locale]/
│  │     ├─ layout.tsx
│  │     ├─ page.tsx
│  │     ├─ about/page.tsx
│  │     ├─ lessons/page.tsx
│  │     ├─ level-quiz/page.tsx
│  │     ├─ free-assessment/page.tsx
│  │     └─ privacy/page.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ SiteHeader.tsx
│  │  │  ├─ MobileNav.tsx
│  │  │  ├─ SiteFooter.tsx
│  │  │  └─ LocaleSwitcher.tsx
│  │  ├─ home/
│  │  │  ├─ HeroSection.tsx
│  │  │  ├─ AudienceSelector.tsx
│  │  │  ├─ JourneyStrip.tsx
│  │  │  ├─ ServicesSection.tsx
│  │  │  ├─ WhyOmaimaSection.tsx
│  │  │  ├─ TeachingMethodSection.tsx
│  │  │  ├─ QuizTeaser.tsx
│  │  │  ├─ AssessmentTeaser.tsx
│  │  │  ├─ LearningPathsSection.tsx
│  │  │  ├─ ExpectationsSection.tsx
│  │  │  ├─ AboutPreview.tsx
│  │  │  ├─ FaqSection.tsx
│  │  │  └─ FinalCta.tsx
│  │  ├─ quiz/
│  │  │  ├─ LevelQuiz.tsx
│  │  │  ├─ QuizQuestion.tsx
│  │  │  ├─ QuizProgress.tsx
│  │  │  └─ QuizResult.tsx
│  │  ├─ assessment/
│  │  │  ├─ AssessmentForm.tsx
│  │  │  ├─ AssessmentStep.tsx
│  │  │  └─ AssessmentSuccess.tsx
│  │  ├─ contact/
│  │  │  └─ WhatsAppLauncher.tsx
│  │  └─ ui/
│  │     ├─ Button.tsx
│  │     ├─ SectionHeading.tsx
│  │     ├─ Reveal.tsx
│  │     └─ Accordion.tsx
│  ├─ content/
│  │  ├─ en.ts
│  │  ├─ ar.ts
│  │  └─ types.ts
│  ├─ config/
│  │  └─ site.ts
│  ├─ i18n/
│  │  ├─ locales.ts
│  │  ├─ getDictionary.ts
│  │  └─ path.ts
│  ├─ lib/
│  │  ├─ assessment.ts
│  │  ├─ quiz.ts
│  │  ├─ whatsapp.ts
│  │  └─ metadata.ts
│  └─ tests/
│     ├─ unit/
│     │  ├─ quiz.test.ts
│     │  ├─ whatsapp.test.ts
│     │  └─ i18n-path.test.ts
│     └─ components/
│        ├─ LevelQuiz.test.tsx
│        ├─ AssessmentForm.test.tsx
│        ├─ LocaleSwitcher.test.tsx
│        └─ Accordion.test.tsx
├─ e2e/
│  ├─ home.spec.ts
│  ├─ quiz.spec.ts
│  ├─ assessment.spec.ts
│  └─ accessibility.spec.ts
├─ .env.example
├─ .github/workflows/ci.yml
├─ playwright.config.ts
├─ vitest.config.ts
└─ package.json
```

---

### Task 1: Initialize the project and quality baseline

**Files:**
- Create: entire initial Next.js project
- Create: `vitest.config.ts`
- Create: `src/tests/setup.ts`
- Create: `playwright.config.ts`
- Modify: `package.json`
- Copy: `docs/superpowers/specs/2026-09-17-omaima-english-tutor-website-design.md` and `docs/superpowers/plans/2026-09-17-omaima-english-tutor-website-implementation-plan.md`

**Interfaces:**
- Consumes: approved design spec
- Produces: a runnable Next.js TypeScript project with unit/component/E2E test commands

- [ ] **Step 1: Scaffold the application**

Run:

```bash
npx create-next-app@latest omaima-english-tutor --ts --eslint --tailwind --app --src-dir --use-npm
cd omaima-english-tutor
npm install zod lucide-react
npm install -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright
npx playwright install chromium
```

Expected: the app starts with `npm run dev` and renders the default Next.js page.

- [ ] **Step 2: Add test scripts to `package.json`**

Set these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "verify": "npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Create `src/tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Configure Playwright**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
```

- [ ] **Step 5: Verify the baseline**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected: all three commands exit with status 0.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: initialize Omaima tutor website"
```

---

### Task 2: Establish locales, typed content, site config, and design tokens

**Files:**
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/getDictionary.ts`
- Create: `src/i18n/path.ts`
- Create: `src/content/types.ts`
- Create: `src/content/en.ts`
- Create: `src/content/ar.ts`
- Create: `src/config/site.ts`
- Modify: `src/app/globals.css`
- Create: `src/tests/unit/i18n-path.test.ts`
- Create: `.env.example`

**Interfaces:**
- Produces: `Locale`, `isLocale()`, `getDictionary(locale)`, `switchLocalePath(pathname, nextLocale)`, `siteConfig`
- Later tasks consume these interfaces for routing, navigation, page copy, and WhatsApp configuration

- [ ] **Step 1: Write locale-path tests first**

Create `src/tests/unit/i18n-path.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { switchLocalePath } from '@/i18n/path';

 describe('switchLocalePath', () => {
  it('switches English route to Arabic while preserving the page path', () => {
    expect(switchLocalePath('/en/lessons', 'ar')).toBe('/ar/lessons');
  });

  it('switches Arabic root to English root', () => {
    expect(switchLocalePath('/ar', 'en')).toBe('/en');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/tests/unit/i18n-path.test.ts
```

Expected: FAIL because `@/i18n/path` does not exist.

- [ ] **Step 3: Add locale utilities**

Create `src/i18n/locales.ts`:

```ts
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
```

Create `src/i18n/path.ts`:

```ts
import type { Locale } from './locales';

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en' || segments[0] === 'ar') {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }
  return `/${segments.join('/')}`;
}
```

- [ ] **Step 4: Define typed content shape and dictionaries**

Create `src/content/types.ts` with explicit types for:

```ts
export type ServiceKey = 'private' | 'conversation' | 'school' | 'exam';
export type AudienceKey = 'kids' | 'teens' | 'adults' | 'child';

export interface SiteDictionary {
  nav: {
    home: string;
    about: string;
    lessons: string;
    quiz: string;
    assessment: string;
    book: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
  };
  audience: Record<AudienceKey, { title: string; body: string }>;
  services: Record<ServiceKey, { title: string; tagline: string; bullets: string[] }>;
  footer: {
    brand: string;
    privacy: string;
  };
}
```

Create complete `en.ts` and `ar.ts` dictionaries using the approved spec wording for nav, hero, audience, service headings/taglines, footer labels, and route-level headings. Keep marketing quote copy out of production content until Omaima explicitly approves it.

- [ ] **Step 5: Add dictionary loader**

Create `src/i18n/getDictionary.ts`:

```ts
import type { Locale } from './locales';
import type { SiteDictionary } from '@/content/types';
import { en } from '@/content/en';
import { ar } from '@/content/ar';

const dictionaries: Record<Locale, SiteDictionary> = { en, ar };

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale];
}
```

- [ ] **Step 6: Add site config**

Create `src/config/site.ts`:

```ts
export const siteConfig = {
  name: 'Omaima Ashour — English Tutor',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
} as const;
```

Create `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
```

- [ ] **Step 7: Add global design tokens and typography**

Use CSS variables in `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --bg: #fffaf6;
  --surface: #ffffff;
  --ink: #182033;
  --muted: #667085;
  --primary: #6c5ce7;
  --primary-soft: #f1edff;
  --accent: #ff8a5b;
  --accent-soft: #fff0e9;
  --mint: #dff7ee;
  --border: #e8e3ef;
  --success: #2d8f68;
  --radius-card: 1.5rem;
  --shadow-soft: 0 20px 55px rgba(38, 27, 77, 0.09);
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  background: var(--bg);
  color: var(--ink);
}
```

- [ ] **Step 8: Run tests and commit**

Run:

```bash
npm test -- src/tests/unit/i18n-path.test.ts
npm run typecheck
```

Expected: PASS.

Commit:

```bash
git add src .env.example
git commit -m "feat: add bilingual content foundation"
```

---

### Task 3: Build locale routing, fonts, metadata baseline, header, footer, and language switcher

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Create: `src/components/layout/LocaleSwitcher.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/tests/components/LocaleSwitcher.test.tsx`

**Interfaces:**
- Consumes: `Locale`, `isLocale`, `getDictionary`, `switchLocalePath`
- Produces: locale-aware shell shared by every public page

- [ ] **Step 1: Add root redirect**

Use `src/app/page.tsx`:

```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
```

- [ ] **Step 2: Build locale layout with font pairing and direction**

Use `Plus_Jakarta_Sans` for English and `Tajawal` for Arabic through `next/font/google`. Validate `params.locale` with `isLocale`; call `notFound()` for unsupported values. Set `lang` and `dir` on the locale wrapper and expose font CSS variables so the Arabic copy uses Tajawal and English copy uses Plus Jakarta Sans.

- [ ] **Step 3: Write a language-switcher test**

Create `src/tests/components/LocaleSwitcher.test.tsx` that renders a switcher at `/en/lessons`, clicks Arabic, and asserts the resulting link target is `/ar/lessons`.

- [ ] **Step 4: Implement header/footer/switcher**

Requirements:

```text
Desktop: Brand | Home | About | Lessons | Level Quiz | Free Assessment | AR/EN | Book Free Assessment
Mobile: Brand | AR/EN | Menu button; menu contains same navigation and CTA
Footer: Brand, main nav, WhatsApp if configured, email if configured, language links, Privacy Policy, copyright
```

All links must be locale-prefixed. Hide contact items when their config values are empty.

- [ ] **Step 5: Verify accessibility basics**

Run component tests and confirm menu button has `aria-expanded`, nav has an accessible label, language switcher indicates current language, and keyboard focus is visible.

Run:

```bash
npm test -- src/tests/components/LocaleSwitcher.test.tsx
npm run lint
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: add locale-aware site shell"
```

---

### Task 4: Build the reusable visual primitives and Home acquisition sections

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Reveal.tsx`
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/AudienceSelector.tsx`
- Create: `src/components/home/JourneyStrip.tsx`
- Create: `src/components/home/ServicesSection.tsx`
- Create: `src/components/home/WhyOmaimaSection.tsx`
- Create: `src/components/home/TeachingMethodSection.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Add: `public/images/omaima-hero.webp`

**Interfaces:**
- Consumes: locale dictionary and `Locale`
- Produces: Home top-half sections and in-page audience highlighting behavior

- [ ] **Step 1: Prepare the portrait asset**

Use the approved retouched portrait. Export a web-optimized WebP at a practical hero resolution and store it as `public/images/omaima-hero.webp`. Keep the original source outside the public bundle.

- [ ] **Step 2: Implement `Reveal` without an animation library**

Use `IntersectionObserver` and a CSS class toggle. The component must immediately render visible content when `prefers-reduced-motion: reduce` is active. Do not add Framer Motion.

- [ ] **Step 3: Build Hero**

Desktop requirements:

```text
Left: eyebrow, H1, body, primary CTA, secondary CTA, trust line
Right: real portrait with restrained educational accents: Speak / Learn / Improve / Confidence
```

Mobile order:

```text
H1 → body → portrait → primary CTA → secondary CTA → trust line
```

The primary CTA routes to `/{locale}/free-assessment`; secondary routes to `/{locale}/level-quiz`.

- [ ] **Step 4: Build Audience Selector with visible selected state**

Use four buttons: Kids, Teens & School Students, Adults, For My Child. Selection must update local state and add a `data-audience` value used by the services section to visually emphasize relevant service cards. Do not hide essential services.

- [ ] **Step 5: Build Journey, Services, Why Omaima, Teaching Method**

Implement the exact section order and approved messaging from the spec. Service visuals may use `lucide-react` icons plus distinct accent backgrounds, but the four cards must remain part of one design system. Teaching Method uses five connected steps and must remain readable with motion disabled.

- [ ] **Step 6: Add a Home smoke E2E test**

Create `e2e/home.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('English home exposes the primary conversion journey', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1, name: /learn english with confidence/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /book your free assessment/i }).first()).toBeVisible();
  await expect(page.getByText(/who are you learning for/i)).toBeVisible();
  await expect(page.getByText(/private english lessons/i)).toBeVisible();
});
```

- [ ] **Step 7: Verify desktop and mobile**

Run:

```bash
npm run test:e2e -- e2e/home.spec.ts
```

Expected: PASS on desktop and mobile Chromium projects.

- [ ] **Step 8: Commit**

```bash
git add src public e2e
git commit -m "feat: build home acquisition sections"
```

---

### Task 5: Implement deterministic quiz scoring and question content

**Files:**
- Create: `src/lib/quiz.ts`
- Create: `src/content/quiz.ts`
- Create: `src/tests/unit/quiz.test.ts`

**Interfaces:**
- Produces: `QuizQuestion`, `QuizResultBand`, `scoreQuiz(answers)`, `getQuizBand(score)`
- Later quiz UI consumes these pure functions

- [ ] **Step 1: Write scoring tests first**

Create `src/tests/unit/quiz.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getQuizBand, scoreQuiz } from '@/lib/quiz';

const key = ['b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'] as const;

describe('quiz scoring', () => {
  it('scores one point per correct answer', () => {
    expect(scoreQuiz(['b', 'c', 'x', 'b', 'x', 'a', 'b', 'x'], key)).toBe(5);
  });

  it('maps low scores to foundations', () => {
    expect(getQuizBand(2)).toBe('foundations');
  });

  it('maps middle scores to pre-intermediate', () => {
    expect(getQuizBand(5)).toBe('preIntermediate');
  });

  it('maps high scores to intermediatePlus', () => {
    expect(getQuizBand(8)).toBe('intermediatePlus');
  });
});
```

- [ ] **Step 2: Run to verify failure**

```bash
npm test -- src/tests/unit/quiz.test.ts
```

Expected: FAIL because quiz functions do not exist.

- [ ] **Step 3: Implement scoring**

Create `src/lib/quiz.ts`:

```ts
export type QuizChoice = 'a' | 'b' | 'c';
export type QuizResultBand = 'foundations' | 'elementary' | 'preIntermediate' | 'intermediatePlus';

export function scoreQuiz(answers: readonly string[], answerKey: readonly QuizChoice[]): number {
  return answerKey.reduce((score, correct, index) => score + (answers[index] === correct ? 1 : 0), 0);
}

export function getQuizBand(score: number): QuizResultBand {
  if (score <= 2) return 'foundations';
  if (score <= 4) return 'elementary';
  if (score <= 6) return 'preIntermediate';
  return 'intermediatePlus';
}
```

- [ ] **Step 4: Add eight V1 questions**

Create `src/content/quiz.ts` with these eight English-language questions. Arabic localizes the surrounding interface and instructions, but the tested English sentence/word itself remains English because the purpose is to sample English ability. The question set must be reviewed by Omaima before launch because it is educational content.

```ts
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    prompt: 'Choose the correct sentence.',
    choices: [
      { id: 'a', label: 'She go to school every day.' },
      { id: 'b', label: 'She goes to school every day.' },
      { id: 'c', label: 'She going to school every day.' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Which word means the opposite of “expensive”?',
    choices: [
      { id: 'a', label: 'heavy' },
      { id: 'b', label: 'slow' },
      { id: 'c', label: 'cheap' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Complete the sentence: “I ___ my homework yesterday.”',
    choices: [
      { id: 'a', label: 'finished' },
      { id: 'b', label: 'finish' },
      { id: 'c', label: 'finishing' },
    ],
  },
  {
    id: 'q4',
    prompt: 'Choose the correct question.',
    choices: [
      { id: 'a', label: 'Where you live?' },
      { id: 'b', label: 'Where do you live?' },
      { id: 'c', label: 'Where does you live?' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Complete the sentence: “We have lived here ___ 2022.”',
    choices: [
      { id: 'a', label: 'for' },
      { id: 'b', label: 'during' },
      { id: 'c', label: 'since' },
    ],
  },
  {
    id: 'q6',
    prompt: 'Choose the best sentence.',
    choices: [
      { id: 'a', label: 'If I have time, I will call you.' },
      { id: 'b', label: 'If I will have time, I call you.' },
      { id: 'c', label: 'If I had time, I will call you.' },
    ],
  },
  {
    id: 'q7',
    prompt: 'Read: “Mona missed the bus, so she arrived late.” Why was Mona late?',
    choices: [
      { id: 'a', label: 'She woke up early.' },
      { id: 'b', label: 'She missed the bus.' },
      { id: 'c', label: 'She finished work early.' },
    ],
  },
  {
    id: 'q8',
    prompt: 'Choose the most natural sentence.',
    choices: [
      { id: 'a', label: 'I am interested to learn English.' },
      { id: 'b', label: 'I am interesting in learning English.' },
      { id: 'c', label: 'I am interested in learning English.' },
    ],
  },
] as const;

export const QUIZ_ANSWER_KEY = ['b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'] as const;
```

Use result bands only as indicative labels. Never display “Your CEFR level is …”.

- [ ] **Step 5: Run tests and commit**

```bash
npm test -- src/tests/unit/quiz.test.ts
npm run typecheck
```

Expected: PASS.

Commit:

```bash
git add src/lib src/content src/tests
git commit -m "feat: add indicative level quiz scoring"
```

---

### Task 6: Build the interactive Level Quiz and dedicated page

**Files:**
- Create: `src/components/quiz/LevelQuiz.tsx`
- Create: `src/components/quiz/QuizQuestion.tsx`
- Create: `src/components/quiz/QuizProgress.tsx`
- Create: `src/components/quiz/QuizResult.tsx`
- Create: `src/components/home/QuizTeaser.tsx`
- Create: `src/app/[locale]/level-quiz/page.tsx`
- Create: `src/tests/components/LevelQuiz.test.tsx`
- Create: `e2e/quiz.spec.ts`

**Interfaces:**
- Consumes: quiz content, `scoreQuiz`, `getQuizBand`, locale copy
- Produces: restartable one-question-per-screen quiz and assessment CTA

- [ ] **Step 1: Write component test first**

Test requirements:

```text
- first question renders with progress 1/8
- selecting an answer enables Next
- Next advances exactly one question
- completing all eight questions renders an indicative result disclaimer
- Retake resets to question 1
- Book My Free Assessment links to locale-specific assessment page
```

- [ ] **Step 2: Implement the state machine**

Use local React state only:

```ts
type QuizState = {
  index: number;
  answers: string[];
  complete: boolean;
};
```

Do not persist quiz answers. Restarting after leaving is acceptable in V1.

- [ ] **Step 3: Add result copy**

Every band must include the approved caution:

```text
This is only a quick estimate. For a more accurate evaluation, book your free assessment with Omaima.
```

Arabic must convey the same limitation clearly.

- [ ] **Step 4: Add E2E test**

Create `e2e/quiz.spec.ts` that completes all eight questions on `/en/level-quiz`, asserts a result appears, verifies the disclaimer, then clicks Retake and sees question 1 again.

- [ ] **Step 5: Verify and commit**

```bash
npm test -- src/tests/components/LevelQuiz.test.tsx
npm run test:e2e -- e2e/quiz.spec.ts
```

Expected: PASS.

Commit:

```bash
git add src e2e
git commit -m "feat: add interactive level quiz"
```

---

### Task 7: Implement assessment validation and WhatsApp message generation

**Files:**
- Create: `src/lib/assessment.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/tests/unit/whatsapp.test.ts`

**Interfaces:**
- Produces: `assessmentSchema`, `AssessmentData`, `buildAssessmentMessage()`, `buildWhatsAppUrl()`
- Assessment UI and contact launcher consume these interfaces

- [ ] **Step 1: Write WhatsApp tests first**

Create `src/tests/unit/whatsapp.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildAssessmentMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

const data = {
  learnerFor: 'myself',
  ageGroup: 'adult',
  goal: 'conversation',
  currentLevel: 'notSure',
  format: 'online',
  name: 'Test Learner',
  whatsapp: '+201000000000',
} as const;

describe('WhatsApp conversion', () => {
  it('builds a structured message', () => {
    const message = buildAssessmentMessage(data, 'en');
    expect(message).toContain('Test Learner');
    expect(message).toContain('Conversation');
    expect(message).toContain('Online');
  });

  it('encodes the message in wa.me URL', () => {
    const url = buildWhatsAppUrl('201111111111', 'Hello & welcome');
    expect(url).toBe('https://wa.me/201111111111?text=Hello%20%26%20welcome');
  });
});
```

- [ ] **Step 2: Define strict assessment schema**

Create `src/lib/assessment.ts`:

```ts
import { z } from 'zod';

export const assessmentSchema = z.object({
  learnerFor: z.enum(['myself', 'myChild']),
  ageGroup: z.enum(['kid', 'teen', 'adult']),
  goal: z.enum(['conversation', 'schoolSupport', 'examPreparation', 'generalEnglish']),
  currentLevel: z.enum(['beginner', 'intermediate', 'advanced', 'notSure']),
  format: z.enum(['online', 'offlineIfAvailable']),
  name: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().min(8).max(20).regex(/^\+?[0-9\s-]+$/),
});

export type AssessmentData = z.infer<typeof assessmentSchema>;
```

- [ ] **Step 3: Implement message generation**

Create `src/lib/whatsapp.ts` with explicit English and Arabic label maps. `buildAssessmentMessage(data, locale)` must format a readable multi-line message and must not place the learner data in the browser URL itself beyond the final WhatsApp deep link generated on user action.

`buildWhatsAppUrl(number, message)` must strip non-digit characters from the business number and return `https://wa.me/<digits>?text=<encoded-message>`.

- [ ] **Step 4: Run tests and commit**

```bash
npm test -- src/tests/unit/whatsapp.test.ts
npm run typecheck
```

Expected: PASS.

Commit:

```bash
git add src/lib src/tests
git commit -m "feat: add assessment validation and WhatsApp conversion"
```

---

### Task 8: Build the Free Assessment multi-step flow and fallback behavior

**Files:**
- Create: `src/components/assessment/AssessmentForm.tsx`
- Create: `src/components/assessment/AssessmentStep.tsx`
- Create: `src/components/assessment/AssessmentSuccess.tsx`
- Create: `src/components/home/AssessmentTeaser.tsx`
- Create: `src/app/[locale]/free-assessment/page.tsx`
- Create: `src/tests/components/AssessmentForm.test.tsx`
- Create: `e2e/assessment.spec.ts`

**Interfaces:**
- Consumes: `assessmentSchema`, `AssessmentData`, WhatsApp utilities, `siteConfig.whatsappNumber`
- Produces: a seven-step form that retains values during validation, then opens WhatsApp or shows a copyable fallback message

- [ ] **Step 1: Write form component tests first**

Test these behaviors:

```text
- Next is blocked until the current required choice is selected
- invalid short name displays adjacent error text
- invalid WhatsApp value displays adjacent error text
- correcting a validation error preserves all previous selections
- successful completion renders the success state
- if business WhatsApp number is unavailable, the copyable message fallback remains usable
```

- [ ] **Step 2: Implement one-question-per-step form**

Use local state with this exact step order:

```text
1 learnerFor
2 ageGroup
3 goal
4 currentLevel
5 format
6 name
7 whatsapp
```

Show progress as `step / 7`. Back navigation must preserve answers. No network POST is performed in V1.

- [ ] **Step 3: Implement success and WhatsApp fallback**

On valid completion:

1. Build the structured message.
2. Show the submitted summary on screen.
3. Render **Continue on WhatsApp** if `NEXT_PUBLIC_WHATSAPP_NUMBER` is configured.
4. Always render **Copy message** as a fallback.
5. If WhatsApp cannot open, the user still has the readable summary, copy button, and configured contact channel.

- [ ] **Step 4: Add E2E coverage**

Create `e2e/assessment.spec.ts` to complete the form in English, verify the summary, and assert that the WhatsApp anchor contains `wa.me` and an encoded learner name when the test environment provides a dummy business number.

- [ ] **Step 5: Verify and commit**

Run with a test-only environment value:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=201111111111 npm run test:e2e -- e2e/assessment.spec.ts
npm test -- src/tests/components/AssessmentForm.test.tsx
```

Expected: PASS.

Commit:

```bash
git add src e2e
git commit -m "feat: add free assessment booking flow"
```

---

### Task 9: Complete the Home conversion journey

**Files:**
- Create: `src/components/home/LearningPathsSection.tsx`
- Create: `src/components/home/ExpectationsSection.tsx`
- Create: `src/components/home/AboutPreview.tsx`
- Create: `src/components/ui/Accordion.tsx`
- Create: `src/components/home/FaqSection.tsx`
- Create: `src/components/home/FinalCta.tsx`
- Create: `src/components/contact/WhatsAppLauncher.tsx`
- Create: `src/tests/components/Accordion.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: locale copy, assessment and quiz routes, site config
- Produces: complete approved Home section order

- [ ] **Step 1: Write Accordion accessibility test**

Test that each FAQ trigger exposes `aria-expanded`, toggles on click and keyboard activation, and associates trigger/content with IDs.

- [ ] **Step 2: Build Learning Paths**

Render Start, Progress — Recommended, and Intensive without prices. Every path CTA routes to `/{locale}/free-assessment` with the approved disclaimer below the cards.

- [ ] **Step 3: Build social-proof fallback**

Default V1 behavior is **What Students Can Expect** with non-claiming outcomes. Do not invent testimonials. Add a typed content seam so real testimonials can later replace the section without changing layout architecture.

- [ ] **Step 4: Build FAQ and Final CTA**

Use the approved FAQ topics and ensure the answer explicitly distinguishes the free assessment from a paid educational lesson.

- [ ] **Step 5: Build WhatsApp Launcher**

Use five intent choices:

```text
Book a Free Assessment
Ask about lessons
School Support
Conversation Practice
Exam Preparation
```

Generate locale-appropriate prefilled messages. Keep the launcher compact and ensure it does not cover mobile content or the sticky assessment CTA.

- [ ] **Step 6: Verify Home order**

Add assertions to `e2e/home.spec.ts` confirming sections appear in the approved order through unique headings/landmarks.

- [ ] **Step 7: Commit**

```bash
git add src e2e
git commit -m "feat: complete home conversion journey"
```

---

### Task 10: Build About and Lessons pages with conservative credential claims

**Files:**
- Create: `src/app/[locale]/about/page.tsx`
- Create: `src/app/[locale]/lessons/page.tsx`
- Add: `public/images/omaima-about.webp`
- Extend: `src/content/en.ts`
- Extend: `src/content/ar.ts`

**Interfaces:**
- Consumes: approved CV-supported facts in the design spec and service definitions
- Produces: crawlable localized detail pages

- [ ] **Step 1: Build About page from approved facts only**

Include these factual categories exactly and conservatively:

```text
Bachelor of Education & Arts | KFC — completed June 2022 — grade: Good
Freelance Teacher of English since December 2023
Online secondary-stage teaching experience
Methods used: Elicitation and Drilling
Curricula: Connect and Connect Plus
ELT Gathering webinar — August 2024
TEFLism Professional Development certificate — August 2024
The Pronunciation of American English — Coursera — January 2024
SEL for Students — Coursera
TOEFL Preparation — Coursera — August 2023
Arizona State University TESOL Coursera modules — July 2023
Speak English Professionally: In Person, Online & On the Phone — Coursera — June 2023
```

Do not transform course completion into a claim of official TOEFL/IELTS certification or guaranteed outcomes.

- [ ] **Step 2: Build Lessons page**

Show the four approved services, intended learners, focus areas, and a CTA to free assessment. Keep Exam Preparation generic unless Omaima later confirms specific exams.

- [ ] **Step 3: Add internal navigation**

Ensure Home service cards link to relevant anchors on Lessons and that About preview links to About.

- [ ] **Step 4: Commit**

```bash
git add src public
git commit -m "feat: add about and lessons pages"
```

---

### Task 11: Add localized metadata, canonical URLs, sitemap, robots, and Privacy Policy

**Files:**
- Create: `src/lib/metadata.ts`
- Create: `src/app/[locale]/privacy/page.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: every localized page to export/generate metadata

**Interfaces:**
- Produces: localized SEO metadata and discoverable public routes

- [ ] **Step 1: Implement metadata helper**

Create a helper that receives locale, path, title, and description and returns:

```text
title
description
alternates.canonical
alternates.languages.en
alternates.languages.ar
openGraph.title
openGraph.description
openGraph.url
openGraph.type = website
```

Do not create a canonical URL from `localhost` in production; `NEXT_PUBLIC_SITE_URL` must be set on deployment.

- [ ] **Step 2: Add Privacy Policy**

The policy must accurately state V1 behavior:

```text
- assessment information is entered to prepare a WhatsApp contact message
- the site itself does not persist assessment answers in a learner database in V1
- WhatsApp is a third-party service and its policies apply once the user continues there
- basic site analytics are described only if analytics are actually enabled
- contact details and update date are shown
```

Do not claim legal compliance regimes that have not been reviewed.

- [ ] **Step 3: Add sitemap and robots**

Include all English and Arabic public routes. Exclude no public V1 pages.

- [ ] **Step 4: Verify rendered metadata**

Use Playwright to visit `/en/about` and `/ar/about`; assert localized `<title>`, canonical URL, and alternate language links.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: add SEO and privacy foundations"
```

---

### Task 12: Accessibility, RTL, reduced-motion, and responsive hardening

**Files:**
- Create: `e2e/accessibility.spec.ts`
- Modify: affected components and CSS based on failures

**Interfaces:**
- Consumes: complete public UI
- Produces: keyboard-usable, RTL-correct, reduced-motion-aware site

- [ ] **Step 1: Add automated accessibility smoke tests**

Use `@axe-core/playwright` on:

```text
/en
/ar
/en/level-quiz
/en/free-assessment
```

Fail the test on serious or critical violations.

- [ ] **Step 2: Add keyboard path checks**

Verify:

```text
header navigation can be traversed with Tab
mobile menu can be opened/closed from keyboard
FAQ accordion is keyboard-operable
quiz choices and Next are keyboard-operable
assessment steps and Back/Next are keyboard-operable
focus remains visible
```

- [ ] **Step 3: Add RTL visual assertions**

For `/ar`, assert the page container uses `dir="rtl"`; verify hero copy alignment, service card reading order, form labels, back/next controls, and icon placement are visually correct and not blindly mirrored where semantics would be wrong.

- [ ] **Step 4: Verify reduced motion**

Use Playwright emulation with reduced motion and assert essential content remains immediately available without waiting for reveal animations.

- [ ] **Step 5: Commit**

```bash
git add src e2e
git commit -m "fix: harden accessibility and RTL behavior"
```

---

### Task 13: Performance and image hardening

**Files:**
- Modify: portrait usages, reveal behavior, page imports, CSS
- Optionally create: `src/components/ui/DecorativeAccent.tsx` for lightweight SVG accents

**Interfaces:**
- Produces: optimized mobile rendering without heavy animation dependencies

- [ ] **Step 1: Audit image loading**

Use `next/image` for all raster images. The hero portrait may be `priority`; non-critical images must not be priority. Provide explicit sizes and `sizes` attributes.

- [ ] **Step 2: Remove unnecessary client components**

Only components that use browser state/events should include `'use client'`. Keep page shells, static sections, metadata, About, Lessons, and Privacy server-rendered.

- [ ] **Step 3: Keep motion lightweight**

Use CSS transforms/opacity and the existing `Reveal` component. Do not introduce a general-purpose animation library.

- [ ] **Step 4: Build and inspect**

Run:

```bash
npm run build
```

Expected: successful production build with no accidental route errors. Inspect build output for unexpected fully dynamic routes; the public marketing routes should remain statically optimizable where possible.

- [ ] **Step 5: Mobile runtime check**

Use Playwright mobile project to load `/en` and `/ar`; verify no horizontal overflow at 360px width and primary content remains usable with JavaScript interactions enabled.

- [ ] **Step 6: Commit**

```bash
git add src public e2e
git commit -m "perf: optimize images and client boundaries"
```

---

### Task 14: CI and deployment to Vercel

**Files:**
- Create: `.github/workflows/ci.yml`
- Update: `README.md` with local setup and required environment variables

**Interfaces:**
- Produces: repeatable verification on every push/PR and a production deployment path

- [ ] **Step 1: Add GitHub Actions CI**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
      - run: npm run test:e2e
        env:
          NEXT_PUBLIC_WHATSAPP_NUMBER: 201111111111
          NEXT_PUBLIC_SITE_URL: http://127.0.0.1:3000
```

- [ ] **Step 2: Document deployment configuration**

README must require these production values:

```text
NEXT_PUBLIC_SITE_URL = final HTTPS production domain
NEXT_PUBLIC_WHATSAPP_NUMBER = Omaima's verified WhatsApp number in international digits only
NEXT_PUBLIC_CONTACT_EMAIL = optional public contact email
```

- [ ] **Step 3: Connect repository to Vercel**

Manual action: sign in to Vercel, import the GitHub repository, set the three environment variables, and deploy from `main`.

- [ ] **Step 4: Verify production domain**

After deployment, run:

```bash
export PRODUCTION_URL="https://your-final-domain.example"
curl -I "$PRODUCTION_URL/en"
curl -I "$PRODUCTION_URL/ar"
```

Before running the command, replace the example value assigned to `PRODUCTION_URL` with the actual HTTPS domain shown by Vercel after deployment.

Expected: HTTP 200 responses and HTTPS.

- [ ] **Step 5: Commit**

```bash
git add .github README.md
git commit -m "ci: add verification and deployment workflow"
```

---

### Task 15: Final launch verification and content sign-off

**Files:**
- Modify only files required by discovered launch-blocking issues
- Create: `docs/launch-checklist.md`

**Interfaces:**
- Consumes: production-ready site
- Produces: explicit launch evidence and human sign-off points

- [ ] **Step 1: Run the full automated verification suite**

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
NEXT_PUBLIC_WHATSAPP_NUMBER=201111111111 npm run test:e2e
```

Expected: all commands exit 0.

- [ ] **Step 2: Verify the V1 success criteria manually on a real phone**

Record pass/fail for:

```text
Visitor understands who Omaima teaches within seconds
Relevant service can be found without reading the full site
Quiz completes comfortably on mobile
Assessment completes comfortably on mobile
WhatsApp prefilled message is correct
AR/EN switch preserves equivalent route
Arabic layout is genuinely RTL and readable
Home does not feel children-only
No fabricated testimonials or unsupported credentials are present
Primary CTA is reachable from several points without feeling aggressive
```

- [ ] **Step 3: Obtain Omaima content sign-off before public launch**

Require explicit approval for:

```text
portrait usage
About-page credentials and wording
quiz questions and answer key
any first-person quote attributed to Omaima
WhatsApp number and public email
specific exam-preparation claims, if any
real testimonials, if later added
```

Until a first-person marketing quote is approved, omit it rather than publishing invented speech.

- [ ] **Step 4: Verify privacy and contact behavior in production**

Confirm assessment data is not stored by the site, no personal form values appear in site URLs, WhatsApp only opens on explicit user action, and copy-message fallback works.

- [ ] **Step 5: Commit final launch documentation**

```bash
git add .
git commit -m "docs: complete launch verification"
```

---

## Self-Review Result

**Spec coverage:** All V1 requirements are mapped to tasks: bilingual routing, RTL, mobile-first Home journey, four services, teaching method, 8-question indicative quiz, free assessment, WhatsApp conversion, no public pricing, learning paths, social-proof fallback, About/CV facts, FAQ, Privacy Policy, SEO, accessibility, performance, CI/CD, and launch sign-off.

**Scope control:** LMS/accounts/payments/student dashboards remain explicitly excluded. V1 deliberately has no database or CMS; content is code-managed and assessment data is not persisted.

**Type consistency:** Locale, quiz, assessment, and WhatsApp interfaces are defined before their UI consumers. The dedicated pages reuse the same domain logic as Home teasers.

**Known human inputs before production:** verified WhatsApp business number, optional contact email, final production domain, Omaima approval of portrait use, quiz content, CV wording, and any first-person marketing quote.

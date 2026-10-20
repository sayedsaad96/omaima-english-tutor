import { CalendarCheck, Check } from '@phosphor-icons/react/dist/ssr';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function AssessmentTeaser({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  return (
    <section aria-labelledby="assessment-teaser-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <div className="card-lift relative grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)] sm:p-12 md:grid-cols-[1fr_auto]">
          <div
            aria-hidden="true"
            className="animate-blob pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-[var(--mint)] opacity-70 blur-2xl"
          />
          <div className="relative flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--mint)] px-4 py-1.5 text-sm font-bold text-[var(--success-dark)]">
              <CalendarCheck size={16} aria-hidden="true" />
              {dict.assessmentTeaser.intro.eyebrow}
            </span>
            <h2 id="assessment-teaser-heading" className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.assessmentTeaser.intro.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
              {dict.assessmentTeaser.intro.body}
            </p>
            <ul className="flex flex-col gap-2">
              {dict.assessmentTeaser.bullets.map((bullet) => (
                <li key={bullet} className="inline-flex items-center gap-2 text-base font-semibold">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mint)] text-[var(--success)]"
                  >
                    <Check size={14} weight="bold" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-[var(--muted)]">{dict.assessmentTeaser.note}</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            shine
            press
            softShadow
            className="relative"
            href={`/${locale}/free-assessment`}
          >
            {dict.assessmentTeaser.cta}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

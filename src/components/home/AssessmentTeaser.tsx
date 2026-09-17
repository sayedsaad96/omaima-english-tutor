import Link from 'next/link';
import { CalendarCheck, Check } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

export function AssessmentTeaser({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  return (
    <section aria-labelledby="assessment-teaser-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <div className="grid items-center gap-8 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col items-start gap-4">
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
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-[var(--muted)]">{dict.assessmentTeaser.note}</p>
          </div>
          <Link
            href={`/${locale}/free-assessment`}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[var(--primary)] px-8 py-4 text-lg font-bold text-white shadow-[var(--shadow-soft)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            {dict.assessmentTeaser.cta}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

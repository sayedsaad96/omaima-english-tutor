import Link from 'next/link';
import { Sparkles, Check } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

export function QuizTeaser({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  return (
    <section aria-labelledby="quiz-teaser-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--spotlight)] p-8 text-[var(--on-spotlight)] shadow-[var(--shadow-lift)] sm:p-12">
          <div
            aria-hidden="true"
            className="animate-blob pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-[var(--primary)] opacity-40 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="animate-blob pointer-events-none absolute -bottom-20 -start-10 h-56 w-56 rounded-full bg-[var(--accent)] opacity-30 blur-2xl"
            style={{ animationDelay: '-6s' }}
          />
          <div className="relative flex flex-col items-start gap-5">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold">
              <Sparkles size={16} aria-hidden="true" />
              {dict.quizTeaser.intro.eyebrow}
            </span>
            <h2 id="quiz-teaser-heading" className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.quizTeaser.intro.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed opacity-80">
              {dict.quizTeaser.intro.body}
            </p>
            <ul className="flex flex-wrap gap-2">
              {dict.quizTeaser.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold"
                >
                  <Check size={14} aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/level-quiz`}
              className="btn-shine btn-press mt-2 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 py-3 text-base font-bold text-[var(--primary)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {dict.quizTeaser.cta}
            </Link>
            <p className="text-sm opacity-60">{dict.quizTeaser.secondary}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

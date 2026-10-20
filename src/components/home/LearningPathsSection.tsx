import Link from 'next/link';
import { SealCheck as BadgeCheck } from '@phosphor-icons/react/dist/ssr';
import type { Locale } from '@/i18n/locales';
import type { PathKey, SiteDictionary } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const order: PathKey[] = ['start', 'progress', 'intensive'];

export function LearningPathsSection({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  return (
    <section aria-labelledby="paths-heading" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <SectionHeading
            id="paths-heading"
            eyebrow={dict.paths.intro.eyebrow}
            title={dict.paths.intro.title}
            body={dict.paths.intro.body}
            align="center"
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {order.map((key, index) => {
            const path = dict.paths.items[key];
            return (
              <Reveal key={key} delay={index * 90}>
                <article
                  className={`card-lift relative flex h-full flex-col gap-3 rounded-[var(--radius-card)] border-2 p-6 ${
                    path.recommended
                      ? 'border-[var(--primary)] bg-[var(--primary-soft)] shadow-[var(--shadow-lift)]'
                      : 'border-[var(--border)] bg-[var(--bg)]'
                  }`}
                >
                  {path.recommended && (
                    <span className="absolute -top-3 start-6 inline-flex items-center gap-1 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
                      <BadgeCheck size={14} aria-hidden="true" />
                      {locale === 'ar' ? 'الأكثر ترشيحاً' : 'Recommended'}
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold">{path.name}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{path.body}</p>
                  <ul className="flex flex-col gap-2">
                    {path.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-sm font-semibold">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/free-assessment?path=${key}`}
                    className={`btn-press mt-auto inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 text-base font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                      path.recommended
                        ? 'btn-shine bg-[var(--primary)] text-white hover:brightness-110'
                        : 'border-2 border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:text-[var(--primary-text)]'
                    }`}
                  >
                    {path.cta}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[var(--muted)]">
            {dict.paths.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

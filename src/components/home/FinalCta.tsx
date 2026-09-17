import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

export function FinalCta({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  return (
    <section aria-labelledby="final-cta-heading" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <Reveal>
        <div className="animate-pan relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--primary)] via-[#5b4bd6] to-[#4a3ec9] p-8 text-center text-white shadow-[var(--shadow-lift)] sm:p-14">
          <div
            aria-hidden="true"
            className="animate-blob pointer-events-none absolute -start-16 -top-16 h-56 w-56 rounded-full bg-white opacity-10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="animate-blob pointer-events-none absolute -bottom-20 -end-10 h-56 w-56 rounded-full bg-[var(--accent)] opacity-30 blur-2xl"
            style={{ animationDelay: '-6s' }}
          />
          <h2 id="final-cta-heading" className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            {dict.finalCta.title}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-base text-white sm:text-lg">
            {dict.finalCta.body}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`/${locale}/free-assessment`}
              className="btn-shine btn-press inline-flex min-h-[56px] items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-[var(--primary)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {dict.finalCta.primaryCta}
            </Link>
            <Link
              href={`/${locale}/level-quiz`}
              className="inline-flex min-h-[56px] items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {dict.finalCta.secondaryCta}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

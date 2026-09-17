import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';

interface HeroSectionProps {
  locale: Locale;
  dict: SiteDictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const { hero } = dict;
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-0 h-72 w-72 rounded-full bg-[var(--primary-soft)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 start-0 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-2xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 md:pt-16">
        <div className="contents md:flex md:flex-col md:gap-5">
          <p className="order-1 text-sm font-bold uppercase tracking-widest text-[var(--primary)] md:order-none">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="order-2 mt-2 text-4xl font-extrabold leading-[1.15] sm:text-5xl md:order-none md:mt-0"
          >
            {hero.title}
          </h1>
          <p className="order-3 mt-4 text-lg leading-relaxed text-[var(--muted)] md:order-none md:mt-0">
            {hero.body}
          </p>

          <div className="order-5 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:order-none md:mt-0">
            <Link
              href={`/${locale}/free-assessment`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-white shadow-[var(--shadow-soft)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/level-quiz`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] px-7 py-3 text-base font-bold transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              {hero.secondaryCta}
            </Link>
          </div>
          <p className="order-6 mt-5 text-sm font-semibold text-[var(--muted)] md:order-none md:mt-0">
            {hero.trustLine}
          </p>
        </div>

        <div className="order-4 md:order-none">
          <figure className="relative mx-auto max-w-sm md:max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[var(--primary-soft)] via-[var(--surface)] to-[var(--accent-soft)]"
            />
            <Image
              src="/images/omaima-hero.webp"
              alt={hero.portraitAlt}
              width={880}
              height={1100}
              priority
              sizes="(max-width: 768px) 90vw, 440px"
              className="relative aspect-[4/5] w-full rounded-[2rem] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute -start-3 top-8 flex flex-col gap-2" aria-hidden="true">
              {hero.accents.slice(0, 2).map((word, index) => (
                <span
                  key={word}
                  className={`animate-float-soft rounded-full px-4 py-1.5 text-sm font-bold shadow-[var(--shadow-soft)] ${
                    index === 0
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--surface)] text-[var(--primary)]'
                  }`}
                  style={{ animationDelay: `${index * 1.2}s` }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="absolute -end-3 bottom-8 flex flex-col items-end gap-2" aria-hidden="true">
              {hero.accents.slice(2).map((word, index) => (
                <span
                  key={word}
                  className={`animate-float-soft rounded-full px-4 py-1.5 text-sm font-bold shadow-[var(--shadow-soft)] ${
                    index === 0
                      ? 'bg-[var(--accent)] text-[var(--ink)]'
                      : 'bg-[var(--mint)] text-[var(--ink)]'
                  }`}
                  style={{ animationDelay: `${(index + 2) * 1.2}s` }}
                >
                  {word}
                </span>
              ))}
            </div>
            <figcaption className="sr-only">{hero.portraitAlt}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

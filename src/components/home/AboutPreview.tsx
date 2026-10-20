import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

export function AboutPreview({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  return (
    <section aria-labelledby="about-preview-heading" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[auto_1fr]">
        <Reveal variant="scale">
          <div className="portrait-frame w-fit">
          <Image
            src="/images/omaima-about.webp"
            alt={dict.aboutPreview.portraitAlt}
            width={800}
            height={1000}
            loading="lazy"
            sizes="(max-width: 768px) 60vw, 220px"
            className="relative aspect-[4/5] w-40 rounded-[2rem] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)] sm:w-52"
          />
          </div>
        </Reveal>
        <Reveal>
          <p className="text-sm font-bold tracking-wide text-[var(--primary-text)]">
            {dict.aboutPreview.eyebrow}
          </p>
          <h2 id="about-preview-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {dict.aboutPreview.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {dict.aboutPreview.body}
          </p>
          <Link
            href={`/${locale}/about`}
            className="btn-press mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-[var(--ink)] bg-transparent px-6 py-3 text-base font-bold transition hover:border-[var(--primary)] hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            {dict.aboutPreview.cta} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

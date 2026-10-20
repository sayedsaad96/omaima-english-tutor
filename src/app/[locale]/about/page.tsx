import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Briefcase, Medal as Award } from '@phosphor-icons/react/dist/ssr';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { localizedMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: '/about',
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const about = dict.about;

  const groups = [
    { icon: GraduationCap, ...about.education },
    { icon: Briefcase, ...about.experience },
    { icon: Award, ...about.development },
  ];

  return (
    <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-bold tracking-wide text-[var(--primary-text)]">
        {dict.nav.about}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{about.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {about.intro}
      </p>

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[auto_1fr]">
        <Reveal variant="scale">
          <div className="portrait-frame w-fit">
          <Image
            src="/images/omaima-about.webp"
            alt={about.portraitAlt}
            width={800}
            height={1000}
            sizes="(max-width: 768px) 70vw, 280px"
            className="relative aspect-[4/5] w-52 rounded-[2rem] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)] sm:w-64"
          />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="text-2xl font-extrabold">{about.approachTitle}</h2>
          {about.approachBody.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <h2 className="text-2xl font-extrabold">{about.factsTitle}</h2>
      </Reveal>
      <div className="mt-5 grid gap-4">
        {groups.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.title} delay={index * 70}>
              <section
                aria-label={group.title}
                className="card-lift rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-text)]"
                  >
                    <Icon size={20} weight="duotone" />
                  </span>
                  {group.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed sm:text-base">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-4 text-sm leading-relaxed">
          {about.caution}
        </p>
      </Reveal>

      <Reveal className="mt-8 text-center">
        <Link
          href={`/${locale}/free-assessment`}
          className="btn-shine btn-press inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-8 py-3 text-base font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {about.cta}
        </Link>
      </Reveal>
    </main>
  );
}

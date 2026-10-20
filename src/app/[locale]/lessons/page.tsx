import Link from 'next/link';
import { User, Chats as MessagesSquare, Backpack, Target } from '@phosphor-icons/react/dist/ssr';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { localizedMetadata } from '@/lib/metadata';
import type { ServiceKey } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

interface LessonsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LessonsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: '/lessons',
    title: dict.meta.lessons.title,
    description: dict.meta.lessons.description,
  });
}

const serviceMeta: Record<ServiceKey, { icon: typeof User; anchor: string; wrap: string }> = {
  private: { icon: User, anchor: 'private-lessons', wrap: 'bg-[var(--primary)] text-white' },
  conversation: { icon: MessagesSquare, anchor: 'conversation', wrap: 'bg-[var(--accent)] text-white' },
  school: { icon: Backpack, anchor: 'school-support', wrap: 'bg-[var(--success)] text-white' },
  exam: { icon: Target, anchor: 'exam-prep', wrap: 'bg-[var(--ink)] text-white' },
};

const order: ServiceKey[] = ['private', 'conversation', 'school', 'exam'];

export default async function LessonsPage({ params }: LessonsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-bold tracking-wide text-[var(--primary-text)]">
        {dict.nav.lessons}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
        {dict.lessons.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {dict.lessons.intro}
      </p>

      <div className="mt-8 flex scroll-mt-24 flex-col gap-5">
        {order.map((key, index) => {
          const service = dict.services.items[key];
          const meta = serviceMeta[key];
          const Icon = meta.icon;
          return (
            <Reveal key={key} delay={(index % 2) * 80}>
              <section
                id={meta.anchor}
                aria-labelledby={`${meta.anchor}-title`}
                className="card-lift scroll-mt-24 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
              >
                <h2 id={`${meta.anchor}-title`} className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${meta.wrap}`}
                  >
                    <Icon size={22} weight="duotone" />
                  </span>
                  {service.title}
                </h2>
                <p className="mt-2 text-base font-semibold italic">{service.tagline}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{service.learners}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-full bg-[var(--primary-soft)] px-3 py-1.5 text-sm font-medium"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/free-assessment?service=${key}`}
                  className="mt-4 inline-flex min-h-[44px] w-fit items-center rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-6 py-2.5 text-base font-bold transition hover:border-[var(--primary)] hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  {dict.lessons.serviceCta}
                </Link>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-4 text-sm leading-relaxed">
          {dict.lessons.note}
        </p>
      </Reveal>

      <Reveal className="mt-8 text-center">
        <Link
          href={`/${locale}/free-assessment`}
          className="btn-shine btn-press inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-8 py-3 text-base font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {dict.lessons.cta}
        </Link>
      </Reveal>
    </main>
  );
}

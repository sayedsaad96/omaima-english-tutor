import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { localizedMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: '/privacy',
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const privacy = dict.privacy;

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{privacy.title}</h1>
      <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{privacy.updated}</p>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{privacy.intro}</p>
      <div className="mt-8 flex flex-col gap-4">
        {privacy.sections.map((section) => (
          <Reveal key={section.title}>
            <section
              aria-label={section.title}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h2 className="text-lg font-bold">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {paragraph}
                </p>
              ))}
            </section>
          </Reveal>
        ))}
      </div>
    </main>
  );
}

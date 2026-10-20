import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { localizedMetadata } from '@/lib/metadata';
import { siteConfig } from '@/config/site';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';

interface FreeAssessmentPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FreeAssessmentPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: '/free-assessment',
    title: dict.meta.assessment.title,
    description: dict.meta.assessment.description,
  });
}

export default async function FreeAssessmentPage({ params }: FreeAssessmentPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-bold tracking-wide text-[var(--primary-text)]">
        {dict.nav.assessment}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
        {dict.assessment.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {dict.assessment.intro}
      </p>
      <div className="mt-8">
        <AssessmentForm dict={dict} businessNumber={siteConfig.whatsappNumber} />
      </div>
    </main>
  );
}

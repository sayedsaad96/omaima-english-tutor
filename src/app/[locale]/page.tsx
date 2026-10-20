import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { localizedMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/home/HeroSection';
import { HomeTop } from '@/components/home/HomeTop';
import { WhyOmaimaSection } from '@/components/home/WhyOmaimaSection';
import { TeachingMethodSection } from '@/components/home/TeachingMethodSection';
import { QuizTeaser } from '@/components/home/QuizTeaser';
import { AssessmentTeaser } from '@/components/home/AssessmentTeaser';
import { LearningPathsSection } from '@/components/home/LearningPathsSection';
import { ExpectationsSection } from '@/components/home/ExpectationsSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: '',
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <main id="main-content">
      <HeroSection locale={locale} dict={dict} />
      <HomeTop locale={locale} dict={dict} />
      <TeachingMethodSection dict={dict} />
      <QuizTeaser locale={locale} dict={dict} />
      <AssessmentTeaser locale={locale} dict={dict} />
      <LearningPathsSection locale={locale} dict={dict} />
      <ExpectationsSection dict={dict} />
      <WhyOmaimaSection dict={dict} />
      <AboutPreview locale={locale} dict={dict} />
      <FaqSection dict={dict} />
      <FinalCta locale={locale} dict={dict} />
    </main>
  );
}

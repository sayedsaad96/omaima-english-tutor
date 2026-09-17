import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { localizedMetadata } from '@/lib/metadata';
import { LevelQuiz } from '@/components/quiz/LevelQuiz';

interface LevelQuizPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LevelQuizPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: '/level-quiz',
    title: dict.meta.quiz.title,
    description: dict.meta.quiz.description,
  });
}

export default async function LevelQuizPage({ params }: LevelQuizPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-bold uppercase tracking-widest text-[var(--primary)]">
        {dict.nav.quiz}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{dict.quiz.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {dict.quiz.intro}
      </p>
      <p className="mt-2 text-sm font-medium text-[var(--muted)]">{dict.quiz.startHint}</p>
      <div className="mt-8">
        <LevelQuiz locale={locale} dict={dict} />
      </div>
    </main>
  );
}

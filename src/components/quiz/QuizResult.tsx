import { useEffect, useRef } from 'react';
import { Confetti, ArrowCounterClockwise } from '@phosphor-icons/react/dist/ssr';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import type { QuizResultBand } from '@/lib/quiz';
import { Button } from '@/components/ui/Button';

interface QuizResultProps {
  locale: Locale;
  dict: SiteDictionary;
  band: QuizResultBand;
  score: number;
  total: number;
  onRetake: () => void;
}

export function QuizResult({ locale, dict, band, score, total, onRetake }: QuizResultProps) {
  const copy = dict.quiz.bands[band];
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Completion replaces the questions, so keyboard/AT focus lands on the band heading.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="animate-pop-in flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-[var(--shadow-soft)] sm:p-8">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mint)] text-[var(--success)]"
      >
        <Confetti size={28} weight="duotone" aria-hidden="true" />
      </span>
      <p className="text-sm font-bold tracking-wide text-[var(--primary-text)] tabular-nums" role="status">
        {score} / {total}
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none sm:text-3xl">
        {copy.label}
      </h2>
      <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">{copy.body}</p>
      <p className="max-w-xl rounded-2xl bg-[var(--accent-soft)] p-4 text-sm font-semibold leading-relaxed">
        {dict.quiz.disclaimer}
      </p>
      <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button
          variant="primary"
          shine
          press
          href={`/${locale}/free-assessment#quizBand=${band}`}
        >
          {dict.quiz.bookCta}
        </Button>
        <Button variant="secondary" onClick={onRetake}>
          <ArrowCounterClockwise size={18} aria-hidden="true" />
          {dict.quiz.retake}
        </Button>
      </div>
    </div>
  );
}

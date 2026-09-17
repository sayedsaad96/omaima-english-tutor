import Link from 'next/link';
import { PartyPopper, RotateCcw } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import type { QuizResultBand } from '@/lib/quiz';

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
  return (
    <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:p-8">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mint)] text-[var(--success)]"
      >
        <PartyPopper size={28} />
      </span>
      <p className="text-sm font-bold uppercase tracking-widest text-[var(--primary)]" role="status">
        {score} / {total}
      </p>
      <h2 className="text-2xl font-extrabold sm:text-3xl">{copy.label}</h2>
      <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">{copy.body}</p>
      <p className="max-w-xl rounded-2xl bg-[var(--accent-soft)] p-4 text-sm font-semibold leading-relaxed">
        {dict.quiz.disclaimer}
      </p>
      <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          href={`/${locale}/free-assessment`}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {dict.quiz.bookCta}
        </Link>
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-7 py-3 text-base font-bold transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <RotateCcw size={18} aria-hidden="true" />
          {dict.quiz.retake}
        </button>
      </div>
    </div>
  );
}

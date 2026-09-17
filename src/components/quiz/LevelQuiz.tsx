'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { QUIZ_ANSWER_KEY, QUIZ_QUESTIONS } from '@/content/quiz';
import { getQuizBand, scoreQuiz } from '@/lib/quiz';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

type QuizState = {
  index: number;
  answers: (string | null)[];
  complete: boolean;
};

const initialState: QuizState = {
  index: 0,
  answers: Array<string | null>(QUIZ_QUESTIONS.length).fill(null),
  complete: false,
};

interface LevelQuizProps {
  locale: Locale;
  dict: SiteDictionary;
}

export function LevelQuiz({ locale, dict }: LevelQuizProps) {
  const [state, setState] = useState<QuizState>(initialState);
  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[state.index];
  const selected = state.answers[state.index];
  const isLast = state.index === total - 1;

  function select(choiceId: string) {
    setState((prev) => {
      const answers = [...prev.answers];
      answers[prev.index] = choiceId;
      return { ...prev, answers };
    });
  }

  function goNext() {
    if (!selected) return;
    if (isLast) {
      setState((prev) => ({ ...prev, complete: true }));
    } else {
      setState((prev) => ({ ...prev, index: prev.index + 1 }));
    }
  }

  function goBack() {
    setState((prev) => ({ ...prev, index: Math.max(0, prev.index - 1) }));
  }

  function retake() {
    setState({ index: 0, answers: Array<string | null>(total).fill(null), complete: false });
  }

  if (state.complete) {
    const filled = state.answers.map((answer) => answer ?? '');
    const score = scoreQuiz(filled, QUIZ_ANSWER_KEY);
    return (
      <QuizResult
        locale={locale}
        dict={dict}
        band={getQuizBand(score)}
        score={score}
        total={total}
        onRetake={retake}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <QuizProgress current={state.index + 1} total={total} label={dict.quiz.questionOf} />
      <div key={question.id} className="quiz-slide flex flex-col gap-4">
        <QuizQuestion
          prompt={question.prompt}
          choices={question.choices}
          name={`quiz-${question.id}`}
          selected={selected}
          onSelect={select}
          hint={dict.quiz.chooseAnswer}
        />
      </div>
      {!selected && (
        <p className="text-sm font-medium text-[var(--muted)]" role="note">
          {dict.quiz.needAnswer}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={state.index === 0}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[var(--border)] px-7 py-3 text-base font-bold transition enabled:hover:border-[var(--primary)] enabled:hover:text-[var(--primary-text)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {dict.quiz.back}
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!selected}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? dict.quiz.finish : dict.quiz.next}
        </button>
      </div>
    </div>
  );
}

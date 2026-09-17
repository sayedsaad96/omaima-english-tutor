'use client';

import { useState } from 'react';
import type { SiteDictionary } from '@/content/types';
import { assessmentSchema, type AssessmentData } from '@/lib/assessment';
import { AssessmentStep } from './AssessmentStep';
import { AssessmentSuccess } from './AssessmentSuccess';

const STEP_ORDER = [
  'learnerFor',
  'ageGroup',
  'goal',
  'currentLevel',
  'format',
  'name',
  'whatsapp',
] as const;

type StepKey = (typeof STEP_ORDER)[number];
type ChoiceKey = Exclude<StepKey, 'name' | 'whatsapp'>;

interface AssessmentFormProps {
  dict: SiteDictionary;
  /** Verified WhatsApp business number (digits). Empty string renders the copy fallback. */
  businessNumber: string;
}

export function AssessmentForm({ dict, businessNumber }: AssessmentFormProps) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Partial<AssessmentData>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<AssessmentData | null>(null);
  const copy = dict.assessment;
  const total = STEP_ORDER.length;
  const stepKey: StepKey = STEP_ORDER[step];
  const errorId = `assessment-${stepKey}-error`;

  function setChoice(key: ChoiceKey, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function setText(key: 'name' | 'whatsapp', value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function currentStepValid(): boolean {
    if (stepKey === 'name') {
      return (values.name ?? '').trim().length >= 2;
    }
    if (stepKey === 'whatsapp') {
      return /^\+?[0-9\s-]+$/.test((values.whatsapp ?? '').trim()) && (values.whatsapp ?? '').trim().length >= 8;
    }
    return Boolean(values[stepKey as ChoiceKey]);
  }

  function stepErrorMessage(): string {
    if (stepKey === 'name') return copy.errors.name;
    if (stepKey === 'whatsapp') return copy.errors.whatsapp;
    return copy.errors.required;
  }

  function goNext() {
    if (!currentStepValid()) {
      setError(stepErrorMessage());
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, total - 1));
  }

  function goBack() {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function submit() {
    const parsed = assessmentSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      if (fieldErrors.whatsapp) {
        setError(copy.errors.whatsapp);
      } else if (fieldErrors.name) {
        setError(copy.errors.name);
      } else {
        setError(copy.errors.required);
      }
      return;
    }
    setError(null);
    setDone(parsed.data);
  }

  function restart() {
    setStep(0);
    setValues({});
    setError(null);
    setDone(null);
  }

  if (done) {
    return <AssessmentSuccess dict={dict} data={done} businessNumber={businessNumber} onRestart={restart} />;
  }

  const isLast = step === total - 1;
  const question = copy.questions[stepKey];

  return (
    <div className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <AssessmentStep
        step={step + 1}
        total={total}
        stepLabel={copy.stepOf}
        questionLabel={question.label}
        hint={question.hint}
        error={error}
        errorId={errorId}
      >
        {'options' in question ? (
          <div className="mt-2 flex flex-col gap-3">
            {question.options.map((option) => {
              const checked = values[stepKey as ChoiceKey] === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-base font-medium transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--primary)] ${
                    checked
                      ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]'
                  }`}
                >
                  <input
                    type="radio"
                    name={`assessment-${stepKey}`}
                    value={option.value}
                    checked={checked}
                    onChange={() => setChoice(stepKey as ChoiceKey, option.value)}
                    className="h-5 w-5 shrink-0 accent-[#6c5ce7]"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            <label htmlFor={`assessment-${stepKey}`} className="sr-only">
              {question.label}
            </label>
            <input
              id={`assessment-${stepKey}`}
              name={stepKey}
              type={stepKey === 'whatsapp' ? 'tel' : 'text'}
              inputMode={stepKey === 'whatsapp' ? 'tel' : undefined}
              autoComplete={stepKey === 'whatsapp' ? 'tel' : 'name'}
              dir={stepKey === 'whatsapp' ? 'ltr' : undefined}
              placeholder={'placeholder' in question ? question.placeholder : undefined}
              value={stepKey === 'name' ? (values.name ?? '') : (values.whatsapp ?? '')}
              onChange={(event) =>
                setText(stepKey as 'name' | 'whatsapp', event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (isLast) submit();
                  else goNext();
                }
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className="min-h-[56px] w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-4 text-base focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
        )}
      </AssessmentStep>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[var(--border)] px-7 py-3 text-base font-bold transition enabled:hover:border-[var(--primary)] enabled:hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copy.back}
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            {copy.submit}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={stepKey !== 'name' && !values[stepKey as ChoiceKey]}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copy.next}
          </button>
        )}
      </div>
      <p className="text-center text-xs text-[var(--muted)]">{copy.privacyNote}</p>
    </div>
  );
}

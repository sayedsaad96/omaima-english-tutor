'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { SiteDictionary } from '@/content/types';
import { Button } from '@/components/ui/Button';
import {
  assessmentSchema,
  nameSchema,
  whatsappNumberSchema,
  type AssessmentData,
} from '@/lib/assessment';
import {
  EMPTY_BOOKING_CONTEXT,
  SERVICE_GOAL_SUGGESTION,
  hasBookingContext,
  getBookingContextSnapshot,
  subscribeBookingContext,
} from '@/lib/context';
import { AssessmentStep, type AssessmentQuestion } from './AssessmentStep';
import { AssessmentSuccess } from './AssessmentSuccess';

/**
 * Four screens covering the same seven booked fields as the original
 * seven-step flow (see C02 in the improvement plan): learner & age, goal &
 * level, format, then name & WhatsApp. Grouping is a documented, intentional
 * spec change; previously entered answers are preserved when going back.
 */
const SCREEN_FIELDS = [
  ['learnerFor', 'ageGroup'],
  ['goal', 'currentLevel'],
  ['format'],
  ['name', 'whatsapp'],
] as const;

type StepKey = (typeof SCREEN_FIELDS)[number][number];
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
  /** Which screen field the visible error belongs to (drives aria-describedby). */
  const [errorField, setErrorField] = useState<StepKey | null>(null);
  const [done, setDone] = useState<AssessmentData | null>(null);
  const context = useSyncExternalStore(
    subscribeBookingContext,
    getBookingContextSnapshot,
    () => EMPTY_BOOKING_CONTEXT,
  );
  const copy = dict.assessment;
  const total = SCREEN_FIELDS.length;
  const screenFields = SCREEN_FIELDS[step];
  const stepKey = screenFields[0];
  const isLast = step === total - 1;
  const errorId = 'assessment-screen-error';
  const stepHeadingRef = useRef<HTMLLegendElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const focusReady = useRef(false);

  // Booking context never reaches the server HTML, so the first paint shows
  // the plain form; useSyncExternalStore hydrates with the server snapshot
  // and swaps in the URL-derived value after hydration, safely.
  // The service origin may suggest a starting goal. It is applied once, is
  // still one of the standard options, and the learner can change it freely.
  const goalSuggestedRef = useRef(false);
  const suggestedService = context.service;
  useEffect(() => {
    if (!suggestedService || goalSuggestedRef.current) return;
    goalSuggestedRef.current = true;
    const goal = SERVICE_GOAL_SUGGESTION[suggestedService];
    setValues((prev) => (prev.goal ? prev : { ...prev, goal }));
  }, [suggestedService]);

  // Moving between screens shifts keyboard/AT focus to the first question.
  // The very first render must not steal focus from the page.
  useEffect(() => {
    if (!focusReady.current) {
      focusReady.current = true;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error, step]);

  function setChoice(key: ChoiceKey, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setErrorField(null);
  }

  function setText(key: 'name' | 'whatsapp', value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setErrorField(null);
  }

  function fieldValid(key: StepKey): boolean {
    if (key === 'name') {
      return nameSchema.safeParse(values.name ?? '').success;
    }
    if (key === 'whatsapp') {
      return whatsappNumberSchema.safeParse(values.whatsapp ?? '').success;
    }
    return Boolean(values[key as ChoiceKey]);
  }

  function firstInvalidField(): StepKey | null {
    for (const key of SCREEN_FIELDS[step]) {
      if (!fieldValid(key)) return key;
    }
    return null;
  }

  function screenComplete(): boolean {
    return firstInvalidField() === null;
  }

  function nameErrorMessage(value: string): string {
    return value.trim().length > 80 ? copy.errors.nameTooLong : copy.errors.name;
  }

  function fieldErrorMessage(key: StepKey, nameValue: string): string {
    if (key === 'name') return nameErrorMessage(nameValue);
    if (key === 'whatsapp') return copy.errors.whatsapp;
    return copy.errors.required;
  }

  function showFieldError(key: StepKey) {
    setError(fieldErrorMessage(key, values.name ?? ''));
    setErrorField(key);
  }

  function goNext() {
    const invalid = firstInvalidField();
    if (invalid) {
      showFieldError(invalid);
      return;
    }
    setError(null);
    setErrorField(null);
    setStep((prev) => Math.min(prev + 1, total - 1));
  }

  function goBack() {
    setError(null);
    setErrorField(null);
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function submit() {
    const candidate = {
      learnerFor: 'myself',
      ageGroup: 'kid',
      goal: 'conversation',
      currentLevel: 'notSure',
      format: 'online',
      name: '',
      whatsapp: '',
      ...values,
    };
    const parsed = assessmentSchema.safeParse(candidate);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const keys = SCREEN_FIELDS.flat() as StepKey[];
      const invalidIndex = keys.findIndex((key) =>
        Boolean(fieldErrors[key as keyof typeof fieldErrors]),
      );
      const badKey = keys[Math.max(invalidIndex, 0)];
      setStep(SCREEN_FIELDS.findIndex((screen) => (screen as readonly StepKey[]).includes(badKey)));
      showFieldError(badKey);
      return;
    }
    setError(null);
    setErrorField(null);
    setDone(parsed.data);
  }

  function restart() {
    setStep(0);
    setValues({});
    setError(null);
    setErrorField(null);
    setDone(null);
  }

  if (done) {
    return (
      <AssessmentSuccess
        dict={dict}
        data={done}
        businessNumber={businessNumber}
        context={context}
        onRestart={restart}
      />
    );
  }

  const showBanner = hasBookingContext(context);
  const questions: AssessmentQuestion[] = screenFields.map((key) => {
    const question = copy.questions[key];
    const isInvalid = errorField === key;
    const describedBy = isInvalid ? errorId : undefined;
    const content =
      'options' in question ? (
        <div className="mt-2 flex flex-col gap-3">
          {question.options.map((option) => {
            const checked = values[key as ChoiceKey] === option.value;
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
                  name={`assessment-${key}`}
                  value={option.value}
                  checked={checked}
                  onChange={() => setChoice(key as ChoiceKey, option.value)}
                  aria-describedby={describedBy}
                  className="h-5 w-5 shrink-0 accent-[var(--primary)]"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          <label htmlFor={`assessment-${key}`} className="sr-only">
            {question.label}
          </label>
          <input
            id={`assessment-${key}`}
            name={key}
            type={key === 'whatsapp' ? 'tel' : 'text'}
            inputMode={key === 'whatsapp' ? 'tel' : undefined}
            autoComplete={key === 'whatsapp' ? 'tel' : 'name'}
            dir={key === 'whatsapp' ? 'ltr' : undefined}
            placeholder={'placeholder' in question ? question.placeholder : undefined}
            value={key === 'name' ? (values.name ?? '') : (values.whatsapp ?? '')}
            onChange={(event) => setText(key as 'name' | 'whatsapp', event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submit();
              }
            }}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
            className={`min-h-[56px] w-full rounded-2xl border-2 bg-[var(--surface)] px-4 text-base focus:outline-none ${
              isInvalid
                ? 'border-[var(--danger-text)]'
                : 'border-[var(--border)] focus:border-[var(--primary)]'
            }`}
          />
        </div>
      );

    return { key, label: question.label, hint: question.hint, content };
  });

  return (
    <div className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      {showBanner ? (
        <div
          role="note"
          className="rounded-2xl border border-[var(--primary-soft)] bg-[var(--primary-soft)] p-4 text-sm leading-relaxed"
        >
          <p className="font-bold text-[var(--ink)]">{copy.contextBanner.title}</p>
          <ul className="mt-1 flex flex-col gap-1 text-[var(--ink)]">
            {context.service ? (
              <li>
                {copy.contextBanner.service} {dict.services.items[context.service].title}
              </li>
            ) : null}
            {context.path ? (
              <li>
                {copy.contextBanner.path} {dict.paths.items[context.path].name}
              </li>
            ) : null}
            {context.quizBand ? (
              <li>
                {copy.contextBanner.quizBand} {dict.quiz.bands[context.quizBand].label}
              </li>
            ) : null}
          </ul>
          <p className="mt-1 text-xs font-medium text-[var(--muted)]">
            {copy.contextBanner.hint}
          </p>
        </div>
      ) : null}

      <div key={stepKey} className="quiz-slide">
      <AssessmentStep
        step={step + 1}
        total={total}
        stepLabel={copy.stepOf}
        questions={questions}
        error={error}
        errorId={errorId}
        headingRef={stepHeadingRef}
        errorRef={errorRef}
      />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="secondary"
          allowsDisabled
          disabled={step === 0}
          onClick={goBack}
        >
          {copy.back}
        </Button>
        {isLast ? (
          <Button variant="primary" shine press onClick={submit}>
            {copy.submit}
          </Button>
        ) : (
          <Button
            variant="primary"
            press
            allowsDisabled
            disabled={!screenComplete()}
            onClick={goNext}
          >
            {copy.next}
          </Button>
        )}
      </div>
      <p className="text-center text-xs text-[var(--muted)]">{copy.privacyNote}</p>
    </div>
  );
}

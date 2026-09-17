import type { ReactNode } from 'react';

interface AssessmentStepProps {
  step: number;
  total: number;
  stepLabel: string;
  questionLabel: string;
  hint?: string;
  error?: string | null;
  errorId: string;
  children: ReactNode;
}

/** One-question-per-step wrapper with progress, group semantics and adjacent error text. */
export function AssessmentStep({
  step,
  total,
  stepLabel,
  questionLabel,
  hint,
  error,
  errorId,
  children,
}: AssessmentStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-[var(--muted)]">
          {stepLabel} {step} / {total}
        </p>
        <div
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`${stepLabel} ${step} / ${total}`}
          className="h-2.5 overflow-hidden rounded-full bg-[var(--border)]"
        >
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-all"
            style={{ width: `${Math.round((step / total) * 100)}%` }}
          />
        </div>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xl font-bold leading-snug sm:text-2xl">{questionLabel}</legend>
        {hint ? <p className="text-sm font-medium text-[var(--muted)]">{hint}</p> : null}
        {children}
        {error ? (
          <p role="alert" id={errorId} className="form-error">
            {error}
          </p>
        ) : null}
      </fieldset>
    </div>
  );
}

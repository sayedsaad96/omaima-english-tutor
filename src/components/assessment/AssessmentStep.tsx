import type { ReactNode, RefObject } from 'react';
import { StepProgress } from '@/components/ui/StepProgress';

export interface AssessmentQuestion {
  /** Stable field key (used as React key). */
  key: string;
  /** Question title, rendered as the fieldset legend. */
  label: string;
  hint?: string;
  /** The answer controls (radio stack or text input). */
  content: ReactNode;
}

interface AssessmentStepProps {
  step: number;
  total: number;
  stepLabel: string;
  /**
   * One visible question block per entry. A screen may bundle two questions,
   * so the first legend carries the focus target for step changes and the
   * error paragraph stays adjacent to all questions of the screen.
   */
  questions: AssessmentQuestion[];
  error?: string | null;
  errorId: string;
  /** Receives programmatic focus when the assessment changes step. */
  headingRef?: RefObject<HTMLLegendElement | null>;
  /** Receives programmatic focus when a step validation error appears. */
  errorRef?: RefObject<HTMLParagraphElement | null>;
}

/** Multi-question screen wrapper with progress, group semantics and error text. */
export function AssessmentStep({
  step,
  total,
  stepLabel,
  questions,
  error,
  errorId,
  headingRef,
  errorRef,
}: AssessmentStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <StepProgress current={step} total={total} label={stepLabel} />
      {questions.map((question, index) => (
        <fieldset key={question.key} className="mt-2 flex flex-col gap-2 first:mt-0">
          <legend
            ref={index === 0 ? headingRef : undefined}
            tabIndex={index === 0 && headingRef ? -1 : undefined}
            className="text-xl font-bold leading-snug outline-none sm:text-2xl"
          >
            {question.label}
          </legend>
          {question.hint ? (
            <p className="text-sm font-medium text-[var(--muted)]">{question.hint}</p>
          ) : null}
          {question.content}
        </fieldset>
      ))}
      {error ? (
        <p
          role="alert"
          id={errorId}
          ref={errorRef}
          tabIndex={errorRef ? -1 : undefined}
          className="form-error outline-none"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

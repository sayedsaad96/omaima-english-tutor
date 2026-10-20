import type { RefObject } from 'react';

interface Choice {
  id: string;
  label: string;
}

interface QuizQuestionProps {
  prompt: string;
  choices: readonly Choice[];
  name: string;
  selected: string | null;
  onSelect: (choiceId: string) => void;
  hint: string;
  /** Receives programmatic focus when the quiz changes question. */
  headingRef?: RefObject<HTMLLegendElement | null>;
}

export function QuizQuestion({
  prompt,
  choices,
  name,
  selected,
  onSelect,
  hint,
  headingRef,
}: QuizQuestionProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend
        ref={headingRef}
        tabIndex={headingRef ? -1 : undefined}
        className="text-xl font-bold leading-snug outline-none sm:text-2xl"
      >
        {/* The question text is English in both locales — declared explicitly so
            the bidi algorithm and assistive tech treat it as English content. */}
        <span lang="en" dir="ltr" className="inline-block">
          {prompt}
        </span>
      </legend>
      <p className="text-sm font-medium text-[var(--muted)]">{hint}</p>
      <div className="flex flex-col gap-3">
        {choices.map((choice) => {
          const checked = selected === choice.id;
          return (
            <label
              key={choice.id}
              className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-base font-medium transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--primary)] ${
                checked
                  ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={choice.id}
                checked={checked}
                onChange={() => onSelect(choice.id)}
                className="h-5 w-5 shrink-0 accent-[var(--primary)]"
              />
              <span lang="en" dir="ltr">
                {choice.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

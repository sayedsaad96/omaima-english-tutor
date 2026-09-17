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
}

export function QuizQuestion({ prompt, choices, name, selected, onSelect, hint }: QuizQuestionProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-xl font-bold leading-snug sm:text-2xl">{prompt}</legend>
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
                className="h-5 w-5 shrink-0 accent-[#6c5ce7]"
              />
              <span dir="auto">{choice.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

interface QuizProgressProps {
  current: number;
  total: number;
  label: string;
}

export function QuizProgress({ current, total, label }: QuizProgressProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
        <span>
          {label} {current} / {total}
        </span>
        <span aria-hidden="true">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`${label} ${current} / ${total}`}
        className="h-2.5 overflow-hidden rounded-full bg-[var(--border)]"
      >
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

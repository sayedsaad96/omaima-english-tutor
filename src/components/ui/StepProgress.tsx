interface StepProgressProps {
  current: number;
  total: number;
  /** Dictionary label such as "Question" or "Step". */
  label: string;
}

/** Shared progress indicator for the level quiz and the booking assessment. */
export function StepProgress({ current, total, label }: StepProgressProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)] tabular-nums">
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
          className="progress-fill h-full rounded-full bg-[var(--primary)] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

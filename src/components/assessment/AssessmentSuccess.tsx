'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ChatCircle } from '@phosphor-icons/react/dist/ssr';
import type { SiteDictionary } from '@/content/types';
import type { AssessmentData } from '@/lib/assessment';
import type { BookingContext } from '@/lib/context';
import { buildAssessmentMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

interface AssessmentSuccessProps {
  dict: SiteDictionary;
  data: AssessmentData;
  businessNumber: string;
  /** Visit context (service/path/quiz band) — travels as guidance in the message, never in the URL. */
  context?: BookingContext;
  onRestart: () => void;
}

function resolveOptionLabel(
  options: { value: string; label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function AssessmentSuccess({ dict, data, businessNumber, context, onRestart }: AssessmentSuccessProps) {
  type CopyState = 'idle' | 'busy' | 'success' | 'failure';
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Completion replaces the form, so keyboard/AT focus lands on the result heading.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  const copy = dict.assessment;
  const message = buildAssessmentMessage(data, dict.locale, dict, context);
  const hasNumber = businessNumber.replace(/\D/g, '') !== '';
  const whatsappUrl = hasNumber ? buildWhatsAppUrl(businessNumber, message) : null;

  const summary: { label: string; value: string }[] = [
    { label: copy.questions.learnerFor.label, value: resolveOptionLabel(copy.questions.learnerFor.options, data.learnerFor) },
    { label: copy.questions.ageGroup.label, value: resolveOptionLabel(copy.questions.ageGroup.options, data.ageGroup) },
    { label: copy.questions.goal.label, value: resolveOptionLabel(copy.questions.goal.options, data.goal) },
    { label: copy.questions.currentLevel.label, value: resolveOptionLabel(copy.questions.currentLevel.options, data.currentLevel) },
    { label: copy.questions.format.label, value: resolveOptionLabel(copy.questions.format.options, data.format) },
    { label: copy.questions.name.label, value: data.name },
    { label: copy.questions.whatsapp.label, value: data.whatsapp },
  ];

  async function copyMessage() {
    if (copyState === 'busy') return;
    setCopyState('busy');
    try {
      if (!navigator.clipboard?.writeText) {
        setCopyState('failure');
        return;
      }
      await navigator.clipboard.writeText(message);
      setCopyState('success');
    } catch {
      setCopyState('failure');
    }
  }

  return (
    <div className="animate-pop-in flex flex-col gap-5">
      <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--mint)] p-5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--success)] text-white"
        >
          <Check size={22} weight="bold" />
        </span>
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-extrabold outline-none">
            {copy.success.title}
          </h2>
          <p className="text-sm font-medium sm:text-base">{copy.success.body}</p>
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
        <h3 className="text-base font-bold">{copy.success.summaryTitle}</h3>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {summary.map((row) => (
            <div key={row.label} className="rounded-xl bg-[var(--bg)] px-3 py-2">
              <dt className="text-xs font-semibold tracking-wide text-[var(--muted)]">
                {row.label}
              </dt>
              <dd className="text-sm font-bold">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-3">
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-7 py-3 text-base font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--whatsapp)]"
          >
            <ChatCircle size={20} aria-hidden="true" />
            {copy.success.continueWhatsapp}
          </a>
        ) : (
          <p className="rounded-2xl bg-[var(--accent-soft)] p-4 text-sm font-semibold leading-relaxed">
            {copy.success.noNumberNote}
          </p>
        )}
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="assessment-message">
          {copy.success.copyMessage}
          <textarea
            id="assessment-message"
            readOnly
            rows={9}
            value={message}
            onFocus={(event) => event.target.select()}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-normal leading-relaxed"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={copyMessage}
            aria-busy={copyState === 'busy' || undefined}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-7 py-3 text-base font-bold transition hover:border-[var(--primary)] hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            <Copy size={18} aria-hidden="true" />
            {copyState === 'success' ? copy.success.copied : copy.success.copyMessage}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full px-7 py-3 text-base font-bold text-[var(--muted)] transition hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            {copy.success.bookAgain}
          </button>
        </div>
        {copyState === 'success' && (
          <p role="status" className="text-sm font-semibold text-[var(--success-dark)]">
            {copy.success.copied}
          </p>
        )}
        {copyState === 'failure' && (
          <p role="alert" className="text-sm font-semibold text-[var(--danger-text)]">
            {copy.success.copyFailed}
          </p>
        )}
        <p className="text-sm text-[var(--muted)]">{copy.success.fallbackNote}</p>
      </div>
    </div>
  );
}

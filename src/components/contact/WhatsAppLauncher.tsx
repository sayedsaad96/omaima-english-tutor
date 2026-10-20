'use client';

import { useState } from 'react';
import { X as XIcon, ChatCircle } from '@phosphor-icons/react/dist/ssr';
import type { SiteDictionary } from '@/content/types';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppLauncherProps {
  dict: SiteDictionary;
  businessNumber: string;
}

/** Compact persistent WhatsApp entry point. Hidden until a business number is configured. */
export function WhatsAppLauncher({ dict, businessNumber }: WhatsAppLauncherProps) {
  const [open, setOpen] = useState(false);
  const digits = businessNumber.replace(/\D/g, '');
  if (digits === '') {
    return null;
  }

  return (
    <div className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-2">
      {open && (
        <div
          role="dialog"
          aria-label={dict.whatsapp.greeting}
          className="animate-pop-in w-64 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-lift)]"
        >
          <p className="px-2 pb-2 pt-1 text-sm font-bold">{dict.whatsapp.greeting}</p>
          <ul className="flex flex-col gap-1">
            {dict.whatsapp.intents.map((intent) => (
              <li key={intent.value}>
                <a
                  href={buildWhatsAppUrl(digits, intent.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[var(--mint)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  {intent.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={dict.whatsapp.label}
        className="btn-press relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp)] text-white shadow-[var(--shadow-lift)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--whatsapp)]"
      >
        {!open && (
          <span aria-hidden="true" className="absolute -end-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]" />
          </span>
        )}
        {open ? <XIcon size={24} aria-hidden="true" /> : <ChatCircle size={26} aria-hidden="true" />}
      </button>
    </div>
  );
}

'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
}

export function Accordion({ items, defaultOpen = null }: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpen);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-button-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border-2 transition ${
              isOpen ? 'border-[var(--primary)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)]'
            }`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-start text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                {item.question}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-base leading-relaxed text-[var(--muted)]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Baby, GraduationCap, Briefcase, Handshake as HeartHandshake } from '@phosphor-icons/react/dist/ssr';
import type { AudienceKey } from '@/content/types';
import type { SiteDictionary } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const icons: Record<AudienceKey, typeof Baby> = {
  kids: Baby,
  teens: GraduationCap,
  adults: Briefcase,
  child: HeartHandshake,
};

const order: AudienceKey[] = ['kids', 'teens', 'adults', 'child'];

interface AudienceSelectorProps {
  dict: SiteDictionary;
  selected: AudienceKey | null;
  onSelect: (key: AudienceKey) => void;
}

export function AudienceSelector({ dict, selected, onSelect }: AudienceSelectorProps) {
  return (
    <section aria-labelledby="audience-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          id="audience-heading"
          eyebrow={dict.audience.intro.eyebrow}
          title={dict.audience.intro.title}
          body={dict.audience.intro.body}
          align="center"
        />
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label={dict.audience.intro.title}>
        {order.map((key, index) => {
          const option = dict.audience.options[key];
          const Icon = icons[key];
          const isSelected = selected === key;
          return (
            <Reveal key={key} delay={index * 70}>
              <button
                type="button"
                onClick={() => onSelect(key)}
                aria-pressed={isSelected}
                data-audience-option={key}
                className={`card-lift btn-press flex min-h-[140px] w-full flex-col items-start gap-2 rounded-[var(--radius-card)] border-2 p-5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                  isSelected
                    ? 'border-[var(--primary)] bg-[var(--primary-soft)] shadow-[var(--shadow-lift)]'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    isSelected ? 'bg-[var(--primary)] text-white' : 'bg-[var(--primary-soft)] text-[var(--primary-text)]'
                  }`}
                >
                  <Icon size={22} weight="duotone" />
                </span>
                <span className="text-base font-bold">{option.title}</span>
                <span className="text-sm leading-relaxed text-[var(--muted)]">{option.body}</span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function useAudienceSelection() {
  const [selected, setSelected] = useState<AudienceKey | null>(null);
  return { selected, onSelect: setSelected };
}

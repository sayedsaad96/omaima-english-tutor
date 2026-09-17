import { Check } from 'lucide-react';
import type { SiteDictionary } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function WhyOmaimaSection({ dict }: { dict: SiteDictionary }) {
  return (
    <section aria-labelledby="why-heading" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow={dict.why.intro.eyebrow}
            title={dict.why.intro.title}
            body={dict.why.intro.body}
          />
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.why.items.map((item, index) => (
            <Reveal key={item.title} as="li" className={index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <div className="flex h-full flex-col gap-2 rounded-[var(--radius-card)] bg-[var(--bg)] p-5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mint)] text-[var(--success)]"
                >
                  <Check size={20} strokeWidth={3} />
                </span>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

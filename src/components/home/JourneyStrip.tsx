import type { SiteDictionary } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function JourneyStrip({ dict }: { dict: SiteDictionary }) {
  return (
    <section aria-labelledby="journey-heading" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal>
          <SectionHeading
            id="journey-heading"
            eyebrow={dict.journey.intro.eyebrow}
            title={dict.journey.intro.title}
            body={dict.journey.intro.body}
            align="center"
          />
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {dict.journey.steps.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 90} className="relative rounded-[var(--radius-card)] bg-[var(--bg)] p-5 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-base font-bold text-white"
              >
                {index + 1}
              </span>
              <p className="mt-3 text-base font-bold">{step.title}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

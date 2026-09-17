import type { SiteDictionary } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function TeachingMethodSection({ dict }: { dict: SiteDictionary }) {
  return (
    <section aria-labelledby="method-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          id="method-heading"
          eyebrow={dict.method.intro.eyebrow}
          title={dict.method.intro.title}
          body={dict.method.intro.body}
          align="center"
        />
      </Reveal>
      <ol className="relative mx-auto mt-10 max-w-3xl">
        <span
          aria-hidden="true"
          className="absolute bottom-6 start-[27px] top-6 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--border)] to-[var(--accent)]"
        />
        {dict.method.steps.map((step, index) => (
          <Reveal key={step.title} as="li" delay={index * 60} className="relative flex gap-4 pb-6 last:pb-0">
            <span
              aria-hidden="true"
              className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[var(--bg)] bg-[var(--primary)] text-lg font-extrabold text-white"
            >
              {index + 1}
            </span>
            <div className="flex-1 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

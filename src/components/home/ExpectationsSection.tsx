import { Sparkle } from '@phosphor-icons/react/dist/ssr';
import type { SiteDictionary } from '@/content/types';
import { testimonials } from '@/content/social';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function ExpectationsSection({ dict }: { dict: SiteDictionary }) {
  return (
    <section aria-labelledby="expectations-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          id="expectations-heading"
          eyebrow={dict.expectations.intro.eyebrow}
          title={dict.expectations.intro.title}
          body={dict.expectations.intro.body}
        />
      </Reveal>
      {testimonials.length > 0 ? (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.id} as="li">
              <figure className="card-lift flex h-full flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <blockquote className="text-base leading-relaxed">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-auto text-sm font-bold">
                  {testimonial.name}
                  <span className="block text-xs font-medium text-[var(--muted)]">
                    {testimonial.context}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {dict.expectations.items.map((item, index) => (
            <Reveal key={item.title} as="li" delay={(index % 2) * 80}>
              <div className="card-lift flex h-full items-start gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]"
                >
                  <Sparkle size={18} weight="duotone" />
                </span>
                <div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      )}
      {testimonials.length === 0 && (
        <Reveal>
          <p className="mt-6 text-sm text-[var(--muted)]">{dict.expectations.note}</p>
        </Reveal>
      )}
    </section>
  );
}

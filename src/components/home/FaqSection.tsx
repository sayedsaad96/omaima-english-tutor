import type { SiteDictionary } from '@/content/types';
import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function FaqSection({ dict }: { dict: SiteDictionary }) {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          id="faq-heading"
          eyebrow={dict.faq.intro.eyebrow}
          title={dict.faq.intro.title}
          body={dict.faq.intro.body}
          align="center"
        />
      </Reveal>
      <Reveal className="mt-8">
        <Accordion
          items={dict.faq.items.map((item, index) => ({
            id: `faq-${index}`,
            question: item.q,
            answer: item.a,
          }))}
        />
      </Reveal>
    </section>
  );
}

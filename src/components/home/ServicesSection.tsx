import Link from 'next/link';
import { User, MessagesSquare, Backpack, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { AudienceKey, ServiceKey, SiteDictionary } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const serviceMeta: Record<
  ServiceKey,
  { icon: typeof User; accent: string; iconWrap: string; anchor: string }
> = {
  private: {
    icon: User,
    accent: 'bg-[var(--primary-soft)]',
    iconWrap: 'bg-[var(--primary)] text-white',
    anchor: 'private-lessons',
  },
  conversation: {
    icon: MessagesSquare,
    accent: 'bg-[var(--accent-soft)]',
    iconWrap: 'bg-[var(--accent)] text-white',
    anchor: 'conversation',
  },
  school: {
    icon: Backpack,
    accent: 'bg-[var(--mint)]',
    iconWrap: 'bg-[var(--success)] text-white',
    anchor: 'school-support',
  },
  exam: {
    icon: Target,
    accent: 'bg-[var(--primary-soft)]',
    iconWrap: 'bg-[var(--ink)] text-white',
    anchor: 'exam-prep',
  },
};

const order: ServiceKey[] = ['private', 'conversation', 'school', 'exam'];

const relevance: Record<AudienceKey, ServiceKey[]> = {
  kids: ['private', 'school'],
  teens: ['school', 'exam', 'private'],
  adults: ['conversation', 'private', 'exam'],
  child: ['school', 'private'],
};

interface ServicesSectionProps {
  locale: Locale;
  dict: SiteDictionary;
  selectedAudience: AudienceKey | null;
}

export function ServicesSection({ locale, dict, selectedAudience }: ServicesSectionProps) {
  const relevant = selectedAudience ? relevance[selectedAudience] : [];
  const isRtl = dict.dir === 'rtl';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-labelledby="services-heading"
      data-audience={selectedAudience ?? 'all'}
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <Reveal>
        <SectionHeading
          id="services-heading"
          eyebrow={dict.services.intro.eyebrow}
          title={dict.services.intro.title}
          body={dict.services.intro.body}
        />
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {order.map((key) => {
          const service = dict.services.items[key];
          const meta = serviceMeta[key];
          const Icon = meta.icon;
          const emphasized = relevant.includes(key);
          return (
            <Reveal key={key}>
              <article
                data-service={key}
                data-emphasized={emphasized ? 'true' : 'false'}
                className={`flex h-full flex-col gap-4 rounded-[var(--radius-card)] border-2 p-6 transition ${meta.accent} ${
                  emphasized
                    ? 'border-[var(--primary)] shadow-[var(--shadow-soft)]'
                    : 'border-transparent hover:border-[var(--primary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${meta.iconWrap}`}
                  >
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{service.title}</h3>
                    <p className="text-xs font-semibold text-[var(--muted)]">{service.learners}</p>
                  </div>
                </div>
                <p className="text-base font-semibold italic">{service.tagline}</p>
                <ul className="flex flex-wrap gap-2" aria-label={service.title}>
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-full bg-[var(--surface)] px-3 py-1 text-sm font-medium"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/lessons#${meta.anchor}`}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-2 text-base font-bold text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  {dict.services.cta}
                  <Arrow size={18} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

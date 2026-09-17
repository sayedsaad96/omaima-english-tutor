'use client';

import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { AudienceSelector, useAudienceSelection } from './AudienceSelector';
import { JourneyStrip } from './JourneyStrip';
import { ServicesSection } from './ServicesSection';

interface HomeTopProps {
  locale: Locale;
  dict: SiteDictionary;
}

/**
 * Client boundary sharing audience selection between the selector and
 * services highlight, preserving the approved section order:
 * audience → journey → services.
 */
export function HomeTop({ locale, dict }: HomeTopProps) {
  const { selected, onSelect } = useAudienceSelection();
  return (
    <>
      <AudienceSelector dict={dict} selected={selected} onSelect={onSelect} />
      <JourneyStrip dict={dict} />
      <ServicesSection locale={locale} dict={dict} selectedAudience={selected} />
    </>
  );
}

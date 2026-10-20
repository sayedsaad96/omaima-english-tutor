'use client';

import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { AudienceSelector, useAudienceSelection } from './AudienceSelector';
import { ServicesSection } from './ServicesSection';

interface HomeTopProps {
  locale: Locale;
  dict: SiteDictionary;
}

/**
 * Client boundary sharing audience selection between the selector and
 * services highlight. The surrounding section order lives in the home page;
 * the old journey strip was merged into the teaching-method section (C05),
 * which already expresses the same three steps in more detail.
 */
export function HomeTop({ locale, dict }: HomeTopProps) {
  const { selected, onSelect } = useAudienceSelection();
  return (
    <>
      <AudienceSelector dict={dict} selected={selected} onSelect={onSelect} />
      <ServicesSection locale={locale} dict={dict} selectedAudience={selected} />
    </>
  );
}

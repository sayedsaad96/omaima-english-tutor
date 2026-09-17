import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';

export interface NavLink {
  href: string;
  label: string;
}

export function buildNavLinks(locale: Locale, nav: SiteDictionary['nav']): NavLink[] {
  return [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/lessons`, label: nav.lessons },
    { href: `/${locale}/level-quiz`, label: nav.quiz },
    { href: `/${locale}/free-assessment`, label: nav.assessment },
  ];
}

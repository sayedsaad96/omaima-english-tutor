import type { Locale } from './locales';
import type { SiteDictionary } from '@/content/types';
import { en } from '@/content/en';
import { ar } from '@/content/ar';

const dictionaries: Record<Locale, SiteDictionary> = { en, ar };

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale];
}

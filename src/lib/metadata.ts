import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/i18n/locales';

interface LocalizedMetadataInput {
  locale: Locale;
  /** Locale-relative path, e.g. '' for home, '/about' for the about page. */
  path: string;
  title: string;
  description: string;
}

export function localizedMetadata({ locale, path, title, description }: LocalizedMetadataInput): Metadata {
  const base = siteConfig.baseUrl.replace(/\/$/, '');
  const url = `${base}/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/en${path}`,
        ar: `${base}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}

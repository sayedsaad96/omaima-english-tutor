import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { locales } from '@/i18n/locales';

export const dynamic = 'force-static';

const paths = ['', '/about', '/lessons', '/level-quiz', '/free-assessment', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl.replace(/\/$/, '');
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}

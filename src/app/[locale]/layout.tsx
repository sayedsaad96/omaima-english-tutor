import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, Tajawal } from 'next/font/google';
import { isLocale, locales } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { siteConfig } from '@/config/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { WhatsAppLauncher } from '@/components/contact/WhatsAppLauncher';

const englishFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const arabicFont = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const fontClass = locale === 'ar' ? arabicFont.className : englishFont.className;

  return (
    <div
      data-testid="locale-root"
      lang={locale}
      dir={dict.dir}
      className={`${fontClass} flex min-h-full flex-col bg-[var(--bg)] text-[var(--ink)]`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        {locale === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}
      </a>
      <SiteHeader locale={locale} dict={dict} />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter locale={locale} dict={dict} />
      <WhatsAppLauncher dict={dict} businessNumber={siteConfig.whatsappNumber} />
    </div>
  );
}

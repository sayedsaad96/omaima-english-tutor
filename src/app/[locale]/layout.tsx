import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, Tajawal } from 'next/font/google';
import { isLocale, locales } from '@/i18n/locales';
import { getDictionary } from '@/i18n/getDictionary';
import { siteConfig } from '@/config/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { WhatsAppLauncher } from '@/components/contact/WhatsAppLauncher';
import { revealInitScript, themeInitScript } from '../document-init';
import '../globals.css';

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

export const metadata: Metadata = {
  title: 'Omaima Ashour — English Tutor',
  description:
    'Personalized online English lessons for kids, teens and adults. Book a free assessment or take the 2-minute level quiz.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf7f1' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1719' },
  ],
};

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
    <html
      lang={locale}
      dir={dict.dir}
      className="h-full"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <Script
          id="omaima-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script
          id="omaima-reveal-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: revealInitScript }}
        />
        <div
          data-testid="locale-root"
          className={`${fontClass} theme-fade flex min-h-full flex-col bg-[var(--bg)] text-[var(--ink)]`}
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
      </body>
    </html>
  );
}

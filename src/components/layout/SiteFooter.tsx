import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { siteConfig } from '@/config/site';
import { buildNavLinks } from '@/lib/nav';

interface SiteFooterProps {
  locale: Locale;
  dict: SiteDictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const links = buildNavLinks(locale, dict.nav);
  const year = new Date().getFullYear();
  const whatsappNumber = siteConfig.whatsappNumber.replace(/\D/g, '');
  const email = siteConfig.email;

  return (
    <footer className="relative mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div
        aria-hidden="true"
        className="animate-pan absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-base font-bold text-[var(--ink)]">{dict.footer.brand}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{dict.footer.tagline}</p>
        </div>
        <nav aria-label={dict.footer.explore}>
          <p className="text-sm font-bold text-[var(--muted)]">
            {dict.footer.explore}
          </p>
          <ul className="mt-3 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--primary-text)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/privacy`}
                className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--primary-text)]"
              >
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold text-[var(--muted)]">
            {dict.footer.contact}
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            {whatsappNumber !== '' && (
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    locale === 'ar' ? 'أهلاً أميمة!' : 'Hello Omaima!',
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink)] hover:text-[var(--primary-text)]"
                >
                  {dict.footer.whatsapp}
                </a>
              </li>
            )}
            {email !== '' && (
              <li>
                <a href={`mailto:${email}`} className="text-[var(--ink)] hover:text-[var(--primary-text)]">
                  {dict.footer.email}: {email}
                </a>
              </li>
            )}
            {whatsappNumber === '' && email === '' && (
              <li className="font-normal text-[var(--muted)]">
                {locale === 'ar' ? 'قنوات التواصل تُضاف قبل الإطلاق.' : 'Contact channels are added before launch.'}
              </li>
            )}
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {dict.footer.language}:{' '}
            <Link href="/en" hrefLang="en" className="font-semibold hover:text-[var(--primary-text)]">
              English
            </Link>{' '}
            •{' '}
            <Link href="/ar" hrefLang="ar" className="font-semibold hover:text-[var(--primary-text)]">
              العربية
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-[var(--muted)] sm:px-6">
          © {year} {dict.footer.brand}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}

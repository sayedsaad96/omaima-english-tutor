'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { buildNavLinks } from '@/lib/nav';

interface MobileNavProps {
  locale: Locale;
  dict: SiteDictionary;
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ locale, dict, open, onClose }: MobileNavProps) {
  if (!open) return null;
  const links = buildNavLinks(locale, dict.nav);
  return (
    <div
      id="mobile-nav"
      className="animate-drop-in border-t border-[var(--border)] bg-[var(--surface)] px-4 pb-6 pt-2 md:hidden"
    >
      <nav aria-label={dict.nav.menu}>
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-[var(--ink)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary-text)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        href={`/${locale}/free-assessment`}
        onClick={onClose}
        className="btn-shine mt-3 flex min-h-[48px] items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-base font-semibold text-white"
      >
        {dict.nav.book}
      </Link>
    </div>
  );
}

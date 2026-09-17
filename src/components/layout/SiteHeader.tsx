'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { buildNavLinks } from '@/lib/nav';

interface SiteHeaderProps {
  locale: Locale;
  dict: SiteDictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = buildNavLinks(locale, dict.nav);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`glass sticky top-0 z-40 border-b transition-shadow duration-300 ${
        scrolled
          ? 'border-[var(--border)] shadow-[var(--shadow-soft)]'
          : 'border-transparent'
      }`}
    >  <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex min-h-[44px] items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          aria-label={`${dict.brand.name} — ${dict.nav.home}`}
        >
          <span
            aria-hidden="true"
            className="animate-pan flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-lg font-bold text-white"
          >
            {locale === 'ar' ? 'أ' : 'O'}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-[var(--ink)] sm:text-base">
              {dict.brand.name}
            </span>
            <span className="block text-xs font-medium text-[var(--muted)]">
              {dict.brand.role}
            </span>
          </span>
        </Link>

        <nav aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Primary'} className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
          <Link
            href={`/${locale}/free-assessment`}
            className="btn-shine btn-press hidden min-h-[44px] items-center justify-center rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] lg:inline-flex"
          >
            {dict.nav.book}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] md:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <MobileNav locale={locale} dict={dict} open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/locales';
import { switchLocalePath } from '@/i18n/path';
import {
  EMPTY_BOOKING_CONTEXT,
  hasBookingContext,
  getBookingContextSnapshot,
  subscribeBookingContext,
  serializeBookingContext,
} from '@/lib/context';

interface LocaleSwitcherProps {
  /** Override for tests / SSR previews. Defaults to the live pathname. */
  pathname?: string;
  className?: string;
}

function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return first && isLocale(first) ? first : 'en';
}

export function LocaleSwitcher({ pathname: pathnameProp, className = '' }: LocaleSwitcherProps) {
  const livePathname = usePathname();
  const pathname = pathnameProp ?? livePathname ?? '/en';
  const current = localeFromPath(pathname);
  // Booking context lives only in the URL, so it is derived through
  // useSyncExternalStore (hydration-safe) and re-serialized through the
  // allow-list — unknown parameters are never carried over.
  const context = useSyncExternalStore(
    subscribeBookingContext,
    getBookingContextSnapshot,
    () => EMPTY_BOOKING_CONTEXT,
  );
  const contextSuffix = hasBookingContext(context) ? serializeBookingContext(context) : '';

  const options: { locale: Locale; short: string; label: string }[] = [
    { locale: 'en', short: 'EN', label: 'English' },
    { locale: 'ar', short: 'AR', label: 'العربية' },
  ];

  return (
    <div
      role="group"
      aria-label={current === 'ar' ? 'اللغة' : 'Language'}
      className={`inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 text-sm font-semibold ${className}`}
    >
      {options.map((option) => {
        const isCurrent = option.locale === current;
        return (
          <Link
            key={option.locale}
            href={`${switchLocalePath(pathname, option.locale)}${contextSuffix}`}
            hrefLang={option.locale}
            aria-current={isCurrent ? 'true' : undefined}
            aria-label={option.label}
            className={`rounded-full px-3 py-1.5 transition ${
              isCurrent
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted)] hover:text-[var(--primary-text)]'
            }`}
          >
            {option.short}
          </Link>
        );
      })}
    </div>
  );
}

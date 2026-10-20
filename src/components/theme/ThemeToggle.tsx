'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from '@phosphor-icons/react/dist/ssr';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'omaima-theme';

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

const listeners = new Set<() => void>();
let cached: Theme | null = null;

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function onStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;
    // Both apply directly to the document element: re-writing localStorage from
    // the storage handler would create an echo loop between tabs.
    if (event.newValue === 'dark' || event.newValue === 'light') {
      cached = event.newValue;
    } else {
      // Preference was removed manually — fall back to the system theme.
      cached = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = cached;
    notify();
  }
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

/** Client snapshot: the value applied pre-hydration by the inline theme script. */
function getSnapshot(): Theme {
  if (cached === null) {
    cached = readTheme();
  }
  return cached;
}

/** Server snapshot: SSR always renders light, so hydration matches exactly. */
function getServerSnapshot(): Theme {
  return 'light';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode: theme still applies for this session.
  }
}

interface ThemeToggleProps {
  /** Action labels, translated by the page locale. */
  labels: {
    toLight: string;
    toDark: string;
  };
  className?: string;
}

export function ThemeToggle({ labels, className = '' }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    cached = next;
    applyTheme(next);
    notify();
  }

  const label = theme === 'dark' ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label={label}
      title={label}
      className={`btn-press inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition hover:border-[var(--primary)] hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${className}`}
    >
      <span key={theme} className="animate-pop-in" aria-hidden="true">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}      </span>
    </button>
  );
}

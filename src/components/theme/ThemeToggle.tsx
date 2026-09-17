'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

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
    if (event.key === STORAGE_KEY) {
      cached = readTheme();
      notify();
    }
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

export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    cached = next;
    applyTheme(next);
    notify();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`btn-press inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition hover:border-[var(--primary)] hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${className}`}
    >
      <span key={theme} className="animate-pop-in" aria-hidden="true">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </button>
  );
}

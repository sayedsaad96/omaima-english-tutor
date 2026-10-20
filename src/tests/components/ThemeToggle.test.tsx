import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});

const englishLabels = {
  toLight: 'Switch to light mode',
  toDark: 'Switch to dark mode',
};

describe('ThemeToggle', () => {
  it('toggles between light and dark mode and persists the choice', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ThemeToggle labels={englishLabels} />);

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('omaima-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.click(screen.getByRole('button', { name: /switch to light mode/i }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('omaima-theme')).toBe('light');
  });

  it('announces the action in the page language', () => {
    render(
      <ThemeToggle labels={{ toLight: 'التبديل إلى الوضع النهاري', toDark: 'التبديل إلى الوضع الليلي' }} />,
    );
    const toggle = screen.getByRole('button', { name: 'التبديل إلى الوضع الليلي' });
    expect(toggle).toHaveAttribute('title', 'التبديل إلى الوضع الليلي');
  });

  it('applies a theme change made in another tab without rewriting storage', async () => {
    render(<ThemeToggle labels={englishLabels} />);

    await act(async () => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'omaima-theme', newValue: 'dark' }),
      );
    });

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    // The other tab already persisted the value; this tab must not write an echo.
    expect(localStorage.getItem('omaima-theme')).toBeNull();
  });

  it('falls back to the system theme when another tab removes the preference', async () => {
    Object.defineProperty(window, 'matchMedia', {
      value: (query: string) =>
        ({ matches: query.includes('dark'), addEventListener() {}, removeEventListener() {} }) as unknown as typeof window.matchMedia,
      configurable: true,
      writable: true,
    });
    const restore = () => vi.restoreAllMocks();
    try {
      render(<ThemeToggle labels={englishLabels} />);

      await act(async () => {
        window.dispatchEvent(new StorageEvent('storage', { key: 'omaima-theme', newValue: null }));
      });

      expect(document.documentElement.dataset.theme).toBe('dark');
    } finally {
      restore();
    }
  });
});

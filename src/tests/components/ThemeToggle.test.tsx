import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});

describe('ThemeToggle', () => {
  it('toggles between light and dark mode and persists the choice', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ThemeToggle />);

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
});

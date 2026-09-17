import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';

describe('LocaleSwitcher', () => {
  it('links the Arabic option to the equivalent Arabic route', () => {
    render(<LocaleSwitcher pathname="/en/lessons" />);

    const arabicLink = screen.getByRole('link', { name: 'العربية' });
    expect(arabicLink).toHaveAttribute('href', '/ar/lessons');
  });

  it('indicates the current language', () => {
    render(<LocaleSwitcher pathname="/en/lessons" />);
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
});

import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';

afterEach(() => {
  // Reset the URL so context tests never leak into each other.
  window.history.replaceState(null, '', '/');
});

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

  it('carries allow-listed booking context across the language switch', async () => {
    window.history.replaceState(
      null,
      '',
      '/en/free-assessment?service=school&path=progress#quizBand=elementary',
    );
    render(<LocaleSwitcher pathname="/en/free-assessment" />);

    expect(screen.getByRole('link', { name: 'العربية' })).toHaveAttribute(
      'href',
      '/ar/free-assessment?service=school&path=progress#quizBand=elementary',
    );
  });

  it('drops unknown context parameters instead of carrying them over', () => {
    window.history.replaceState(
      null,
      '',
      '/en/free-assessment?service=hackme&phone=%2B201000&quizBand=nope#quizBand=stolen',
    );
    render(<LocaleSwitcher pathname="/en/free-assessment" />);

    const arabicLink = screen.getByRole('link', { name: 'العربية' });
    expect(arabicLink).toHaveAttribute('href', '/ar/free-assessment');
  });
});

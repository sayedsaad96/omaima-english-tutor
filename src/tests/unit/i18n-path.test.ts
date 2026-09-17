import { describe, expect, it } from 'vitest';
import { switchLocalePath } from '@/i18n/path';

describe('switchLocalePath', () => {
  it('switches English route to Arabic while preserving the page path', () => {
    expect(switchLocalePath('/en/lessons', 'ar')).toBe('/ar/lessons');
  });

  it('switches Arabic root to English root', () => {
    expect(switchLocalePath('/ar', 'en')).toBe('/en');
  });
});

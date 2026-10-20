import { describe, expect, it } from 'vitest';
import { assessmentSchema, normalizePhoneDigits } from '@/lib/assessment';

const validBase = {
  learnerFor: 'myself',
  ageGroup: 'adult',
  goal: 'conversation',
  currentLevel: 'notSure',
  format: 'online',
  name: 'Sara Ahmed',
} as const;

function parseWith(whatsapp: string) {
  return assessmentSchema.safeParse({ ...validBase, whatsapp });
}

describe('WhatsApp contact-number rule (assessmentSchema)', () => {
  it('accepts an international number with country code', () => {
    expect(parseWith('+201012345678').success).toBe(true);
  });

  it('accepts spaces and dashes as formatting', () => {
    expect(parseWith('+20 10-1234 5678').success).toBe(true);
  });

  it('normalizes Arabic-Indic digits and reports Latin digits', () => {
    const parsed = parseWith('٠٢٠١٠١٢٣٤٥٦٧٨');
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.whatsapp).toBe('0201012345678');
    }
  });

  it('normalizes Extended Arabic-Indic digits', () => {
    expect(normalizePhoneDigits('۰۲۱۰۱۲۳۴۵۶۷۸')).toBe('021012345678');
  });

  it('rejects dashes or spaces with no digits', () => {
    expect(parseWith('--------').success).toBe(false);
    expect(parseWith('   ').success).toBe(false);
  });

  it('rejects letters and unsupported punctuation', () => {
    expect(parseWith('abcdefgh').success).toBe(false);
    expect(parseWith('+2010(1234567)').success).toBe(false);
    expect(parseWith(' caractère').success).toBe(false);
  });

  it('rejects fewer than 8 or more than 15 digits', () => {
    expect(parseWith('1234567').success).toBe(false);
    expect(parseWith('1234567890123456').success).toBe(false);
  });

  it('rejects empty values', () => {
    expect(parseWith('').success).toBe(false);
  });

  it('allows a plus sign only when leading', () => {
    expect(parseWith('2010 123+4').success).toBe(false);
  });
});

describe('name rule (assessmentSchema)', () => {
  const base = { ...validBase, whatsapp: '+201012345678' };

  it('accepts names between 2 and 80 characters after trimming', () => {
    expect(assessmentSchema.safeParse({ ...base, name: '  Sara  ' }).success).toBe(true);
    expect(assessmentSchema.safeParse({ ...base, name: 'Ab' }).success).toBe(true);
  });

  it('rejects one-character and over-long names', () => {
    expect(assessmentSchema.safeParse({ ...base, name: 'A' }).success).toBe(false);
    expect(assessmentSchema.safeParse({ ...base, name: 'A'.repeat(81) }).success).toBe(false);
  });
});

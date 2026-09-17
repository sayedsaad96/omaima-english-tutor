import { describe, expect, it } from 'vitest';
import { buildAssessmentMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

const data = {
  learnerFor: 'myself',
  ageGroup: 'adult',
  goal: 'conversation',
  currentLevel: 'notSure',
  format: 'online',
  name: 'Test Learner',
  whatsapp: '+201000000000',
} as const;

describe('WhatsApp conversion', () => {
  it('builds a structured message', () => {
    const message = buildAssessmentMessage(data, 'en');
    expect(message).toContain('Test Learner');
    expect(message).toContain('Conversation');
    expect(message).toContain('Online');
  });

  it('encodes the message in wa.me URL', () => {
    const url = buildWhatsAppUrl('201111111111', 'Hello & welcome');
    expect(url).toBe('https://wa.me/201111111111?text=Hello%20%26%20welcome');
  });
});

import { z } from 'zod';

/**
 * Converts Arabic-Indic (٠–٩) and Extended Arabic-Indic (۰–۹) digits to Latin
 * digits, then trims surrounding whitespace. Formatting (spaces, dashes and a
 * leading “+”) is preserved; only the digit characters change.
 */
export function normalizePhoneDigits(value: string): string {
  return value
    .replace(/[\u0660-\u0669]/g, (char) => String(char.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, (char) => String(char.charCodeAt(0) - 0x06F0))
    .trim();
}

const PHONE_FORMAT = /^\+?[0-9\s-]+$/;
const PHONE_RAW_MAX_LENGTH = 24;
const PHONE_MIN_DIGITS = 8;
const PHONE_MAX_DIGITS = 15;

/**
 * WhatsApp contact-number rule shared by the form gate, the final submit and
 * the schema: 8–15 actual digits (country code included) after removing
 * spaces and dashes. A leading “+” is allowed; letters, parentheses and any
 * other punctuation are rejected. This is a syntax rule only — it never
 * claims the number is registered on WhatsApp.
 */
export const whatsappNumberSchema = z
  .string()
  .transform(normalizePhoneDigits)
  .refine((value) => value.length > 0 && value.length <= PHONE_RAW_MAX_LENGTH)
  .refine((value) => PHONE_FORMAT.test(value))
  .refine((value) => {
    const digits = value.replace(/\D/g, '').length;
    return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
  });

export const nameSchema = z.string().trim().min(2).max(80);

export const assessmentSchema = z.object({
  learnerFor: z.enum(['myself', 'myChild']),
  ageGroup: z.enum(['kid', 'teen', 'adult']),
  goal: z.enum(['conversation', 'schoolSupport', 'examPreparation', 'generalEnglish']),
  currentLevel: z.enum(['beginner', 'intermediate', 'advanced', 'notSure']),
  format: z.enum(['online', 'offlineIfAvailable']),
  name: nameSchema,
  whatsapp: whatsappNumberSchema,
});

export type AssessmentData = z.infer<typeof assessmentSchema>;

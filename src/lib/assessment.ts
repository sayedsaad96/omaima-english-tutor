import { z } from 'zod';

export const assessmentSchema = z.object({
  learnerFor: z.enum(['myself', 'myChild']),
  ageGroup: z.enum(['kid', 'teen', 'adult']),
  goal: z.enum(['conversation', 'schoolSupport', 'examPreparation', 'generalEnglish']),
  currentLevel: z.enum(['beginner', 'intermediate', 'advanced', 'notSure']),
  format: z.enum(['online', 'offlineIfAvailable']),
  name: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().min(8).max(20).regex(/^\+?[0-9\s-]+$/),
});

export type AssessmentData = z.infer<typeof assessmentSchema>;

import type { Locale } from '@/i18n/locales';
import type { AssessmentData } from './assessment';

const labels: Record<Locale, Record<string, Record<string, string>>> = {
  en: {
    field: {
      intro: 'Hello Omaima! I would like to book my free assessment (15–20 minutes).',
      name: 'Name',
      whatsapp: 'WhatsApp',
      learnerFor: 'Lesson for',
      ageGroup: 'Age group',
      goal: 'Goal',
      currentLevel: 'Current level',
      format: 'Format',
    },
    learnerFor: { myself: 'Myself', myChild: 'My child' },
    ageGroup: { kid: 'Kid', teen: 'Teen', adult: 'Adult' },
    goal: {
      conversation: 'Conversation',
      schoolSupport: 'School Support',
      examPreparation: 'Exam Preparation',
      generalEnglish: 'General English',
    },
    currentLevel: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      notSure: 'Not sure',
    },
    format: { online: 'Online', offlineIfAvailable: 'Offline if available' },
  },
  ar: {
    field: {
      intro: 'أهلاً أميمة! عايز أحجز التقييم المجاني (١٥–٢٠ دقيقة).',
      name: 'الاسم',
      whatsapp: 'واتساب',
      learnerFor: 'الدرس لـ',
      ageGroup: 'الفئة العمرية',
      goal: 'الهدف',
      currentLevel: 'المستوى الحالي',
      format: 'الشكل',
    },
    learnerFor: { myself: 'ليا', myChild: 'لابني / لبنتي' },
    ageGroup: { kid: 'طفل', teen: 'مراهق', adult: 'بالغ' },
    goal: {
      conversation: 'المحادثة',
      schoolSupport: 'الدعم المدرسي',
      examPreparation: 'التحضير للامتحانات',
      generalEnglish: 'إنجليزي عام',
    },
    currentLevel: {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      notSure: 'مش متأكد',
    },
    format: { online: 'أونلاين', offlineIfAvailable: 'أوفلاين لو متاح' },
  },
};

/**
 * Builds a readable multi-line WhatsApp message from assessment answers.
 * Learner data is only placed in this message object — never in the site URL.
 */
export function buildAssessmentMessage(data: AssessmentData, locale: Locale): string {
  const map = labels[locale];
  return [
    map.field.intro,
    '',
    `${map.field.name}: ${data.name}`,
    `${map.field.whatsapp}: ${data.whatsapp}`,
    `${map.field.learnerFor}: ${map.learnerFor[data.learnerFor]}`,
    `${map.field.ageGroup}: ${map.ageGroup[data.ageGroup]}`,
    `${map.field.goal}: ${map.goal[data.goal]}`,
    `${map.field.currentLevel}: ${map.currentLevel[data.currentLevel]}`,
    `${map.field.format}: ${map.format[data.format]}`,
  ].join('\n');
}

/** Builds a wa.me deep link for the business number. Only the final link carries the message. */
export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

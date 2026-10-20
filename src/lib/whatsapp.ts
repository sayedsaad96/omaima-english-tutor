import type { Locale } from '@/i18n/locales';
import type { SiteDictionary } from '@/content/types';
import type { BookingContext } from './context';
import type { AssessmentData } from './assessment';

const labels: Record<Locale, Record<string, string>> = {
  en: {
    intro: 'Hello Omaima! I would like to book my free assessment (15–20 minutes).',
    name: 'Name',
    whatsapp: 'WhatsApp',
    learnerFor: 'Lesson for',
    ageGroup: 'Age group',
    goal: 'Goal',
    currentLevel: 'Current level',
    format: 'Format',
    guidance: 'Guidance (indicative, changeable):',
    serviceSource: 'Service',
    pathSource: 'Learning path',
    quizSource: 'Quiz result',
  },
  ar: {
    intro: 'أهلاً أميمة! عايز أحجز التقييم المجاني (١٥–٢٠ دقيقة).',
    name: 'الاسم',
    whatsapp: 'واتساب',
    learnerFor: 'الدرس لـ',
    ageGroup: 'الفئة العمرية',
    goal: 'الهدف',
    currentLevel: 'المستوى الحالي',
    format: 'الشكل',
    guidance: 'استرشاد (مبدئي وقابل للتغيير):',
    serviceSource: 'الخدمة',
    pathSource: 'مسار التعلم',
    quizSource: 'نتيجة الاختبار',
  },
};

const choiceLabels: Record<Locale, Record<string, Record<string, string>>> = {
  en: {
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
 * Optional visit context (service / path / quiz band) is appended as an
 * explicitly "indicative" guidance line, using dictionary labels so wording
 * stays in one place per locale.
 */
export function buildAssessmentMessage(
  data: AssessmentData,
  locale: Locale,
  dict?: SiteDictionary,
  context?: BookingContext,
): string {
  const map = labels[locale];
  const choices = choiceLabels[locale];

  const guidanceParts: string[] = [];
  if (context?.service) {
    guidanceParts.push(`${map.serviceSource}: ${dict?.services.items[context.service].title ?? context.service}`);
  }
  if (context?.path) {
    guidanceParts.push(`${map.pathSource}: ${dict?.paths.items[context.path].name ?? context.path}`);
  }
  if (context?.quizBand) {
    guidanceParts.push(`${map.quizSource}: ${dict?.quiz.bands[context.quizBand].label ?? context.quizBand}`);
  }

  return [
    map.intro,
    '',
    `${map.name}: ${data.name}`,
    `${map.whatsapp}: ${data.whatsapp}`,
    `${map.learnerFor}: ${choices.learnerFor[data.learnerFor]}`,
    `${map.ageGroup}: ${choices.ageGroup[data.ageGroup]}`,
    `${map.goal}: ${choices.goal[data.goal]}`,
    `${map.currentLevel}: ${choices.currentLevel[data.currentLevel]}`,
    `${map.format}: ${choices.format[data.format]}`,
    ...(guidanceParts.length > 0
      ? ['', `${map.guidance} ${guidanceParts.join(' • ')}`]
      : []),
  ].join('\n');
}

/** Builds a wa.me deep link for the business number. Only the final link carries the message. */
export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

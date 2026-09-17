export type ServiceKey = 'private' | 'conversation' | 'school' | 'exam';
export type AudienceKey = 'kids' | 'teens' | 'adults' | 'child';
export type PathKey = 'start' | 'progress' | 'intensive';

export interface NavCopy {
  home: string;
  about: string;
  lessons: string;
  quiz: string;
  assessment: string;
  book: string;
  menu: string;
  close: string;
}

export interface HeroCopy {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  portraitAlt: string;
  accents: string[];
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  body: string;
}

export interface ServiceCopy {
  title: string;
  tagline: string;
  bullets: string[];
  learners: string;
}

export interface WhyItem {
  title: string;
  body: string;
}

export interface MethodStep {
  title: string;
  body: string;
}

export interface LearningPath {
  name: string;
  body: string;
  bullets: string[];
  cta: string;
  recommended: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface QuizBandCopy {
  label: string;
  body: string;
}

export interface AssessmentOption {
  value: string;
  label: string;
}

export interface SiteDictionary {
  locale: 'en' | 'ar';
  dir: 'ltr' | 'rtl';
  brand: {
    name: string;
    role: string;
  };
  nav: NavCopy;
  hero: HeroCopy;
  audience: {
    intro: SectionIntro;
    options: Record<AudienceKey, { title: string; body: string }>;
  };
  journey: {
    intro: SectionIntro;
    steps: { title: string; body: string }[];
  };
  services: {
    intro: SectionIntro;
    items: Record<ServiceKey, ServiceCopy>;
    cta: string;
  };
  why: {
    intro: SectionIntro;
    items: WhyItem[];
  };
  method: {
    intro: SectionIntro;
    steps: MethodStep[];
  };
  quizTeaser: {
    intro: SectionIntro;
    bullets: string[];
    cta: string;
    secondary: string;
  };
  assessmentTeaser: {
    intro: SectionIntro;
    bullets: string[];
    cta: string;
    note: string;
  };
  paths: {
    intro: SectionIntro;
    items: Record<PathKey, LearningPath>;
    disclaimer: string;
  };
  expectations: {
    intro: SectionIntro;
    items: { title: string; body: string }[];
    note: string;
  };
  aboutPreview: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    portraitAlt: string;
  };
  faq: {
    intro: SectionIntro;
    items: FaqItem[];
  };
  finalCta: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  quiz: {
    title: string;
    intro: string;
    startHint: string;
    next: string;
    back: string;
    finish: string;
    retake: string;
    bookCta: string;
    questionOf: string;
    chooseAnswer: string;
    needAnswer: string;
    disclaimer: string;
    bands: {
      foundations: QuizBandCopy;
      elementary: QuizBandCopy;
      preIntermediate: QuizBandCopy;
      intermediatePlus: QuizBandCopy;
    };
  };
  assessment: {
    title: string;
    intro: string;
    stepOf: string;
    back: string;
    next: string;
    submit: string;
    questions: {
      learnerFor: { label: string; hint: string; options: AssessmentOption[] };
      ageGroup: { label: string; hint: string; options: AssessmentOption[] };
      goal: { label: string; hint: string; options: AssessmentOption[] };
      currentLevel: { label: string; hint: string; options: AssessmentOption[] };
      format: { label: string; hint: string; options: AssessmentOption[] };
      name: { label: string; hint: string; placeholder: string };
      whatsapp: { label: string; hint: string; placeholder: string };
    };
    errors: {
      required: string;
      name: string;
      whatsapp: string;
    };
    success: {
      title: string;
      body: string;
      summaryTitle: string;
      continueWhatsapp: string;
      copyMessage: string;
      copied: string;
      fallbackNote: string;
      noNumberNote: string;
      bookAgain: string;
    };
    privacyNote: string;
  };
  about: {
    title: string;
    intro: string;
    portraitAlt: string;
    approachTitle: string;
    approachBody: string[];
    factsTitle: string;
    education: { title: string; items: string[] };
    experience: { title: string; items: string[] };
    development: { title: string; items: string[] };
    caution: string;
    cta: string;
  };
  lessons: {
    title: string;
    intro: string;
    note: string;
    cta: string;
  };
  privacy: {
    title: string;
    updated: string;
    intro: string;
    sections: { title: string; body: string[] }[];
  };
  whatsapp: {
    label: string;
    greeting: string;
    intents: { value: string; label: string; message: string }[];
    openChat: string;
  };
  common: {
    bookFreeAssessment: string;
    takeQuiz: string;
    learnMore: string;
    onlineFirst: string;
  };
  footer: {
    brand: string;
    tagline: string;
    explore: string;
    contact: string;
    privacy: string;
    rights: string;
    language: string;
    whatsapp: string;
    email: string;
  };
  meta: {
    home: { title: string; description: string };
    about: { title: string; description: string };
    lessons: { title: string; description: string };
    quiz: { title: string; description: string };
    assessment: { title: string; description: string };
    privacy: { title: string; description: string };
  };
}

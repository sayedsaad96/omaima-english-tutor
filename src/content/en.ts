import type { SiteDictionary } from './types';

export const en: SiteDictionary = {
  locale: 'en',
  dir: 'ltr',
  brand: {
    name: 'Omaima Ashour',
    role: 'English Tutor',
  },
  nav: {
    home: 'Home',
    about: 'About',
    lessons: 'Lessons',
    quiz: 'Level Quiz',
    assessment: 'Free Assessment',
    book: 'Book Free Assessment',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'Online English lessons for kids, teens & adults',
    title: 'Learn English with confidence.',
    body: 'Personalized English lessons for kids, teens and adults — built around your level, goals and learning style.',
    primaryCta: 'Book Your Free Assessment',
    secondaryCta: 'Take the 2-Minute Level Quiz',
    trustLine: 'Online lessons • Offline by arrangement • Personalized learning',
    portraitAlt: 'Portrait of Omaima Ashour, English tutor',
    accents: ['Speak', 'Learn', 'Improve', 'Confidence'],
  },
  audience: {
    intro: {
      eyebrow: 'Start here',
      title: 'Who are you learning for?',
      body: 'Choose the path that fits you — lessons adapt to every age and goal.',
    },
    options: {
      kids: { title: 'Kids', body: 'Fun foundations, vocabulary & confidence' },
      teens: { title: 'Teens & School Students', body: 'School support, exams & stronger English skills' },
      adults: { title: 'Adults', body: 'Conversation, pronunciation & everyday English' },
      child: { title: 'For My Child', body: 'Help me find the right learning plan' },
    },
  },
  journey: {
    intro: {
      eyebrow: 'How it works',
      title: 'Your English journey, made personal.',
      body: 'A simple path from first hello to real progress.',
    },
    steps: [
      { title: 'Understand your level', body: 'A quick quiz plus a free assessment call.' },
      { title: 'Build your plan', body: 'A learning direction shaped around your goal.' },
      { title: 'Make real progress', body: 'Practice, feedback and steady improvement.' },
    ],
  },
  services: {
    intro: {
      eyebrow: 'Lessons & services',
      title: 'English lessons that fit your goal',
      body: 'Every lesson is personalized — here are the four most common ways students learn with Omaima.',
    },
    items: {
      private: {
        title: 'Private English Lessons — 1:1',
        tagline: 'Your level, your pace, your goals.',
        bullets: ['Grammar', 'Vocabulary', 'Speaking & listening', 'Reading & writing', 'Pronunciation'],
        learners: 'Kids • Teens • Adults',
      },
      conversation: {
        title: 'Conversation Practice',
        tagline: 'Speak more. Hesitate less.',
        bullets: ['Speaking confidence', 'Pronunciation & fluency', 'Everyday English', 'Correction of recurring mistakes'],
        learners: 'Teens • Adults',
      },
      school: {
        title: 'School Support',
        tagline: 'Understand the lesson — don’t just memorize it.',
        bullets: ['Curriculum explanation', 'Homework support', 'Grammar, reading & writing', 'Exam revision & weak areas'],
        learners: 'Kids • Teens • Parents',
      },
      exam: {
        title: 'Exam Preparation',
        tagline: 'A focused plan for a defined goal.',
        bullets: ['Weak-area identification', 'Focused revision', 'Practice questions', 'Exam techniques & study plan'],
        learners: 'Teens • Adults',
      },
    },
    cta: 'Build My Learning Plan',
  },
  why: {
    intro: {
      eyebrow: 'Why Omaima?',
      title: 'Why learn with Omaima?',
      body: 'Practical, supportive teaching focused on using English — not just studying it.',
    },
    items: [
      { title: 'Personalized, not one-size-fits-all', body: 'Lessons adapt to your level, goal and learning style.' },
      { title: 'Confidence before perfection', body: 'Speak from day one in a supportive, pressure-free space.' },
      { title: 'Clear explanations', body: 'Grammar and ideas explained simply, with examples that stick.' },
      { title: 'Practice that has a purpose', body: 'Every activity connects to real-life English you will actually use.' },
      { title: 'Supportive learning environment', body: 'Patient feedback that corrects mistakes and celebrates progress.' },
    ],
  },
  method: {
    intro: {
      eyebrow: 'Teaching method',
      title: 'How learning with Omaima works',
      body: 'A clear five-step loop that keeps every lesson moving forward.',
    },
    steps: [
      { title: 'Discover', body: 'Understand your level, goal and weak areas.' },
      { title: 'Personalize', body: 'Build the learning direction around you.' },
      { title: 'Learn & Practice', body: 'Clear explanation plus practical use.' },
      { title: 'Feedback', body: 'Correct mistakes and reinforce what matters.' },
      { title: 'Progress', body: 'Review development and adjust the plan.' },
    ],
  },
  quizTeaser: {
    intro: {
      eyebrow: 'Free level quiz',
      title: 'Discover your level in 2 minutes',
      body: 'Answer 8 quick questions and get an instant indicative result — then book a free assessment for a precise evaluation.',
    },
    bullets: ['8 questions • ~2 minutes', 'Grammar, vocabulary & reading', 'Instant indicative result'],
    cta: 'Start the Quiz',
    secondary: 'How the quiz works: one question per screen, no account needed.',
  },
  assessmentTeaser: {
    intro: {
      eyebrow: 'Free assessment',
      title: 'Book your free 15–20 minute assessment',
      body: 'Talk with Omaima about your level and goal, and get a recommended learning direction. The assessment is free — the lessons themselves are paid.',
    },
    bullets: ['Understand your current level', 'Discuss your goal', 'Get a recommended plan'],
    cta: 'Book My Free Assessment',
    note: 'Free 15–20 minute assessment • Not a free lesson • Online-first',
  },
  paths: {
    intro: {
      eyebrow: 'Learning paths',
      title: 'Choose Your Learning Path',
      body: 'Three flexible directions — your exact plan and frequency are recommended after your free assessment.',
    },
    items: {
      start: {
        name: 'Start',
        body: 'For a gentle start or a focused objective.',
        bullets: ['Personalized lessons', 'Flexible schedule', 'Focused skills'],
        cta: 'Find My Best Plan',
        recommended: false,
      },
      progress: {
        name: 'Progress',
        body: 'The recommended ongoing path for steady growth.',
        bullets: ['Consistent learning', 'Practice & feedback', 'Progress tracking'],
        cta: 'Find My Best Plan',
        recommended: true,
      },
      intensive: {
        name: 'Intensive',
        body: 'For exams or more time-sensitive goals.',
        bullets: ['Higher frequency', 'Focused goals', 'Extra practice & revision'],
        cta: 'Find My Best Plan',
        recommended: false,
      },
    },
    disclaimer: 'Your lesson plan and frequency will be recommended according to your level, goals and availability.',
  },
  expectations: {
    intro: {
      eyebrow: 'What to expect',
      title: 'What Students Can Expect',
      body: 'Realistic outcomes from consistent, personalized lessons — no invented reviews.',
    },
    items: [
      { title: 'Clearer speaking', body: 'Express everyday ideas with more confidence and fewer hesitations.' },
      { title: 'Stronger foundations', body: 'Grammar and vocabulary explained until they make sense — then practiced.' },
      { title: 'Better school results', body: 'School students understand lessons deeply instead of memorizing.' },
      { title: 'Honest feedback', body: 'Know exactly what to improve and how to practice it.' },
    ],
    note: 'Testimonials from real students will appear here once shared with permission.',
  },
  aboutPreview: {
    eyebrow: 'Meet your tutor',
    title: 'Hi, I’m Omaima 👋',
    body: 'I’m an English tutor helping kids, teens and adults learn English with confidence — through personalized lessons, clear explanations and lots of real practice.',
    cta: 'Meet Omaima',
    portraitAlt: 'Omaima Ashour smiling',
  },
  faq: {
    intro: {
      eyebrow: 'FAQ',
      title: 'Common questions',
      body: 'Quick answers — or ask directly on WhatsApp.',
    },
    items: [
      { q: 'Are the lessons online?', a: 'Yes — lessons are online-first. Offline lessons may be available by arrangement and location.' },
      { q: 'Who can join the lessons?', a: 'Kids, teens and school students, adults, and parents booking for their child.' },
      { q: 'I don’t know my English level. Is that okay?', a: 'Absolutely. Take the 2-minute level quiz for a rough idea, then book the free assessment for an accurate evaluation.' },
      { q: 'Is the assessment really free?', a: 'Yes. The 15–20 minute assessment is completely free and helps define your level, goal and learning direction.' },
      { q: 'Is the trial lesson free?', a: 'No — the free part is the assessment call. Educational lessons are paid and planned after the assessment.' },
      { q: 'How much do lessons cost?', a: 'Pricing depends on your level, goals and frequency. Book a free assessment and Omaima will recommend the right plan.' },
      { q: 'Can you help with school English?', a: 'Yes — curriculum explanation, homework support, grammar, reading, writing and exam revision.' },
      { q: 'Do you teach conversation?', a: 'Yes — conversation practice focuses on confidence, pronunciation, fluency and everyday English.' },
      { q: 'What if I’m a complete beginner?', a: 'You’re welcome. Lessons start from your level with patient explanations and guided practice.' },
    ],
  },
  finalCta: {
    title: 'Ready to make English feel easier?',
    body: 'Let’s find the learning plan that fits you.',
    primaryCta: 'Book Your Free Assessment',
    secondaryCta: 'Not sure yet? Take the 2-minute level quiz →',
  },
  quiz: {
    title: 'Free English Level Quiz',
    intro: '8 quick questions • about 2 minutes • instant indicative result. No account needed.',
    startHint: 'Choose one answer per question. You can go back before finishing.',
    next: 'Next',
    back: 'Back',
    finish: 'See my result',
    retake: 'Retake Quiz',
    bookCta: 'Book My Free Assessment',
    questionOf: 'Question',
    chooseAnswer: 'Choose one answer:',
    needAnswer: 'Please choose an answer to continue.',
    disclaimer: 'This is only a quick estimate. For a more accurate evaluation, book your free assessment with Omaima.',
    bands: {
      foundations: { label: 'Foundations — starting out', body: 'Your answers suggest you’re building the basics. Guided lessons will help you grow step by step.' },
      elementary: { label: 'Elementary level (indicative)', body: 'Your answers suggest you’re around an Elementary level. Structured practice will strengthen your foundations.' },
      preIntermediate: { label: 'Pre-Intermediate level (indicative)', body: 'Your answers suggest you’re around a Pre-Intermediate level. Focused lessons can push you toward confident everyday English.' },
      intermediatePlus: { label: 'Intermediate+ level (indicative)', body: 'Your answers suggest you’re at an Intermediate level or above. Conversation and refinement work will suit you well.' },
    },
  },
  assessment: {
    title: 'Book Your Free Assessment',
    intro: 'Answer 7 quick questions. Your answers prepare a WhatsApp message — nothing is stored in a learner database.',
    stepOf: 'Step',
    back: 'Back',
    next: 'Next',
    submit: 'Review my request',
    questions: {
      learnerFor: {
        label: 'Who is the lesson for?',
        hint: 'Choose one.',
        options: [
          { value: 'myself', label: 'Myself' },
          { value: 'myChild', label: 'My child' },
        ],
      },
      ageGroup: {
        label: 'Age group',
        hint: 'Choose the learner’s age group.',
        options: [
          { value: 'kid', label: 'Kid' },
          { value: 'teen', label: 'Teen' },
          { value: 'adult', label: 'Adult' },
        ],
      },
      goal: {
        label: 'Main goal',
        hint: 'What matters most right now?',
        options: [
          { value: 'conversation', label: 'Conversation' },
          { value: 'schoolSupport', label: 'School Support' },
          { value: 'examPreparation', label: 'Exam Preparation' },
          { value: 'generalEnglish', label: 'General English' },
        ],
      },
      currentLevel: {
        label: 'Current level',
        hint: 'A rough guess is fine.',
        options: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
          { value: 'notSure', label: 'Not sure' },
        ],
      },
      format: {
        label: 'Preferred format',
        hint: 'Lessons are online-first.',
        options: [
          { value: 'online', label: 'Online' },
          { value: 'offlineIfAvailable', label: 'Offline if available' },
        ],
      },
      name: { label: 'Your name', hint: 'So Omaima knows who to expect.', placeholder: 'e.g. Sara Ahmed' },
      whatsapp: { label: 'WhatsApp number', hint: 'Used only to arrange your assessment.', placeholder: 'e.g. +2010…' },
    },
    errors: {
      required: 'Please choose an option to continue.',
      name: 'Please enter your name (at least 2 characters).',
      whatsapp: 'Please enter a valid WhatsApp number (digits, spaces, + or -).',
    },
    success: {
      title: 'Your assessment request is ready.',
      body: 'Continue on WhatsApp to confirm your time.',
      summaryTitle: 'Your answers',
      continueWhatsapp: 'Continue on WhatsApp',
      copyMessage: 'Copy message',
      copied: 'Copied!',
      fallbackNote: 'If WhatsApp doesn’t open, copy the message above and send it manually.',
      noNumberNote: 'WhatsApp number is being set up — please use the copy button and send your message manually for now.',
      bookAgain: 'Start over',
    },
    privacyNote: 'Your contact details are used only to arrange the free assessment.',
  },
  about: {
    title: 'About Omaima',
    intro: 'English tutor helping kids, teens and adults use English with confidence.',
    portraitAlt: 'Portrait of Omaima Ashour',
    approachTitle: 'My teaching approach',
    approachBody: [
      'I teach English online with a focus on understanding, practice and confidence — not memorization alone.',
      'Every learner starts from a different level and goal, so lessons are personalized around what you actually need: clear explanations, guided practice, honest feedback and steady progress.',
    ],
    factsTitle: 'Background & training',
    education: {
      title: 'Education',
      items: ['Bachelor of Education & Arts | KFC — completed June 2022 — grade: Good'],
    },
    experience: {
      title: 'Teaching experience',
      items: [
        'Freelance Teacher of English since December 2023',
        'Online secondary-stage teaching experience',
        'Methods used: Elicitation and Drilling',
        'Curricula: Connect and Connect Plus',
      ],
    },
    development: {
      title: 'Professional development',
      items: [
        'ELT Gathering webinar — August 2024',
        'TEFLism Professional Development certificate — August 2024',
        'The Pronunciation of American English — Coursera — January 2024',
        'SEL for Students — Coursera',
        'TOEFL Preparation — Coursera — August 2023',
        'Arizona State University TESOL Coursera modules — July 2023',
        'Speak English Professionally: In Person, Online & On the Phone — Coursera — June 2023',
      ],
    },
    caution: 'Course completions listed here reflect training undertaken; they are not presented as official exam-board certification.',
    cta: 'Book Your Free Assessment',
  },
  lessons: {
    title: 'Lessons & Services',
    intro: 'Four personalized ways to learn — every plan starts with a free assessment.',
    note: 'Exam preparation is planned around your specific goal. Specific international exams are only advertised once confirmed as offered services.',
    cta: 'Build My Learning Plan',
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: September 2026',
    intro: 'This policy explains what this website collects and why — in plain language.',
    sections: [
      {
        title: 'Assessment information',
        body: [
          'When you complete the free-assessment form, your answers are used to prepare a WhatsApp message so you can contact Omaima.',
          'The site itself does not persist assessment answers in a learner database in V1 — the information stays in your browser until you choose to send it via WhatsApp.',
        ],
      },
      {
        title: 'WhatsApp',
        body: [
          'Continuing to WhatsApp is optional and happens only when you click the button.',
          'WhatsApp is a third-party service; once you continue there, WhatsApp’s own policies apply.',
        ],
      },
      {
        title: 'Quiz answers',
        body: ['Level-quiz answers are scored locally in your browser and are not sent to any server.'],
      },
      {
        title: 'Contact',
        body: ['For privacy questions, contact Omaima through the WhatsApp or email channels listed on this site.'],
      },
    ],
  },
  whatsapp: {
    label: 'WhatsApp',
    greeting: 'Chat on WhatsApp',
    intents: [
      { value: 'assessment', label: 'Book a Free Assessment', message: 'Hello Omaima! I would like to book my free 15–20 minute assessment.' },
      { value: 'lessons', label: 'Ask about lessons', message: 'Hello Omaima! I have a question about your English lessons.' },
      { value: 'school', label: 'School Support', message: 'Hello Omaima! I need help with school English.' },
      { value: 'conversation', label: 'Conversation Practice', message: 'Hello Omaima! I want to improve my conversation and speaking confidence.' },
      { value: 'exam', label: 'Exam Preparation', message: 'Hello Omaima! I need focused preparation for an upcoming exam.' },
    ],
    openChat: 'Open WhatsApp chat',
  },
  common: {
    bookFreeAssessment: 'Book Your Free Assessment',
    takeQuiz: 'Take the 2-Minute Level Quiz',
    learnMore: 'Learn more',
    onlineFirst: 'Online-first • Offline by arrangement',
  },
  footer: {
    brand: 'Omaima Ashour — English Tutor',
    tagline: 'Personalized English lessons for kids, teens and adults.',
    explore: 'Explore',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    rights: 'All rights reserved.',
    language: 'Language',
    whatsapp: 'WhatsApp',
    email: 'Email',
  },
  meta: {
    home: {
      title: 'Omaima Ashour — English Tutor | Personalized English Lessons',
      description: 'Personalized online English lessons for kids, teens and adults. Book a free 15–20 minute assessment or take the 2-minute level quiz.',
    },
    about: {
      title: 'About Omaima — English Tutor',
      description: 'Meet Omaima Ashour: English tutor offering personalized online lessons for kids, teens and adults.',
    },
    lessons: {
      title: 'Lessons & Services — Omaima Ashour',
      description: 'Private 1:1 lessons, conversation practice, school support and exam preparation — personalized around your level and goals.',
    },
    quiz: {
      title: 'Free 2-Minute Level Quiz — Omaima Ashour',
      description: 'Take 8 quick questions and get an indicative English level, then book your free assessment.',
    },
    assessment: {
      title: 'Book Your Free Assessment — Omaima Ashour',
      description: 'Book a free 15–20 minute English assessment and get a recommended learning direction.',
    },
    privacy: {
      title: 'Privacy Policy — Omaima Ashour',
      description: 'How this website handles assessment information, quiz answers and WhatsApp contact.',
    },
  },
};

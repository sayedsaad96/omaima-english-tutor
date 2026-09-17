# Omaima Ashour English Tutor Website — Design Specification

**Date:** 2026-09-17  
**Status:** Approved design direction; ready for user review before implementation planning

## 1. Product Vision

Build a bilingual (Arabic/English) premium personal teaching website for **Omaima Ashour — English Tutor**. The website is primarily a **student-acquisition and conversion product**, not an LMS and not a digital CV.

The website should help a visitor quickly understand:

1. Who Omaima teaches.
2. What learning problems she can help with.
3. Why her teaching approach is relevant to them.
4. Which learning path may suit them.
5. How to take a low-friction next step via a free assessment, a short level quiz, or WhatsApp.

The V1 website must remain lightweight enough to launch quickly, but its information architecture should allow later expansion into a student area or learning platform without replacing the public marketing site.

## 2. Positioning

### Brand position

**Omaima Ashour — English Tutor**

A general English tutor serving:

- Kids
- Teens and school students
- Adults
- Parents looking for English lessons for their child

### Primary teaching format

- **Online-first**
- Offline lessons may be available by arrangement and location

### Core promise

Personalized English learning built around the learner's current level, goals, and needs, with an emphasis on confidence, understanding, practice, feedback, and steady progress.

### Suggested English hero message

> **Learn English with confidence.**  
> Personalized English lessons for kids, teens and adults — built around your level, goals and learning style.

### Suggested Arabic hero message

> **اتعلّم الإنجليزي بثقة.**  
> دروس إنجليزي مخصصة للأطفال والمراهقين والكبار، حسب مستواك وهدفك وطريقة تعلمك.

## 3. Primary Conversion Strategy

The website uses three connected conversion routes:

### Primary CTA

**Book Your Free Assessment**

A free 15–20 minute initial assessment to:

- Understand the learner's current level
- Discuss their goal
- Identify the most suitable learning direction

The educational lesson itself is not positioned as free.

### Secondary CTA

**Take the 2-Minute Level Quiz**

A short 7–10 question quiz used as a low-friction lead magnet. It provides only an indicative result and leads the visitor to the free assessment.

### Quick contact

**WhatsApp**

WhatsApp is integrated into the conversion flow rather than acting as a generic contact button.

## 4. Website Model

Use a **Hybrid Conversion Website**.

The Home page is the main acquisition and conversion journey, supported by focused pages for high-value content.

### V1 top-level pages

- Home
- About Omaima
- Lessons & Services
- Free Level Quiz
- Free Assessment / Booking

### Future page

- Resources

### Explicitly out of scope for V1

- Student accounts
- Student dashboard
- LMS
- Recorded course marketplace
- Lesson video library behind login
- Online payment flow
- Attendance tracking
- Homework portal
- Detailed learner progress dashboard
- Live lesson system

These may be introduced in later phases if student volume and business needs justify them.

## 5. Language & Direction

The entire site is bilingual:

- English — LTR
- Arabic — RTL

A visible **AR / EN** language switcher is present in the header.

The Arabic experience must be properly composed for RTL rather than being a mirrored afterthought. Components, spacing, icons, alignment, and reading order should adapt appropriately.

## 6. Visual Direction

### Selected style

**Creative & Youthful**

The style should feel:

- Energetic
- Friendly
- Modern
- Approachable
- Professional enough for adults and parents
- Never children-only

### Portrait strategy

Use a real portrait of Omaima as a central trust element, enhanced with subtle supporting illustrations and graphic accents.

### Visual balance

Combine:

- Real photography
- Light educational illustrations
- Soft playful patterns
- Clean whitespace
- Rounded but professional UI elements
- Clear typography
- Subtle motion

Avoid turning the website into a cartoon-heavy children’s site.

### Motion principle

**Alive, not distracting.**

Motion should support hierarchy and interaction rather than being decorative for its own sake.

Recommended use:

- Subtle floating accents around the hero portrait
- Gentle entrance motion for short keywords such as Speak / Learn / Improve
- Hover feedback on service cards
- Scroll-based reveal of the learning journey
- Fast quiz transitions
- Progress feedback in the assessment form
- Simple success micro-interactions

Avoid heavy 3D, excessive parallax, or effects that harm performance.

## 7. Home Page Journey

The Home page should follow this order:

1. Header
2. Hero + Omaima portrait
3. Who are you learning for?
4. Your English Journey
5. Services
6. Why Omaima?
7. Teaching Method
8. 2-Minute Level Quiz
9. Free Assessment
10. Learning Paths
11. Testimonials / What Students Can Expect
12. About Omaima Preview
13. FAQ
14. Final CTA
15. Footer

The conversion logic is:

**Trust → Self-identification → Relevance → Method → Low-friction interaction → Assessment → Contact**

## 8. Header

### Desktop navigation

- Brand / Omaima Ashour
- Home
- About
- Lessons
- Level Quiz
- Free Assessment
- AR / EN
- Primary CTA: **Book Free Assessment**

### Mobile navigation

- Compact brand
- Language switcher
- Menu
- Persistent or easily accessible assessment CTA

## 9. Hero Section

### Goals

Within seconds, the visitor should understand:

- This is an English tutor website
- Lessons are available for different age groups
- Learning is personalized
- The next step is an assessment or quick level quiz

### English content direction

**Learn English with confidence.**

Personalized English lessons for kids, teens and adults — built around your level, goals and learning style.

Primary button: **Book Your Free Assessment**  
Secondary button: **Take the 2-Minute Level Quiz**

Trust line:

**Online lessons • Offline by arrangement • Personalized learning**

### Arabic content direction

**اتعلّم الإنجليزي بثقة.**

دروس إنجليزي مخصصة للأطفال والمراهقين والكبار، حسب مستواك وهدفك وطريقة تعلمك.

Primary button: **احجز تقييمك المجاني**  
Secondary button: **اكتشف مستواك في دقيقتين**

### Visual treatment

Use Omaima’s real portrait as the dominant visual, with restrained educational accents such as:

- Speak
- Learn
- Improve
- Confidence
- Small vocabulary/speech graphic elements

The hero must not become visually crowded.

## 10. Audience Entry

Immediately after the hero, ask:

### Who are you learning for?

Options:

- **Kids** — Fun foundations, vocabulary & confidence
- **Teens & School Students** — School support, exams & stronger English skills
- **Adults** — Conversation, pronunciation & everyday English
- **For My Child** — Help me find the right learning plan

Selecting an audience should highlight or guide the visitor toward the most relevant services without forcing a full page reload.

## 11. Your English Journey

A short explanatory transition:

### Your English journey, made personal.

**Understand your level → Build your plan → Make real progress**

Arabic direction:

**اعرف مستواك → حدد هدفك → اتعلّم → طبّق → اتقدّم**

Keep this section short.

## 12. Services

### 12.1 Private English Lessons — 1:1

The primary service.

Possible focus areas depending on learner need:

- Grammar
- Vocabulary
- Speaking
- Listening
- Reading
- Writing
- Pronunciation

CTA: **Build My Learning Plan**

### 12.2 Conversation Practice

Outcome-led message:

> **Speak more. Hesitate less.**

Focus areas:

- Speaking confidence
- Pronunciation
- Fluency
- Everyday English
- Vocabulary in context
- Correction of recurring mistakes

### 12.3 School Support

Primary message:

> **Understand the lesson — don’t just memorize it.**

Potential support:

- Curriculum explanation
- Homework support
- Grammar
- Reading and writing
- Exam revision
- Identifying and strengthening weak areas

### 12.4 Exam Preparation

For learners with a defined exam or near-term goal.

Potential focus:

- Weak-area identification
- Focused revision
- Practice questions
- Exam techniques
- Structured preparation plan

Do not market preparation for a specific international exam unless Omaima confirms that it is an offered service.

### Service card behavior

Avoid four generic identical cards. Each service may use its own illustration/accent while remaining inside one design system.

## 13. Why Learn With Omaima?

Present learner-relevant reasons instead of reproducing a long CV.

Suggested themes:

- **Personalized, not one-size-fits-all**
- **Confidence before perfection**
- **Clear explanations**
- **Practice that has a purpose**
- **Supportive learning environment**

Suggested quote direction:

> “My goal is not just to help you study English — it’s to help you actually use it with confidence.”

This quote should be approved by Omaima before publication because it is marketing copy, not text taken from her CV.

## 14. Teaching Method

### How learning with Omaima works

1. **Discover** — understand level, goal, and weak areas
2. **Personalize** — build the learning direction around the learner
3. **Learn & Practice** — clear explanation plus practical use
4. **Feedback** — correct mistakes and identify what needs reinforcement
5. **Progress** — review development and adjust the plan

The visual treatment may use a connected path revealed progressively during scroll.

## 15. Quick Level Quiz

### V1 goal

Lead generation and engagement, not formal CEFR placement.

### Scope

- 7–10 questions
- Approximately 2 minutes
- One question per screen
- Progress indicator
- Mix of simple grammar, vocabulary, and light reading items

### Result wording

Do not claim a definitive CEFR result from this short quiz.

Example:

> **Your answers suggest you’re around an Elementary–Pre-Intermediate level.**

Followed by:

> This is only a quick estimate. For a more accurate evaluation, book your free assessment with Omaima.

Actions:

- **Book My Free Assessment**
- **Retake Quiz**

## 16. Free Assessment Flow

### Positioning

**Free 15–20 minute English assessment**

Purpose:

- Understand the current level
- Discuss the learner’s goal
- Recommend the most suitable learning direction

### Multi-step form

Use one question per step where possible.

Fields:

1. Who is the lesson for? — Myself / My child
2. Age group — Kid / Teen / Adult
3. Main goal — Conversation / School Support / Exam Preparation / General English
4. Current level — Beginner / Intermediate / Advanced / Not sure
5. Preferred format — Online / Offline if available
6. Name
7. WhatsApp number

Do not request unnecessary data such as email unless there is a clear operational reason.

### Completion

After submission, present:

> **Your assessment request is ready. Continue on WhatsApp to confirm your time.**

Then open WhatsApp with a prefilled structured message containing the submitted information.

## 17. Learning Paths / Packages

Do not show fixed public pricing in V1.

Use the heading:

### Choose Your Learning Path

### Start

For a gentle start or a focused objective.

- Personalized lessons
- Flexible schedule
- Focused skills

### Progress — Recommended

Primary ongoing path.

- Consistent learning
- Practice
- Feedback
- Progress tracking

### Intensive

For exams or more time-sensitive goals.

- Higher frequency
- Focused goals
- Extra practice
- Intensive revision

CTA on paths:

**Find My Best Plan**

The CTA routes to the free assessment.

Disclaimer:

> Your lesson plan and frequency will be recommended according to your level, goals and availability.

## 18. Testimonials / Social Proof

Only use real testimonials.

Potential categories:

- Student
- Parent
- Teen student
- Conversation learner
- School support learner

Later additions may include:

- Privacy-safe WhatsApp review screenshots
- Voice testimonials
- Before/after learning stories

If V1 does not have sufficient real testimonials, replace this section with:

### What Students Can Expect

Use outcome-oriented statements that do not fabricate customer results.

## 19. About Omaima Preview

Keep the Home version short.

Suggested opening:

**Hi, I’m Omaima 👋**

Followed by a short description of her teaching approach.

CTA:

**Meet Omaima →**

### CV-supported facts available for the full About page

The uploaded CV states that Omaima:

- Holds a **Bachelor of Education & Arts | KFC**, completed in June 2022, grade: Good
- Has worked as a **Freelance Teacher of English** since December 2023
- Has taught secondary-stage students online
- Has used methods including **Elicitation** and **Drilling**
- Has worked with **Connect** and **Connect Plus** curricula
- Attended an **ELT Gathering** webinar in August 2024
- Completed a **Professional Development** certificate from TEFLism in August 2024
- Completed **The Pronunciation of American English** on Coursera in January 2024
- Completed **SEL for Students** on Coursera
- Completed **TOEFL Preparation** on Coursera in August 2023
- Completed multiple **Arizona State University TESOL** Coursera modules in July 2023
- Completed **Speak English Professionally: In Person, Online & On the Phone** on Coursera in June 2023

Important: credentials and service claims should be presented exactly and conservatively. Course completion does not automatically imply certification to provide official exam preparation services.

## 20. FAQ

Recommended V1 questions:

- Are the lessons online?
- Who can join the lessons?
- I don’t know my English level. Is that okay?
- Is the assessment really free?
- Is the trial lesson free?
- How much do lessons cost?
- Can you help with school English?
- Do you teach conversation?
- What if I’m a complete beginner?

Use a simple accordion UI.

## 21. WhatsApp Experience

Use a compact persistent WhatsApp entry point that does not cover content.

Suggested pre-contact intent choices:

- Book a Free Assessment
- Ask about lessons
- School Support
- Conversation Practice
- Exam Preparation

Generate an appropriate prefilled message based on the selected intent.

If the learner completed the assessment form, include their submitted information in the WhatsApp message rather than asking them to repeat it.

## 22. Final CTA

Suggested English direction:

### Ready to make English feel easier?

Let’s find the learning plan that fits you.

**[Book Your Free Assessment]**

Secondary:

**Not sure yet? Take the 2-minute level quiz →**

Suggested Arabic direction:

### جاهز تبدأ تتعلم الإنجليزي بطريقة تناسبك؟

ابدأ بتقييم مجاني، واعرف الخطوة المناسبة لمستواك وهدفك.

**[احجز تقييمك المجاني]**

## 23. Footer

Include:

- Omaima Ashour — English Tutor
- Home
- About
- Lessons
- Level Quiz
- Free Assessment
- WhatsApp
- Email
- Social links when available
- English / العربية
- Copyright
- Privacy Policy
- Terms if needed

Because the V1 site collects learner information through forms and may use analytics, a Privacy Policy should be prepared before public launch.

## 24. Mobile-First Behavior

Mobile traffic is considered a primary use case.

### Principles

- Clear headline before visual complexity
- Prominent CTA without excessive sticky UI
- Portrait appears early in the hero
- One-question-per-step forms
- One-question-per-screen quiz
- Large touch targets
- No interaction dependent only on hover
- Avoid hidden carousel-only content for essential services
- Fast page load and optimized imagery

A bottom sticky **Book Free Assessment** CTA may be used on mobile but should disappear or reduce prominence while the user is actively completing the assessment form.

## 25. Accessibility & UX Requirements

- Keyboard-accessible navigation and forms
- Visible focus states
- Proper form labels
- Sufficient text/background contrast
- Reduced-motion support
- Semantic heading hierarchy
- Accessible accordion behavior
- RTL-compatible UI
- Minimum comfortable mobile touch targets
- Error messages adjacent to affected fields
- Preserve user form values when validation fails

## 26. Data & Privacy Principles

V1 should collect only information needed to arrange the assessment.

Do not collect sensitive learner information without a clear need.

At minimum:

- Explain why contact details are collected
- Avoid exposing submitted data in public URLs
- Do not store more information than operationally necessary
- If analytics or third-party embeds are used, reflect that in the Privacy Policy

The exact storage implementation is an implementation-phase decision.

## 27. Error & Fallback Behavior

### Assessment form

If WhatsApp cannot be opened:

- Confirm the assessment request details on-screen
- Provide a copyable message
- Provide Omaima’s verified contact channel

### Quiz

If the visitor leaves mid-quiz:

- No account is required
- Restarting is acceptable in V1

### Language switch

If a translation key is missing, avoid rendering raw technical keys. Use a safe fallback copy and log the missing content in development.

## 28. Performance Principles

- Mobile-first performance budget
- Responsive image formats and sizes
- Lazy-load non-critical images
- Keep hero imagery optimized despite its visual importance
- Use lightweight CSS/SVG motion where possible
- Avoid heavy 3D and large animation libraries unless justified
- Defer non-essential scripts
- Minimize third-party dependencies

## 29. SEO & Shareability

Each public page should have:

- Localized page title
- Localized meta description
- Social sharing metadata
- Canonical URL handling
- Meaningful headings
- Human-readable URLs

Structured data may be considered during implementation if it accurately represents the business and services.

## 30. V1 Success Criteria

The V1 is successful when a first-time visitor can:

1. Understand who Omaima teaches and what she offers within seconds.
2. Identify a relevant service without reading the full site.
3. Take the quick level quiz on mobile without friction.
4. Complete the free assessment form easily.
5. Continue to WhatsApp with a prefilled message.
6. Switch cleanly between Arabic and English.
7. Use the site effectively on mobile, tablet, and desktop.
8. Experience an energetic but professional visual identity.
9. Access real, non-fabricated credentials and social proof.
10. Reach the primary CTA from multiple points without the page feeling aggressive.

## 31. Future Expansion Path

### Phase 2

Potential lightweight student area:

- Lesson resources
- Files
- Homework
- Simple progress notes

### Phase 3

Only if business demand justifies it:

- Full learner accounts
- Recorded courses
- Payments
- Progress dashboards
- Course management
- More advanced assessment
- Live-session workflows

The public marketing and conversion site should remain useful even if these later systems are added.

## 32. Open Implementation Decisions

The following are intentionally deferred until the implementation plan:

- Frontend framework
- Hosting provider
- Form backend / database
- Analytics provider
- WhatsApp integration mechanics
- CMS vs code-managed content
- Exact quiz scoring logic
- Exact design tokens and final font pairing
- SEO implementation details
- Deployment and CI/CD

These should be selected based on launch speed, maintainability, budget, and future expansion needs rather than assumed during design.

## 33. Final Design Decision

The approved product is a **bilingual, mobile-first Hybrid Conversion Website** centered on Omaima’s personal teaching brand, real portrait, clear service segmentation, a short interactive level quiz, a free 15–20 minute assessment, personalized learning paths, and WhatsApp-assisted conversion.

It is deliberately **not** an LMS in V1.

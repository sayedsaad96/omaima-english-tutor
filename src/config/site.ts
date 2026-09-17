export const siteConfig = {
  name: 'Omaima Ashour — English Tutor',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
} as const;

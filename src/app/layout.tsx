import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Omaima Ashour — English Tutor',
  description:
    'Personalized online English lessons for kids, teens and adults. Book a free assessment or take the 2-minute level quiz.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}

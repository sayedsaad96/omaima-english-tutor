import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { themeInitScript } from '../document-init';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Omaima Ashour — English Tutor',
  description:
    'Personalized online English lessons for kids, teens and adults. Book a free assessment or take the 2-minute level quiz.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf7f1' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1719' },
  ],
};

/**
 * Document root for the `/` redirect route. This route only redirects to
 * `/en`, so it ships a neutral English-only document shell — the localized
 * document roots live in `src/app/[locale]/layout.tsx`.
 */
export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="h-full"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <Script
          id="omaima-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {children}
      </body>
    </html>
  );
}

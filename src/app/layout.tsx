import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Omaima Ashour — English Tutor',
  description:
    'Personalized online English lessons for kids, teens and adults. Book a free assessment or take the 2-minute level quiz.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffaf6' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1120' },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('omaima-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}

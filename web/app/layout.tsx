import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/common/Providers';
import { UserKeyInit } from '@/components/common/UserKeyInit';
import { Navbar } from '@/components/navbar/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Content App',
  description: 'Bilingual reading platform with TTS',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoBengali.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <Providers>
          <UserKeyInit />
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

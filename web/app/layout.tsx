import type { Metadata } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/common/Providers';
import { UserKeyInit } from '@/components/common/UserKeyInit';
import { Navbar } from '@/components/navbar/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Content App',
  description: 'Bilingual reading platform with TTS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoBengali.variable} font-sans antialiased`}
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

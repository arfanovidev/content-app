import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali, Playfair_Display, Courier_Prime } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Toaster } from 'sonner';
import { Providers } from '@/components/common/Providers';
import { ContentProtection } from '@/components/security/ContentProtection';
import { UserKeyInit } from '@/components/common/UserKeyInit';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SignupModal } from '@/components/auth/SignupModal';

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

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="scroll-smooth"
    >
      <body
        className={`${inter.variable} ${notoBengali.variable} ${playfair.variable} ${courier.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ContentProtection />
          <Providers>
            <UserKeyInit />
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <Footer />
            <SignupModal />
          </Providers>
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast: 'rounded-xl border border-border bg-card text-foreground',
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
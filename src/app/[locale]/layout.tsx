import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import '../globals.css';
import Nav from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '@/../i18n';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import ClientWrapper from '@/components/client-wrapper'; // Nouveau wrapper

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};


export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Nav />
            <ClientWrapper>  {/* Wrapper client pour le loader */}
              <div className="text-text dark:text-darkText pb-10 pt-28 container flex min-h-screen">
                {children}
              </div>
            </ClientWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

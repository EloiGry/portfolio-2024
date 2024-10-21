import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../globals.css'
import Nav from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/../i18n";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { AnimatePresence } from 'framer-motion'



const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Tu peux spécifier les variantes que tu utilises
});

type Props = {
  children: ReactNode
  params: { locale: string }
}


export const metadata: Metadata = {
  title: 'Eloi Grychta',
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
    const messages = useMessages();
  return (
    <AnimatePresence>
      <html lang={locale} suppressHydrationWarning={true}>
        <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Nav />
            <div className="text-text dark:text-darkText pb-10 pt-28 container">
              {children}
            </div>
          </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </AnimatePresence>
  )
}

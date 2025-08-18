import { ThemeProvider } from '../context/theme-context.tsx';
import React from 'react';
import Providers from './providers';
import './globals.css';
import { useLocale } from 'next-intl';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

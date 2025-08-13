import type { Metadata } from 'next';
import { ThemeProvider } from '../context/theme-context.tsx';
import React from 'react';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

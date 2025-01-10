import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

import { QueryContextProvider } from '@/context/react-query-client';
import RootLayoutWrapper from './_RootLayoutWrapper';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jobernify',
    template: '%s | Jobernify',
  },
  description:
    'Unlock your career potential with Jobernify. Explore opportunities, connect with others, and achieve your goals with our innovative platform. Begin your journey now!',
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <QueryContextProvider>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </QueryContextProvider>
      </body>
    </html>
  );
}

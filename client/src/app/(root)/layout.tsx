import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

import RootLayoutWrapper from './_RootLayoutWrapper';
import '../globals.css';

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: '/images/logo-icon.png',
        href: '/images/logo-icon.png',
      },
    ],
  },
  title: 'Jobernify',
  description:
    'Unlock your career potential with Jobernify. Explore opportunities, connect with others, and achieve your goals with our innovative platform. Begin your journey now!',
  openGraph: {
    title: 'Jobernify - Unlock Your Career Potential',
    description:
      'Unlock your career potential with Jobernify. Explore opportunities, connect with others, and achieve your goals with our innovative platform. Begin your journey now!',
    type: 'website',
    locale: 'en_US',
    url: 'https://jobernify.com',
    siteName: 'Jobernify',
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
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}

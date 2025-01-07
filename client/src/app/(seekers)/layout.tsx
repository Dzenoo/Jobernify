import { Metadata } from 'next';

import dynamic from 'next/dynamic';

import { QueryContextProvider } from '@/context/react-query-client';
import { AppThemeProvider } from '@/context/app-theme-provider';
import { AiAssistantProvider } from '@/context/ai-assistant';

import { Toaster } from '@/components/ui/info/toaster';

import { GeistSans } from 'geist/font/sans';

import SeekersLayoutWrapper from './_SeekersLayoutWrapper';
import '../globals.css';

const MobileBar = dynamic(() => import('@/components/layout/navbar/Mobile'), {
  ssr: false,
});

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
    'Find your dream job or perfect candidate with ease using Jobernify. Start today!',
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

export default function SeekersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={GeistSans.className}>
        <QueryContextProvider>
          <AppThemeProvider>
            <AiAssistantProvider>
              <SeekersLayoutWrapper>{children}</SeekersLayoutWrapper>
              <Toaster />
              <MobileBar />
            </AiAssistantProvider>
          </AppThemeProvider>
        </QueryContextProvider>
      </body>
    </html>
  );
}

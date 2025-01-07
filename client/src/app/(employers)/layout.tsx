import { Metadata } from 'next';

import dynamic from 'next/dynamic';

import { QueryContextProvider } from '@/context/react-query-client';
import { AppThemeProvider } from '@/context/app-theme-provider';
import { AiAssistantProvider } from '@/context/ai-assistant';

import { Toaster } from '@/components/ui/info/toaster';

import { GeistSans } from 'geist/font/sans';

import EmployerLayoutWrapper from './_EmployerLayoutWrapper';
import '../globals.css';

const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'), {
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
    'Attract top talent with ease using Jobernify. Showcase your company culture, and reach a pool of qualified candidates. Start your hiring journey today!',
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

export default function EmployersLayout({
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
              <EmployerLayoutWrapper>{children}</EmployerLayoutWrapper>
            </AiAssistantProvider>
            <Toaster />
          </AppThemeProvider>
        </QueryContextProvider>
      </body>
    </html>
  );
}

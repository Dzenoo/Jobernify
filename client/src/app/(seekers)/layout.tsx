import { Metadata } from 'next';

import dynamic from 'next/dynamic';

import { QueryContextProvider } from '@/context/react-query-client';
import AppThemeProvider from '@/context/app-theme-provider';

import { Toaster } from '@/components/ui/toaster';

import { GeistSans } from 'geist/font/sans';

import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/footer/Footer';
import '../globals.css';

const MobileBar = dynamic(() => import('@/components/layout/navbar/Mobile'), {
  ssr: false,
});

const JobernifyAi = dynamic(
  () => import('@/components/shared/chatbot/JobernifyAi'),
  {
    ssr: false,
  },
);

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
    'Find your dream job with ease using Jobernify. Read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!',
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
    <QueryContextProvider>
      <html suppressHydrationWarning={true} lang="en">
        <body className={GeistSans.className}>
          <AppThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar href="/jobs" />
              <main className="flex-1 base-margin">
                {children}
                <JobernifyAi />
              </main>
              <Footer />
            </div>
            <Toaster />
            <MobileBar />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}

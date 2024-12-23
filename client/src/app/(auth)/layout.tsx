import { Metadata } from 'next';

import { QueryContextProvider } from '@/context/react-query-client';

import { Toaster } from '@/components/ui/info/toaster';

import { GeistSans } from 'geist/font/sans';

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
    'Create an account with Jobernify to start your job search journey. Sign up as a seeker to find your dream job or as an employer to attract top talent.',
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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryContextProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </QueryContextProvider>
  );
}

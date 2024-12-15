import { Metadata } from 'next';

import dynamic from 'next/dynamic';

import { QueryContextProvider } from '@/context/react-query-client';
import AppThemeProvider from '@/context/app-theme-provider';

import { Toaster } from '@/components/ui/toaster';

import { Libre_Franklin } from 'next/font/google';

import Footer from '@/components/layout/footer/Footer';
import '../globals.css';

const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'), {
  ssr: false,
});

const libre = Libre_Franklin({ subsets: ['latin'], weight: '400' });

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
    <QueryContextProvider>
      <html suppressHydrationWarning={true} lang="en">
        <body className={libre.className}>
          <AppThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar href="/seekers" />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}

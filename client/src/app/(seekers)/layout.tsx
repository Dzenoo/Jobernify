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
  icons: 'favicon.ico',
  title: {
    default: 'Jobernify | The AI Powered Job Search Platform ',
    template: '%s | Jobernify',
  },
  description: 'Find your dream job with ease using Jobernify. Start today!',
  twitter: {
    card: 'summary_large_image',
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

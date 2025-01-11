import { Metadata } from 'next';

import { QueryContextProvider } from '@/context/react-query-client';
import { AppThemeProvider } from '@/context/app-theme-provider';
import { AiAssistantProvider } from '@/context/ai-assistant';

import { Toaster } from '@/components/ui/info/toaster';

import { GeistSans } from 'geist/font/sans';

import EmployerLayoutWrapper from './_EmployerLayoutWrapper';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jobernify | The AI Powered Job Search Platform ',
    template: '%s | Jobernify',
  },
  description:
    'Attract top talent with ease using Jobernify. Showcase your company culture, and reach a pool of qualified candidates.',
  twitter: {
    card: 'summary_large_image',
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

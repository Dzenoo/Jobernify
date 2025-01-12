import { Metadata } from 'next';

import { QueryContextProvider } from '@/context/react-query-client';

import { Toaster } from '@/components/ui/info/toaster';

import { GeistSans } from 'geist/font/sans';

import AuthLayoutWrapper from './_AuthLayoutWrapper';
import '../globals.css';

export const metadata: Metadata = {
  icons: 'favicon.ico',
  title: {
    default: 'Jobernify | The AI Powered Job Search Platform',
    template: '%s | Jobernify',
  },
  description:
    'Create an account with Jobernify to start your job search journey.',
  twitter: {
    card: 'summary_large_image',
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
          <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
          <Toaster />
        </body>
      </html>
    </QueryContextProvider>
  );
}

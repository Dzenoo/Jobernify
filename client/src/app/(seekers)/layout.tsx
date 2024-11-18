import { Metadata } from "next";

import dynamic from "next/dynamic";

import { QueryContextProvider } from "@/context/react-query-client";
import AppThemeProvider from "@/context/app-theme-provider";

import { Toaster } from "@/components/ui/toaster";

import { Libre_Franklin } from "next/font/google";

import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import "../globals.css";

const MobileBar = dynamic(() => import("@/components/layout/navbar/Mobile"), {
  ssr: false,
});

const libre = Libre_Franklin({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/logo-icon-dark.png",
        href: "/images/logo-icon-dark.png",
      },
    ],
  },
  title: "Jobernify",
  description:
    "Find your dream job with ease using Jobernify. Read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!",
};

export default function SeekersLayout({
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
              <Navbar href="/jobs" />
              <main className="flex-1 base-margin">{children}</main>
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

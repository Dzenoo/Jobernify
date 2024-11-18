import { Metadata } from "next";

import dynamic from "next/dynamic";

import { QueryContextProvider } from "@/context/react-query-client";

import { Toaster } from "@/components/ui/toaster";

import { Libre_Franklin } from "next/font/google";

import "../globals.css";

const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"), {
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
    "Create an account with Jobernify to start your job search journey. Sign up as a seeker to find your dream job or as an employer to attract top talent.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryContextProvider>
      <html lang="en">
        <body className={libre.className}>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </QueryContextProvider>
  );
}

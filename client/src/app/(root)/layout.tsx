import type { Metadata } from "next";

import { Libre_Franklin } from "next/font/google";

import Footer from "@/components/layout/footer/Footer";
import "../globals.css";
import NavbarLanding from "@/components/shared/pages/landing/NavbarLanding";

const libre = Libre_Franklin({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/logo-icon.png",
        href: "/images/logo-icon.png",
      },
    ],
  },
  title: "Jobernify",
  description:
    "Unlock your career potential with Jobernify. Explore opportunities, connect with others, and achieve your goals with our innovative platform. Begin your journey now!",
  openGraph: {
    title: "Jobernify - Unlock Your Career Potential",
    description:
      "Unlock your career potential with Jobernify. Explore opportunities, connect with others, and achieve your goals with our innovative platform. Begin your journey now!",
    type: "website",
    locale: "en_US",
    url: "https://jobernify.com",
    siteName: "Jobernify",
  },
  metadataBase: new URL("https://jobernify.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libre.className}>
        <div className="flex flex-col min-h-screen">
          <NavbarLanding />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

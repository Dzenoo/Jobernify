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
        url: "/images/logo-icon-dark.png",
        href: "/images/logo-icon-dark.png",
      },
    ],
  },
  title: "Jobernify",
  description:
    "Unlock your career potential with Jobernify. Explore opportunities, connect with others, and achieve your goals with our innovative platform. Begin your journey now!",
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

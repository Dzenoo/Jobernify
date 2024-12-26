'use client';

import React from 'react';

import { useZoomLevel } from '@/hooks/core/useZoomLevel.hook';

import NavbarLanding from '@/components/shared/pages/landing/layout/NavbarLanding';
import Footer from '@/components/layout/footer/Footer';

const RootLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isZoomedOut ? 'm-auto max-w-screen-2xl' : ''
      }`}
    >
      <NavbarLanding />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayoutWrapper;

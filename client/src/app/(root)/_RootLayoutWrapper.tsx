'use client';

import React from 'react';

import { useZoomLevel } from '@/hooks/core/useZoomLevel.hook';

import NavbarLanding from '@/components/layout/navbar/NavbarLanding';
import Footer from '@/components/layout/footer/Footer';

const RootLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div
      className={`bg-white dark:bg-black flex flex-col min-h-screen ${
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

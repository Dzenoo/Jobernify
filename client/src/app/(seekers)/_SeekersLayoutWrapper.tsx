'use client';

import React from 'react';

import { useZoomLevel } from '@/hooks/core/useZoomLevel.hook';

import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/footer/Footer';

const SeekersLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isZoomedOut ? 'm-auto max-w-screen-2xl' : ''
      }`}
    >
      <Navbar href="/jobs" />
      <main className="flex-1 base-margin">{children}</main>
      <Footer />
    </div>
  );
};

export default SeekersLayoutWrapper;

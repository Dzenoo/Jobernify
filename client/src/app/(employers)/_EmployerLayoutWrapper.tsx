'use client';

import React from 'react';

import { useZoomLevel } from '@/hooks/core/useZoomLevel.hook';

import Footer from '@/components/layout/footer/Footer';
import Navbar from '@/components/layout/navbar/Navbar';

const EmployerLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isZoomedOut ? 'm-auto max-w-screen-2xl' : ''
      }`}
    >
      <Navbar href="/seekers" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default EmployerLayoutWrapper;

'use client';

import React from 'react';

import { useZoomLevel } from '@/hooks/core/useZoomLevel.hook';

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <main className={`${isZoomedOut ? 'm-auto max-w-screen-2xl' : ''}`}>
      {children}
    </main>
  );
};

export default AuthLayoutWrapper;

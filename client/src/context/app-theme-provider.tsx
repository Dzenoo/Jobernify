'use client';

import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      {children}
    </ThemeProvider>
  );
};

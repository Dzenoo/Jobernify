'use client';

import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';

export const AppThemeProvider = ({
  children,
  defaultTheme = 'light',
}: {
  children: ReactNode;
  defaultTheme?: string;
}) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme} attribute="class">
      {children}
    </ThemeProvider>
  );
};

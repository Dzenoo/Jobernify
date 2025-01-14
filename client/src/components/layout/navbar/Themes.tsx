'use client';

import React from 'react';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { useMounted } from '@/hooks/core/useMounted.hook';

const Themes: React.FC = () => {
  const { isMounted } = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  if (!isMounted) return null;

  function lightTheme(): void {
    setTheme('light');
  }

  function darkTheme(): void {
    setTheme('dark');
  }

  return (
    <div className="flex gap-4">
      {resolvedTheme === 'dark' ? (
        <button onClick={lightTheme}>
          <Sun />
        </button>
      ) : (
        <button onClick={darkTheme}>
          <Moon />
        </button>
      )}
    </div>
  );
};

export default Themes;

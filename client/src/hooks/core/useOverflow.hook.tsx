'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

const useOverflow = (name: string) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes(name)) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [pathname]);
};

export { useOverflow };

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC<{ href?: string }> = ({ href = '/' }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href={href}>
      <Image
        className="sm:hidden max-w-[50px] max-h-[50px]"
        src={
          resolvedTheme === 'dark'
            ? '/images/logo-icon-dark.png'
            : '/images/logo-icon.png'
        }
        alt="logo-small"
        width={50}
        height={50}
        loading="lazy"
      />
      <Image
        className="max-sm:hidden"
        src={
          resolvedTheme === 'dark'
            ? '/images/logo-dark.png'
            : '/images/logo-light.png'
        }
        alt="logo-big"
        width={150}
        height={150}
        loading="lazy"
      />
    </Link>
  );
};

export default Logo;

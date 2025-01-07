import React from 'react';
import { useTheme } from 'next-themes';

const GithubIcon: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <img
      src={
        resolvedTheme === 'dark'
          ? '/icons/github-icon-white.png'
          : '/icons/github-icon.png'
      }
      alt="linkedin-logo"
      className="min-w-[1.5em] max-w-[1.5em] w-full h-auto object-cover"
    />
  );
};

export default GithubIcon;

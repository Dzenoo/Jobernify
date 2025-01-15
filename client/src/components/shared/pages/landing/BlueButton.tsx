import React from 'react';

import { cn } from '@/lib/utils';

type BlueButtonProps = {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const BlueButton: React.FC<BlueButtonProps> = ({
  className,
  children,
  isActive = true,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        'px-5 py-3 text-sm rounded-full transition-all',

        'text-blue-600 border border-blue-600 bg-blue-50 hover:bg-blue-100',

        'dark:text-[#0084FF] dark:border-[#0084FF] dark:bg-[#1d4fd817] dark:bg-opacity-10 dark:hover:bg-[#1d4fd82f]',

        !isActive && [
          'border-gray-400 bg-gray-200 text-gray-500 hover:bg-gray-300',
          'dark:border-[#1b1b1b] dark:bg-[#1e1e1e] dark:text-[#9C9C9C] dark:hover:bg-[#1e1e1e]',
        ],

        className,
      )}
    >
      {children}
    </button>
  );
};

export default BlueButton;

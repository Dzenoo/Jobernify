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
        'px-5 py-3 text-sm text-[#0084FF] border border-[#0084FF] rounded-full bg-[#1d4fd817] bg-opacity-10 transition-all hover:bg-[#1d4fd82f]',
        `${
          !isActive &&
          'border-[#DFDFDF] bg-[#EAEAEA0D] hover:bg-[#eaeaea6e] text-gray-500'
        }`,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default BlueButton;

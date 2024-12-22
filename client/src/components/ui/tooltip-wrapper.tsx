import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

type TooltipWrapperProps = {
  tooltip: string;
  children: React.ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  tooltip,
  children,
  delay = 400,
  side,
}) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { TooltipWrapper };

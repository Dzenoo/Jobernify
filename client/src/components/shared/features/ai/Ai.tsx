'use client';

import React, { useEffect } from 'react';

import { Bot } from 'lucide-react';

import AiContainer from './AiContainer';
import { useWebSocket } from '@/hooks/core/useWebSocket.hook';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/layout/sheet';
import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';

type AiProps = {
  isSeeker: boolean;
};

const Ai: React.FC<AiProps> = ({ isSeeker }) => {
  const { connect, disconnect, socket } = useWebSocket({
    url: 'ws://jobernify-production.up.railway.app',
    // url: 'ws://localhost:8080',
  });

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  const sheetDescription = isSeeker
    ? 'Chat with JobernifyAI for job recommendations, career advice, and more.'
    : 'Chat with JobernifyAI for finding best fit seekers for your job, hiring advice, and more.';

  return (
    <Sheet>
      <SheetTrigger onClick={connect}>
        <TooltipWrapper tooltip="JobernifyAI">
          <Bot />
        </TooltipWrapper>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="p-4 flex flex-col"
      >
        <SheetHeader className="pt-5">
          <SheetTitle className="flex items-center gap-2">
            <Bot />
            JobernifyAI
          </SheetTitle>
          <SheetDescription className="text-left">
            {sheetDescription}
          </SheetDescription>
        </SheetHeader>
        <AiContainer socket={socket} />
      </SheetContent>
    </Sheet>
  );
};

export default Ai;

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
} from '@/components/ui/sheet';

const Ai: React.FC = () => {
  const { connect, disconnect, socket } = useWebSocket({
    url: 'ws://localhost:8080',
  });

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return (
    <Sheet>
      <SheetTrigger onClick={connect}>
        <Bot />
      </SheetTrigger>
      <SheetContent className="p-4 flex flex-col">
        <SheetHeader className="pt-5">
          <SheetTitle className="flex items-center gap-2">
            <Bot />
            JobernifyAI
          </SheetTitle>
          <SheetDescription className="text-left">
            Chat with JobernifyAI for job recommendations, career advice, and
            more.
          </SheetDescription>
        </SheetHeader>
        <AiContainer socket={socket} />
      </SheetContent>
    </Sheet>
  );
};

export default Ai;

'use client';

import React, { useEffect } from 'react';

import { Bot, MessageCircle } from 'lucide-react';

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

const JobernifyAi: React.FC = () => {
  const { connect, disconnect, socket } = useWebSocket({
    url: 'ws://localhost:8080',
    onConnect: () => {
      console.log('WebSocket connected');
    },
  });

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return (
    <Sheet>
      <SheetTrigger
        onClick={connect}
        className="z-50 fixed bottom-5 right-5 w-[4em] h-[4em] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
      >
        <MessageCircle className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-4 flex flex-col">
        <SheetHeader className="pt-5">
          <SheetTitle className="flex items-center gap-2">
            <Bot />
            JobernifyAI
          </SheetTitle>
          <SheetDescription>
            Chat with JobernifyAI for job recommendations, career advice, and
            more.
          </SheetDescription>
        </SheetHeader>
        <AiContainer socket={socket} />
      </SheetContent>
    </Sheet>
  );
};

export default JobernifyAi;

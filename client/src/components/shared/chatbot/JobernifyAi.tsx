import React from 'react';

import { MessageCircle } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const JobernifyAi: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-5 right-5">
        <button className="relative w-[4em] h-[4em] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-2xl active:scale-95">
          <MessageCircle className="text-white" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default JobernifyAi;

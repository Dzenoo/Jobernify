import React from 'react';

import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type CoverLetterProps = {
  cover_letter: string;
};

const CoverLetter: React.FC<CoverLetterProps> = ({ cover_letter }) => {
  return cover_letter ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-500">
          Read
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10">
        <div className="overflow-auto max-h-96 hide-scrollbar">
          <ReactMarkdown>{cover_letter}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    'Cover Letter Unassigned'
  );
};

export default CoverLetter;

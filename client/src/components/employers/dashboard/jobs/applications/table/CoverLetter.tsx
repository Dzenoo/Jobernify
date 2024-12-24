import React from 'react';

import MarkdownRenderer from '@/components/shared/markdown/MarkdownRenderer';

import { sanitize } from '@/lib/utils';

import { Button } from '@/components/ui/buttons/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/layout/dialog';

type CoverLetterProps = {
  cover_letter: string;
};

const CoverLetter: React.FC<CoverLetterProps> = ({ cover_letter }) => {
  const sanitizedCoverLetter = sanitize(cover_letter);

  return cover_letter ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-500">
          Read
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle>Cover Letter</DialogTitle>
          <DialogDescription>
            Read the cover letter for this job application
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto max-h-96 hide-scrollbar">
          <MarkdownRenderer content={sanitizedCoverLetter} />
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    'Cover Letter Unassigned'
  );
};

export default CoverLetter;

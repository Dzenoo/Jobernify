import React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type CoverLetterProps = {
  cover_letter: string;
};

const CoverLetter: React.FC<CoverLetterProps> = ({ cover_letter }) => {
  return cover_letter ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-initial-blue">
          Read
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-semibold">Cover Letter</h2>
        <p className="mt-2">{cover_letter}</p>
      </DialogContent>
    </Dialog>
  ) : (
    'Cover Letter Unassigned'
  );
};

export default CoverLetter;

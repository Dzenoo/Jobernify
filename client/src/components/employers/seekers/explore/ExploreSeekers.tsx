import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

const ExploreSeekers: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div>
          <h1 className="text-initial-black font-semibold">Explore Seekers</h1>
        </div>
        <div>
          <p className="text-muted-foreground text-base">
            Discover and connect with seekers who possess the skills you're
            looking for through their social media profiles
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExploreSeekers;

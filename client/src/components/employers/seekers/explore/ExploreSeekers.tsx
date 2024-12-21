import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ExploreSeekers: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>Explore Seekers</CardTitle>
          <CardDescription>
            Discover and connect with seekers who possess the skills you're
            looking for through their social media profiles.
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default ExploreSeekers;

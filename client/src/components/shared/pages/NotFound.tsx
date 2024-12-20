import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound: React.FC<{ href?: string }> = ({ href = '/' }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-semibold mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-muted-foreground mb-6 dark:text-white">
        Oops! Page Not Found
      </h2>
      <p className="text-muted-foreground dark:text-muted-foreground mb-8 text-center max-w-md">
        We're sorry, but the page you're looking for doesn't exist or has been
        moved.
      </p>
      <Link href={href}>
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;

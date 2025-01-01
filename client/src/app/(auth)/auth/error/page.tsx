import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/buttons/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';

const AuthenticationError = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <div className="flex justify-center items-center text-center h-screen">
      <Card>
        <CardHeader className="text-left">
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription className="max-w-xs">
            {searchParams?.error}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button className="w-full" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticationError;

import React from 'react';

import { AlertCircle } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/info/alert';

const AuthenticationError = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <div className="flex justify-center items-center text-center h-screen">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>{searchParams?.error} </AlertDescription>
      </Alert>
    </div>
  );
};

export default AuthenticationError;

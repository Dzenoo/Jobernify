'use client';

import React, { useEffect, useState } from 'react';

import Login from '@/components/auth/login/Login';

import { useToast } from '@/components/ui/info/use-toast';

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.error;
    if (error) {
      setErrorMessage(error);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (errorMessage) {
        toast({
          title: 'Authentication Error',
          variant: 'destructive',
          description: errorMessage,
        });
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [errorMessage, toast]);

  return (
    <section className="h-screen flex justify-center items-center">
      <Login />
    </section>
  );
};

export default LoginPage;

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Login from '@/components/auth/login/Login';

import { useToast } from '@/components/ui/info/use-toast';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: 'Authentication Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [errorMessage, toast]);

  return (
    <section className="h-screen flex justify-center items-center">
      <Login />
    </section>
  );
}

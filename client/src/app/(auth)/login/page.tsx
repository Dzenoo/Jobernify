'use client';

import React, { useEffect } from 'react';

import { useMounted } from '@/hooks/core/useMounted.hook';

import Login from '@/components/auth/login/Login';

import { useToast } from '@/components/ui/info/use-toast';

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { isMounted } = useMounted();
  const { toast } = useToast();

  useEffect(() => {
    if (!isMounted || !searchParams.error) return;

    toast({
      title: 'Authentication Error',
      variant: 'destructive',
      description: searchParams.error,
    });
  }, [isMounted, searchParams.error, toast]);

  return (
    <section className="h-screen flex justify-center items-center">
      <Login />
    </section>
  );
};

export default LoginPage;

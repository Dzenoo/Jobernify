'use client';

import React, { useEffect, useState } from 'react';

import Login from '@/components/auth/login/Login';

import { useToast } from '@/components/ui/info/use-toast';

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (searchParams.error) {
      toast({
        title: 'Authentication Error',
        variant: 'destructive',
        description: searchParams.error,
      });
    }
  }, [searchParams.error, toast, mounted]);

  return (
    <section className="h-screen flex justify-center items-center">
      <Login />
    </section>
  );
};

export default LoginPage;

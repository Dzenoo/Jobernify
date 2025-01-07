'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Mail } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';
import { Button } from '@/components/ui/buttons/button';

const CheckYourEmail = () => {
  const router = useRouter();

  const isPendingVerification =
    typeof window !== 'undefined'
      ? localStorage.getItem('pendingVerification') === 'true'
      : false;

  useEffect(() => {
    if (!isPendingVerification) {
      router.push('/login');
    }
  }, [isPendingVerification, router]);

  useEffect(() => {
    if (isPendingVerification) {
      localStorage.removeItem('pendingVerification');
    }
  }, [isPendingVerification]);

  return (
    <section className="flex items-center justify-center min-h-screen dark:bg-black px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2">
          <div className="flex justify-center items-center mb-4">
            <Mail className="w-12 h-12 text-blue-500" aria-hidden="true" />
          </div>
          <CardTitle className="text-center text-2xl font-semibold">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-center text-sm text-muted-foreground mb-6">
            We've sent a verification link to your email. Please check your
            inbox and click the link to verify your account.
          </p>
          <Button
            onClick={() => router.push('/login')}
            className="w-full"
            variant="outline"
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default CheckYourEmail;

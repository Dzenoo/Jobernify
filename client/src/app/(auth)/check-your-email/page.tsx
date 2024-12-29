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
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <CardTitle className="text-2xl font-semibold">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground mb-6">
            We've sent a verification link to your email. Please check your
            inbox and click the link to verify your account.
          </p>
          <Button variant="outline" onClick={() => router.push('/login')}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default CheckYourEmail;

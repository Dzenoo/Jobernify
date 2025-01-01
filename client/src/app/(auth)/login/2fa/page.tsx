'use client';

import React from 'react';

import TwoFactorAuthForm from '@/components/auth/2fa/TwoFactorAuthForm';
import Logo from '@/components/layout/navbar/Logo';
import NotFound from '@/components/shared/pages/NotFound';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';
import { Separator } from '@/components/ui/layout/separator';

const TwoFactorAuthenticationPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  if (!searchParams.userId) return <NotFound />;

  return (
    <section className="h-screen flex flex-col justify-center items-center gap-20">
      <Card>
        <CardHeader className="space-y-1.5 flex flex-col justify-center items-center text-center">
          <div className="py-5">
            <Logo />
          </div>
          <CardTitle>Two Factor Authentication</CardTitle>
          <CardDescription>Enter the code sent to your phone.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <TwoFactorAuthForm
            mode="LOGIN_VERIFY"
            formClassName="sm:w-[25em]"
            userId={searchParams.userId}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default TwoFactorAuthenticationPage;

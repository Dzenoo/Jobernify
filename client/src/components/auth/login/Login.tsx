import React from 'react';
import Link from 'next/link';

import LoginForm from './forms/LoginForm';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const Login: React.FC = () => {
  return (
    <Card className="flex flex-col sm:w-[450px]">
      <CardHeader>
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Login to Jobernify</h1>
          </div>
          <div>
            <p className="text-muted-foreground">
              Welcome back! Please enter your email and password to access your
              account.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <LoginForm />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-muted-foreground">
          Dont have account?{' '}
          <Link href="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;

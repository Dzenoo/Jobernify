import React from 'react';
import Link from 'next/link';

import LoginForm from './forms/LoginForm';
import Logo from '@/components/layout/navbar/Logo';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';

const Login: React.FC = () => {
  return (
    <Card className="flex flex-col sm:w-[450px]">
      <CardHeader className="space-y-5">
        <Logo />
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome back! Please enter your email and password to access your
          account.
        </CardDescription>
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

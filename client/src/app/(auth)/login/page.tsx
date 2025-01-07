'use client';

import React from 'react';

import Login from '@/components/auth/login/Login';

const LoginPage: React.FC = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <Login />
    </section>
  );
};

export default LoginPage;

'use client';

import React from 'react';

import Login from '@/components/auth/login/Login';

const LoginPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center">
      <Login />
    </section>
  );
};

export default LoginPage;

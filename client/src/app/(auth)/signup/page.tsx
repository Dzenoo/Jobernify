'use client';

import React from 'react';

import SelectAccount from '@/components/auth/signup/SelectAccount';

const SignupPage: React.FC = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <SelectAccount />
    </section>
  );
};

export default SignupPage;

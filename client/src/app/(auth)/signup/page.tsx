"use client";

import React from "react";

import SelectAccount from "@/components/auth/signup/SelectAccount";

const SignupPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center h-screen">
      <SelectAccount />
    </section>
  );
};

export default SignupPage;

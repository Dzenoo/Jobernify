"use client";

import React from "react";
import ChooseSignup from "@/components/auth/signup/ChooseSignup";

const SignupPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseSignup />
    </section>
  );
};

export default SignupPage;

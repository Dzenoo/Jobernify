"use client";

import React from "react";
import LoginForm from "@/components/auth/login/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center">
      <LoginForm />
    </section>
  );
};

export default LoginPage;

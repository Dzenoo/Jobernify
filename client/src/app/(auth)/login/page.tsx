"use client";

import React from "react";
import ChooseLogin from "@/components/auth/login/ChooseLogin";

const LoginPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center">
      <ChooseLogin />
    </section>
  );
};

export default LoginPage;

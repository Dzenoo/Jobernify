"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { TypeOfAccount } from "@/types";

const ChooseLogin: React.FC = () => {
  const [typeOfAccount, setTypeOfAccount] = useState<TypeOfAccount>(
    TypeOfAccount.Seeker
  );

  const handleTypeSelection = (type: TypeOfAccount): void => {
    setTypeOfAccount(type);
  };

  return (
    <div>
      <LoginForm
        handleTypeSelection={handleTypeSelection}
        type={typeOfAccount}
      />
    </div>
  );
};

export default ChooseLogin;

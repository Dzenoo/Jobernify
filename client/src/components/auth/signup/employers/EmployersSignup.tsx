import React from "react";

import RedirectToLoginLink from "../RedirectToLoginLink";

import EmployersSignupForm from "./EmployersSignupForm";

import { TypeOfAccount } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type EmployersSignupProps = {
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const EmployersSignup: React.FC<EmployersSignupProps> = ({
  handleTypeSelection,
}) => {
  return (
    <Card className="flex flex-col gap-2 lg:w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Looking for a job?{" "}
              <button
                className="text-blue-700 font-bold"
                onClick={() => handleTypeSelection(TypeOfAccount.Seeker)}
              >
                Seeker
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sign up to hire a talent</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <EmployersSignupForm />
      </CardContent>
      <CardFooter className="justify-center">
        <RedirectToLoginLink />
      </CardFooter>
    </Card>
  );
};

export default EmployersSignup;

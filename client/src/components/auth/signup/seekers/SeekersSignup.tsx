import React from "react";

import RedirectToLoginLink from "../RedirectToLoginLink";

import SeekersSignupForm from "./SeekersSignupForm";

import { TypeOfAccount } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type SeekersSignupProps = {
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const SeekersSignup: React.FC<SeekersSignupProps> = ({
  handleTypeSelection,
}) => {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Hiring a talent?{" "}
              <button
                className="text-blue-700 font-bold"
                onClick={() => handleTypeSelection(TypeOfAccount.Employer)}
              >
                Employer
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sign up to find job you want</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <SeekersSignupForm />
      </CardContent>
      <CardFooter className="justify-center">
        <RedirectToLoginLink />
      </CardFooter>
    </Card>
  );
};

export default SeekersSignup;

import React from "react";

import EmployersSignupForm from "./forms/EmployersSignupForm";
import SeekersSignupForm from "./forms/SeekersSignupForm";
import RedirectToLoginLink from "./RedirectToLoginLink";

import { TypeOfAccount } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type UserDataTypes = {
  id: number;
  description: string;
  title: string;
  type: TypeOfAccount;
};

const UserData: UserDataTypes[] = [
  {
    id: 1,
    description: "Hiring a talent?",
    title: "Sign up to find job you want",
    type: TypeOfAccount.Seeker,
  },
  {
    id: 2,
    description: "Looking for a job?",
    title: "Sign up to hire a talent",
    type: TypeOfAccount.Employer,
  },
];

type SignupProps = {
  typeOfAccount: TypeOfAccount;
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const Signup: React.FC<SignupProps> = ({
  typeOfAccount,
  handleTypeSelection,
}) => {
  const selectedUser = UserData.find(
    (user) => user.type === typeOfAccount
  ) as UserDataTypes;

  const isEmployer = selectedUser?.type === TypeOfAccount.Employer;

  return (
    <Card className="flex flex-col gap-2 lg:w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              {selectedUser?.description}{" "}
              <button
                className="text-blue-700 font-bold"
                onClick={() =>
                  handleTypeSelection(
                    isEmployer ? TypeOfAccount.Seeker : TypeOfAccount.Employer
                  )
                }
              >
                {isEmployer ? "Seeker" : "Employer"}
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{selectedUser?.title}</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEmployer ? <EmployersSignupForm /> : <SeekersSignupForm />}
      </CardContent>
      <CardFooter className="justify-center">
        <RedirectToLoginLink />
      </CardFooter>
    </Card>
  );
};

export default Signup;

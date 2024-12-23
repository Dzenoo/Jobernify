import React from 'react';

import EmployersSignupForm from './forms/EmployersSignupForm';
import SeekersSignupForm from './forms/SeekersSignupForm';
import RedirectToLoginLink from './RedirectToLoginLink';

import { TypeOfAccount } from '@/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/layout/navbar/Logo';

type UserDataTypes = {
  id: number;
  description: string;
  title: string;
  type: TypeOfAccount;
};

const UserData: UserDataTypes[] = [
  {
    id: 1,
    description: 'Hiring a talent?',
    title: 'Sign up to find job you want',
    type: TypeOfAccount.Seeker,
  },
  {
    id: 2,
    description: 'Looking for a job?',
    title: 'Sign up to hire a talent',
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
    (user) => user.type === typeOfAccount,
  ) as UserDataTypes;

  const isEmployer = selectedUser?.type === TypeOfAccount.Employer;

  return (
    <Card className="flex flex-col lg:w-[600px]">
      <CardHeader className="flex flex-col items-center justify-center text-center">
        <Logo />
        <CardDescription>
          {selectedUser?.description}{' '}
          <button
            className="text-blue-700 font-semibold"
            onClick={() =>
              handleTypeSelection(
                isEmployer ? TypeOfAccount.Seeker : TypeOfAccount.Employer,
              )
            }
          >
            {isEmployer ? 'Seeker' : 'Employer'}
          </button>
        </CardDescription>
        <CardTitle>{selectedUser?.title}</CardTitle>
      </CardHeader>
      <CardContent className={isEmployer ? 'pt-0' : ''}>
        {isEmployer ? <EmployersSignupForm /> : <SeekersSignupForm />}
      </CardContent>
      <CardFooter className="justify-center">
        <RedirectToLoginLink />
      </CardFooter>
    </Card>
  );
};

export default Signup;

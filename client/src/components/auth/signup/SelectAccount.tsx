'use client';

import React, { useState } from 'react';

import { Briefcase, Building } from 'lucide-react';

import Signup from './Signup';
import RedirectToLoginLink from './RedirectToLoginLink';
import Logo from '@/components/layout/navbar/Logo';

import { TypeOfAccount } from '@/types';

const SelectAccount: React.FC = () => {
  const [typeOfAccount, setTypeOfAccount] = useState<TypeOfAccount>(
    TypeOfAccount.Default,
  );

  const handleTypeSelection = (type: TypeOfAccount): void => {
    setTypeOfAccount(type);
  };

  const employer = typeOfAccount === TypeOfAccount.Employer;
  const seeker = typeOfAccount === TypeOfAccount.Seeker;

  const isSelectedAccount =
    typeOfAccount === TypeOfAccount.Seeker ||
    typeOfAccount === TypeOfAccount.Employer;

  const SelectCardsArrayData = [
    {
      icon: <Building />,
      text: 'Im a Employer, looking for talents',
      handler: () => handleTypeSelection(TypeOfAccount.Employer),
      selected: employer,
    },
    {
      icon: <Briefcase />,
      text: 'Im a Seeker, looking for job',
      handler: () => handleTypeSelection(TypeOfAccount.Seeker),
      selected: seeker,
    },
  ];

  return (
    <div className="px-5">
      {!isSelectedAccount && (
        <div className="flex flex-col justify-center items-center gap-16">
          <div>
            <Logo />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              Join as a Employer or Seeker
            </h1>
          </div>
          <div className="flex justify-between gap-3 max-sm:flex-col">
            {SelectCardsArrayData.map((tab) => renderSignupTabCard(tab))}
          </div>
          <RedirectToLoginLink />
        </div>
      )}
      {isSelectedAccount && (
        <Signup
          handleTypeSelection={handleTypeSelection}
          typeOfAccount={typeOfAccount}
        />
      )}
    </div>
  );
};

function renderSignupTabCard<
  T extends {
    icon: React.ReactNode;
    text: string;
    selected: boolean;
    handler: () => void;
  },
>({ icon, text, selected, handler }: T): React.JSX.Element {
  return (
    <div
      className={`${
        selected && 'bg-blue-100'
      } bg-white border rounded-lg p-5 border-gray-100 cursor-pointer flex flex-col gap-7 w-full transition hover:scale-105`}
      onClick={handler}
      key={text}
    >
      <div>
        <div>{icon}</div>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-initial-black text-left">{text}</h1>
      </div>
    </div>
  );
}

export default SelectAccount;

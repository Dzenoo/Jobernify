'use client';

import React, { useState } from 'react';

import { Briefcase, Building } from 'lucide-react';

import { renderSignupTabCard } from '@/helpers';

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

export default SelectAccount;

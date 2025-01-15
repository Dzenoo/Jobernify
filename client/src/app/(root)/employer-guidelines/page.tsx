import React from 'react';
import { Metadata } from 'next';

import { EmployersGuidelines } from '@/constants';

export const metadata: Metadata = {
  title: 'Employer Guidelines',
  description: 'Follow our guidelines to optimize your hiring process.',
};

const EmployerGuidelinesPage = () => {
  return (
    <section className="px-5 py-10 space-y-20 md:landing-padding">
      <div className="space-y-2">
        <div>
          <h1 className="dark:text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Guidelines for Employers
          </h1>
        </div>
        <div>
          <p className="text-[#9C9C9C] font-light">
            Welcome to Jobernify, your AI-powered recruitment solution. Use
            these guidelines to optimize your hiring experience and find the
            best talent worldwide.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {EmployersGuidelines.map((guideline) => (
          <div key={guideline.id} className="space-y-5">
            <div>
              <h2 className="dark:text-white font-semibold">
                {guideline.title}
              </h2>
            </div>
            <div>
              <ul className="space-y-4 list-disc">
                {guideline.list.map((item) => (
                  <li key={item} className="text-sm text-[#9C9C9C]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployerGuidelinesPage;

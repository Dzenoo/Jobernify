import React from 'react';
import { Metadata } from 'next';

import { SeekersGuidelines } from '@/constants';

export const metadata: Metadata = {
  title: 'Seeker Guidelines',
  description: 'Follow our guidelines to optimize your job search experience.',
};

const SeekerGuidelinesPage = () => {
  return (
    <section className="px-5 py-10 space-y-20 md:landing-padding">
      <div className="space-y-2">
        <div>
          <h1 className="text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Guidelines for Job Seekers
          </h1>
        </div>
        <div>
          <p className="text-[#9C9C9C] font-light">
            Welcome to Jobernify, your partner in finding the perfect job.
            Follow these guidelines to make the most of our platform and connect
            with global opportunities.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {SeekersGuidelines.map((guideline) => (
          <div key={guideline.id} className="space-y-5">
            <div>
              <h2 className="text-white font-semibold">{guideline.title}</h2>
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

export default SeekerGuidelinesPage;

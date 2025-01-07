'use client';

import React, { useState } from 'react';

import { HowItWorksEmployersData, HowItWorksSeekersData } from '@/constants';

import BlueButton from './BlueButton';

const HowItWorksLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState(true);

  function handleActiveTab(tab: boolean): void {
    setActiveTab(tab);
  }

  const description = activeTab
    ? 'Create your profile, browse curated job listings based on your skills, and easily apply to jobs that fit your career goals.'
    : 'Post job listings, review resumes, and find top candidates who match your hiring needs.';

  const list = activeTab ? HowItWorksSeekersData : HowItWorksEmployersData;

  return (
    <section className="px-5 flex flex-col gap-20 items-center justify-center md:landing-padding">
      <div className="text-center space-y-5">
        <div className="space-x-5">
          <BlueButton
            onClick={() => handleActiveTab(true)}
            isActive={activeTab}
          >
            Seekers
          </BlueButton>
          <BlueButton
            onClick={() => handleActiveTab(false)}
            isActive={!activeTab}
          >
            Employers
          </BlueButton>
        </div>
        <div>
          <h1 className="text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            How It <span className="text-[#0084FF]">Works</span>
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-3 gap-20 max-md:grid-cols-1 max-md:gap-10">
          {list.map(({ id, title, color, description }) => {
            return (
              <li className="flex gap-5 items-stretch" key={id}>
                <div
                  style={{ backgroundColor: color }}
                  className="w-2 h-full rounded-xl"
                />
                <div className="space-y-2">
                  <div>
                    <h1 className="text-white font-semibold text-lg">
                      {title}
                    </h1>
                  </div>
                  <div className="max-w-72 max-lg:max-w-full">
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HowItWorksLanding;

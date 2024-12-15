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
    <section className="px-5 flex flex-col gap-10 items-center justify-center md:landing-padding">
      <div className="flex flex-col gap-7 items-center justify-center">
        <div className="flex gap-2 items-center">
          <div>
            <BlueButton
              onClick={() => handleActiveTab(true)}
              isActive={activeTab}
            >
              Seekers
            </BlueButton>
          </div>
          <div>
            <BlueButton
              onClick={() => handleActiveTab(false)}
              isActive={!activeTab}
            >
              Employers
            </BlueButton>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center max-sm:text-3xl">
            How It <span className="text-[#0084FF]">Works</span>
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-center text-[#A8A8A8] leading-[28px]">
            {description}
          </p>
        </div>
      </div>
      <div className="pt-10">
        <ul className="grid grid-cols-3 gap-20 max-lg:grid-cols-1">
          {list.map(({ id, title, color, description }) => {
            return (
              <li className="flex gap-5 items-center" key={id}>
                <div
                  style={{ backgroundColor: color }}
                  className="w-2 h-20 rounded-xl"
                />
                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="font-semibold text-lg">{title}</h1>
                  </div>
                  <div className="max-w-72 max-lg:max-w-full">
                    <p className="text-[#A8A8A8] font-light">{description}</p>
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

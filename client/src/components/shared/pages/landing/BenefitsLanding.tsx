import React from 'react';

import { BenefitsData } from '@/constants';

import BlueButton from './BlueButton';

const BenefitsLanding: React.FC = () => {
  return (
    <section
      id="benefits"
      className="px-5 flex flex-col gap-36 justify-center items-center md:landing-padding"
    >
      <div className="max-w-xl text-center space-y-5">
        <div>
          <BlueButton>Benefits</BlueButton>
        </div>
        <div>
          <h1 className="dark:text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Why <strong className="text-[#0084FF]">Choose</strong> Our Platform?
          </h1>
        </div>
        <div>
          <p className="text-[#9C9C9C] leading-relaxed">
            Our platform offers unique benefits to both job seekers and
            employers in the programming industry. Designed with cutting-edge
            technology and a user-centered approach.
          </p>
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
          {BenefitsData.map(({ id, title, description, icon, color }) => (
            <li
              key={id}
              className="rounded-xl p-10 space-y-5 transition-all border border-gray-200 dark:border-[#1b1b1b]"
            >
              <div
                style={{ backgroundColor: color }}
                className="w-fit p-4 rounded-xl"
              >
                {React.createElement(icon)}
              </div>
              <div>
                <h1 className="dark:text-white font-semibold text-xl">
                  {title}
                </h1>
              </div>
              <div className="max-w-xl">
                <p className="text-[#9C9C9C] font-light leading-relaxed">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BenefitsLanding;

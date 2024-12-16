import React from 'react';

import { BenefitsData } from '@/constants';

import BlueButton from './BlueButton';

const BenefitsLanding: React.FC = () => {
  return (
    <section
      id="benefits"
      className="px-5 flex flex-col gap-36 justify-center items-center md:landing-padding"
    >
      <div className="max-w-xl flex flex-col justify-center items-center gap-8">
        <div>
          <BlueButton>Benefits</BlueButton>
        </div>
        <div>
          <h1 className="text-center text-4xl font-semibold max-sm:text-3xl">
            Why <span className="text-[#0084FF]">Choose</span> Our Platform?
          </h1>
        </div>
        <div>
          <p className="text-center text-[#A8A8A8] leading-[28px]">
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
              className="bg-white box-shadow-blue rounded-xl p-10 flex flex-col gap-5"
            >
              <div
                style={{ backgroundColor: color }}
                className="w-fit p-4 rounded-xl"
              >
                {React.createElement(icon)}
              </div>
              <div>
                <h1 className="font-semibold text-xl">{title}</h1>
              </div>
              <div className="max-w-xl">
                <p className="text-[#A8A8A8] font-light leading-7">
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

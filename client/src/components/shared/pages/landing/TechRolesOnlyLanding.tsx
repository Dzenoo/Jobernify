import React from 'react';

import Link from 'next/link';

import BlueButton from './BlueButton';

import { Button } from '@/components/ui/button';

const TechRolesOnlyLanding: React.FC = () => {
  return (
    <div className="px-5 flex justify-between gap-5 md:landing-padding max-xl:flex-col max-xl:gap-28">
      <div className="basis-full flex flex-col gap-8">
        <div>
          <BlueButton>App for Tech Roles Only</BlueButton>
        </div>
        <div className="max-w-lg">
          <h1 className="text-4xl font-semibold leading-[55px] max-sm:text-3xl">
            Tailored for All Tech Roles:{' '}
            <span className="text-[#0084FF]">Your Career Starts Here</span>
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-[#A8A8A8] leading-[28px]">
            Unlike general job boards, our platform is built specifically for
            tech professionals across a variety of roles. Whether you are a
            programmer, designer, marketing specialist, product manager, or
            UX/UI expert, we connect you with top companies looking for your
            unique skills.
          </p>
        </div>
        <div>
          <Link href="/signup">
            <Button className="px-10">Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className="basis-full flex justify-center items-center">
        <img
          src="/images/jobs.png"
          alt="jobs"
          className="max-w-[700px] box-shadow-blue transform rotate-[25deg] scale-90 max-lg:max-w-[400px] max-sm:max-w-[350px]"
        />
      </div>
    </div>
  );
};

export default TechRolesOnlyLanding;

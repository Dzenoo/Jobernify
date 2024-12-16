import React from 'react';

import Link from 'next/link';

import BlueButton from './BlueButton';

import { Button } from '@/components/ui/button';

const HeroLanding: React.FC = () => {
  return (
    <section id="hero" className="bg-[#03F7FF0D]">
      <div className="px-5 pt-20 flex flex-col gap-28 items-center justify-center grid-background md:landing-padding">
        <div className="flex flex-col gap-5 items-center justify-center">
          <div>
            <BlueButton>Perfect Opportunities</BlueButton>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-[40px] font-semibold leading-[50px] text-[#050505] text-center max-md:text-[30px] max-md:leading-[40px]">
              Where Job Seekers and Employers Find the Perfect Match
            </h1>
          </div>
          <div className="max-w-lg">
            <p className="text-[18px] font-normal leading-[27px] text-[#777777] text-center">
              Job hunting made simple, hiring made effective. Your career
              journey or your next hire is only a click away.
            </p>
          </div>
          <div>
            <Link href="/login">
              <Button className="px-10">Start Now</Button>
            </Link>
          </div>
        </div>
        <div>
          <img
            className="m-auto rounded-2xl box-shadow-custom object-cover"
            src="/images/jobernify-landing.png"
            alt="jobernify-landing"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;

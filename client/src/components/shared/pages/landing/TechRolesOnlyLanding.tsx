import React from 'react';

import Link from 'next/link';

import BlueButton from './BlueButton';

import { Button } from '@/components/ui/buttons/button';
import Image from 'next/image';

const TechRolesOnlyLanding: React.FC = () => {
  return (
    <div className="px-5 flex justify-between gap-5 max-xl:flex-col max-xl:gap-28 md:landing-padding">
      <div className="basis-full space-y-5">
        <div>
          <BlueButton>App for Tech Roles Only</BlueButton>
        </div>
        <div className="max-w-lg">
          <h1 className="dark:text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Tailored for All Tech Roles:{' '}
            <strong className="text-[#0084FF]">Your Career Starts Here</strong>
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-[#9C9C9C] leading-relaxed">
            Unlike general job boards, our platform is built specifically for
            tech professionals across a variety of roles. Whether you are a
            programmer, designer, marketing specialist, product manager, or
            UX/UI expert, we connect you with top companies looking for your
            unique skills.
          </p>
        </div>
        <div>
          <Link href="/signup">
            <Button variant="outline" className="px-10 font-medium">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className="basis-full flex justify-center items-center">
        <Image
          src="/images/jobs.webp"
          alt="jobs_search"
          width={700}
          height={500}
          className="rounded-xl box-shadow-custom transform rotate-[25deg] scale-90 max-lg:max-w-[400px] max-sm:max-w-[300px] filter-none"
          quality={90}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default TechRolesOnlyLanding;

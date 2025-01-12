import React from 'react';

import Link from 'next/link';

import BlueButton from './BlueButton';

import { Button } from '@/components/ui/buttons/button';
import Image from 'next/image';

const HeroLanding: React.FC = () => {
  return (
    <section className="w-full bg-grid-small-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
      <div className="relative px-5 pt-20 flex flex-col gap-28 items-center justify-center md:landing-padding">
        <div className="space-y-5 sm:text-center">
          <div>
            <BlueButton>Perfect Opportunities</BlueButton>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-white text-[40px] font-semibold leading-[50px] max-md:text-[30px] max-md:leading-[40px]">
              Where Job Seekers and Employers Search & Find the Perfect Match
            </h1>
          </div>
          <div className="max-w-lg sm:m-auto">
            <p className="text-[#9C9C9C] leading-relaxed sm:text-lg">
              <strong>Job</strong> hunting made simple, hiring made effective.
              Your career journey or your next hire is only a click away.
            </p>
          </div>
          <div>
            <Link href="/login">
              <Button variant="outline" className="px-10 font-medium">
                Start Now
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/images/landing-dark.webp"
            alt="landing-dark"
            width={1920}
            height={1080}
            className="m-auto rounded-xl box-shadow-custom object-cover"
            quality={90}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;

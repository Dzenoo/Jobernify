import React from 'react';

import Link from 'next/link';

import { FeaturesData } from '@/constants';

import BlueButton from './BlueButton';

import { Button } from '@/components/ui/buttons/button';

const FeaturesLanding: React.FC = () => {
  return (
    <section
      id="features"
      className="px-5 flex gap-10 md:landing-padding max-xl:flex-col max-xl:gap-28"
    >
      <div className="basis-1/2 space-y-5">
        <div>
          <BlueButton>Features</BlueButton>
        </div>
        <div className="max-w-xl">
          <h1 className="text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Explore Features That Simplify{' '}
            <span className="text-[#0084FF]">Job Searching and Hiring</span> for
            Everyone
          </h1>
        </div>
        <div className="max-w-lg">
          <p className="text-muted-foreground leading-relaxed">
            Explore Powerful Features Designed to Simplify Your Job Search and
            Hiring Process, Making It Easier for Job Seekers and Employers to
            Connect and Succeed.
          </p>
        </div>
        <div>
          <Link href="/signup">
            <Button variant="outline" className="px-10">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className="basis-1/2">
        <ul className="grid grid-cols-2 gap-10 max-sm:grid-cols-1">
          {FeaturesData.map(({ id, title, description }) => (
            <li key={id} className="space-y-3">
              <div>
                <h1 className="text-white font-semibold text-lg">{title}</h1>
              </div>
              <div>
                <p className="text-muted-foreground font-light leading-relaxed">
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

export default FeaturesLanding;

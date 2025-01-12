import React from 'react';
import { Metadata } from 'next';

import Link from 'next/link';

import BlueButton from '@/components/shared/pages/landing/BlueButton';

import { Button } from '@/components/ui/buttons/button';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We are a forward-thinking, AI-powered job search platform dedicated to transforming the way job seekers and employers connect on a global scale.',
};

const AboutUsPage = () => {
  return (
    <section className="px-5 py-20 flex flex-col gap-72 w-full bg-grid-small-white/[0.2] relative md:landing-padding">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]" />
      <div className="flex flex-col gap-5 justify-center sm:items-center sm:text-center">
        <div>
          <BlueButton>About Us</BlueButton>
        </div>
        <div>
          <h1 className="text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
            Who We <span className="text-[#0084FF]">Are</span>
          </h1>
        </div>
        <div className="max-w-2xl">
          <p className="text-[#9C9C9C] leading-relaxed">
            Welcome to Jobernify, where innovation meets opportunity. We are a
            forward-thinking, AI-powered job search platform dedicated to
            transforming the way job seekers and employers connect on a global
            scale. By leveraging cutting-edge artificial intelligence and
            machine learning technologies, Jobernify bridges the gap between
            talent and opportunity, creating a seamless, efficient, and
            personalized hiring experience.
          </p>
        </div>
        <div>
          <Link href="/login">
            <Button variant="outline">Start Now</Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-20 max-xl:flex-col">
        <div className="basis-1/2 space-y-5 max-xl:basis-full">
          <div>
            <BlueButton>Our Mission</BlueButton>
          </div>
          <div>
            <h1 className="text-white text-4xl font-semibold leading-tight max-sm:text-3xl">
              What Sets <span className="text-[#0084FF]">Us Apart</span>
            </h1>
          </div>
          <div className="max-w-2xl">
            <p className="text-[#9C9C9C] leading-relaxed">
              At Jobernify, our mission is simple yet impactful: to empower
              individuals and organizations by connecting them with the perfect
              opportunities, no matter where they are in the world. We believe
              that everyone deserves a chance to achieve their career goals and
              that every organization deserves access to the best talent.
            </p>
          </div>
        </div>
        <div className="basis-1/2 max-xl:basis-full">
          <ul className="flex flex-col gap-5">
            {FeaturesData.map((feature) => (
              <li key={feature.id} className="space-y-2 mb-5">
                <h2 className="text-white font-semibold">{feature.title}</h2>
                <p className="text-[#9C9C9C] leading-relaxed">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const FeaturesData = [
  {
    id: 1,
    title: 'AI-Driven Job Matching',
    description:
      'Our platform intelligently matches job seekers with roles that align with their skills, experiences, and aspirations, while providing employers with tailored candidate recommendations.',
  },
  {
    id: 2,
    title: 'Employer-Centric Tools',
    description:
      'From advanced candidate search filters to analytics that optimize recruitment strategies, we provide tools to make hiring smarter and faster.',
  },
  {
    id: 3,
    title: 'Data Privacy and Security',
    description:
      'We prioritize protecting your data, adhering to top-tier security standards and international regulations.',
  },
];

export default AboutUsPage;

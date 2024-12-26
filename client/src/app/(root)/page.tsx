'use client';

import React from 'react';
import HeroLanding from '@/components/shared/pages/landing/HeroLanding';
import HowItWorksLanding from '@/components/shared/pages/landing/HowItWorksLanding';
import FeaturesLanding from '@/components/shared/pages/landing/FeaturesLanding';
import BenefitsLanding from '@/components/shared/pages/landing/BenefitsLanding';
import TechRolesOnlyLanding from '@/components/shared/pages/landing/TechRolesOnlyLanding';
import FaqLanding from '@/components/shared/pages/landing/FaqLanding';

const HomePage = () => {
  return (
    <article className="flex flex-col gap-72 w-full">
      <HeroLanding />
      <HowItWorksLanding />
      <FeaturesLanding />
      <BenefitsLanding />
      <TechRolesOnlyLanding />
      <FaqLanding />
    </article>
  );
};

export default HomePage;

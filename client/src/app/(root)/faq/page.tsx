import React from 'react';
import { Metadata } from 'next';

import FaqLanding from '@/components/shared/pages/landing/FaqLanding';

export const metadata: Metadata = {
  title: 'FAQ | Jobernify',
  description:
    'Learn more about us and our services. Explore our FAQ section for answers to frequently asked questions.',
};

const FaqPage = () => {
  return (
    <section className="px-5 py-20 space-y-10 md:landing-padding">
      <FaqLanding />
    </section>
  );
};

export default FaqPage;

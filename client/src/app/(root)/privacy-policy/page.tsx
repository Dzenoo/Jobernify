import React from 'react';
import { Metadata } from 'next';

import PrivacyPolicyMarkdown from '@/components/shared/pages/policies/privacy-policy.md';
import MarkdownRenderer from '@/components/shared/ui/MarkdownRenderer';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <section className="px-5 py-20 space-y-10 md:landing-padding">
      <div>
        <h1 className="text-white font-semibold text-5xl max-sm:text-2xl">
          Privacy Policy
        </h1>
      </div>
      <MarkdownRenderer
        customStyles={{
          p: 'font-extralight',
          strong: 'font-bold',
        }}
        className="text-white space-y-5"
        content={PrivacyPolicyMarkdown}
      />
    </section>
  );
};

export default PrivacyPolicyPage;

import React from 'react';
import { Metadata } from 'next';

import CookiePolicyMarkdown from '@/components/shared/pages/policies/cookie-policy.md';
import MarkdownRenderer from '@/components/shared/ui/MarkdownRenderer';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const CookiePolicyPage = () => {
  return (
    <section className="px-5 py-20 space-y-10 md:landing-padding">
      <div>
        <h1 className="text-white font-semibold text-5xl max-sm:text-2xl">
          Cookie Policy
        </h1>
      </div>
      <MarkdownRenderer
        customStyles={{
          p: 'font-extralight',
          strong: 'font-medium',
        }}
        className="text-white space-y-5"
        content={CookiePolicyMarkdown}
      />
    </section>
  );
};

export default CookiePolicyPage;

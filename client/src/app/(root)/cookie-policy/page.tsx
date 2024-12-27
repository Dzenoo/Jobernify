import React from 'react';

import CookiePolicyMarkdown from '@/components/shared/markdown/policies/cookie-policy.md';
import MarkdownRenderer from '@/components/shared/markdown/MarkdownRenderer';

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

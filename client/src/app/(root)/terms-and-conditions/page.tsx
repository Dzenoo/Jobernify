import React from 'react';

import TermsAndConditionsMarkdown from '@/components/shared/markdown/policies/terms-and-conditions.md';
import MarkdownRenderer from '@/components/shared/markdown/MarkdownRenderer';

const TermsAndConditionsPage = () => {
  return (
    <section className="px-5 py-20 space-y-10 md:landing-padding">
      <div>
        <h1 className="font-semibold text-5xl max-sm:text-2xl">
          Terms And Conditions
        </h1>
      </div>
      <MarkdownRenderer
        customStyles={{
          p: 'font-light',
          strong: 'font-medium',
        }}
        className="space-y-5"
        content={TermsAndConditionsMarkdown}
      />
    </section>
  );
};

export default TermsAndConditionsPage;

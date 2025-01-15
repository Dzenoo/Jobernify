import React from 'react';

import TermsAndConditionsMarkdown from '@/components/shared/pages/policies/terms-and-conditions.md';
import MarkdownRenderer from '@/components/shared/ui/MarkdownRenderer';

const TermsAndConditionsPage = () => {
  return (
    <section className="px-5 py-20 space-y-10 md:landing-padding">
      <div>
        <h1 className="dark:text-white font-semibold text-5xl max-sm:text-2xl">
          Terms And Conditions
        </h1>
      </div>
      <MarkdownRenderer
        customStyles={{
          p: 'font-extralight',
          strong: 'font-bold',
        }}
        className="dark:text-white space-y-5"
        content={TermsAndConditionsMarkdown}
      />
    </section>
  );
};

export default TermsAndConditionsPage;

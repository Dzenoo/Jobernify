import React from 'react';

import PrivacyPolicyMarkdown from '@/components/shared/markdown/policies/privacy-policy.md';
import MarkdownRenderer from '@/components/shared/markdown/MarkdownRenderer';

const PrivacyPolicyPage = () => {
  return (
    <section>
      <MarkdownRenderer content={PrivacyPolicyMarkdown} />;
    </section>
  );
};

export default PrivacyPolicyPage;

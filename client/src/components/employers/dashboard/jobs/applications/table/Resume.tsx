import React, { useState } from 'react';

import { getPresignedResumeUrl } from '@/lib/actions/applications.actions';

type ResumeProps = {
  applicationId: string;
};

const Resume: React.FC<ResumeProps> = ({ applicationId }) => {
  const [loading, setLoading] = useState(false);

  const viewResume = async () => {
    setLoading(true);

    try {
      const response = await getPresignedResumeUrl(applicationId);
      const url = response.url;

      window.open(url, '_blank');
    } catch (error) {
      alert('Unable to view resume. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={viewResume} disabled={loading}>
      {loading ? 'Loading...' : 'View Resume'}
    </button>
  );
};

export default Resume;

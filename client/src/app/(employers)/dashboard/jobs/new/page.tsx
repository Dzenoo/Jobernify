'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

import {
  EmployerQueryType,
  useEmployerQuery,
} from '@/hooks/queries/useEmployer.query';

import UpdateJobForm from '@/components/employers/dashboard/jobs/new/forms/UpdateJobForm';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/info/alert';

const NewJobPage = () => {
  const { data: fetchedEmployer } = useEmployerQuery({
    type: EmployerQueryType.GET_EMPLOYER_PROFILE,
    params: { query: {} },
  });

  if (!fetchedEmployer?.employer.isApproved) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Account is not approved!</AlertTitle>
        <AlertDescription>
          Please wait for approval before creating a job.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section>
      <UpdateJobForm isEdit={false} />
    </section>
  );
};

export default NewJobPage;

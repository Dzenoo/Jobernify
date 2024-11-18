"use client";

import React from "react";
import UpdateJobForm from "@/components/employers/dashboard/jobs/new/UpdateJobForm";

const NewJobPage = () => {
  return (
    <section>
      <UpdateJobForm isEdit={false} />
    </section>
  );
};

export default NewJobPage;

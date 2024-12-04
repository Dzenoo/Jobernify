import React from "react";
import Link from "next/link";

import { AWS_URL } from "@/constants";

type ResumeProps = {
  resume: string;
};

const Resume: React.FC<ResumeProps> = ({ resume }) => {
  return resume ? (
    <Link href={`${AWS_URL}/${resume}`}>View Seeker Resume</Link>
  ) : (
    "Resume Is Undefined"
  );
};

export default Resume;

import React from "react";
import Link from "next/link";

import { Edit, Eye, Trash } from "lucide-react";

type JobOptionsProps = {
  jobId: string;
  onDeleteButton: (jobIds: string) => void;
};

const JobOptions: React.FC<JobOptionsProps> = ({ jobId, onDeleteButton }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <Link href={`/dashboard/jobs/${jobId}`}>
        <Eye />
      </Link>
      <Link href={`/dashboard/jobs/${jobId}/edit`}>
        <Edit />
      </Link>
      <button onClick={() => onDeleteButton(jobId)}>
        <Trash color="red" />
      </button>
    </div>
  );
};

export default JobOptions;

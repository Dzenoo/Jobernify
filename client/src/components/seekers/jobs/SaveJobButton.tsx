import React from "react";

import { Bookmark } from "lucide-react";

import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

import { saveJob } from "@/lib/actions/jobs.actions";
import { queryClient } from "@/context/react-query-client";

import { JobTypes } from "@/types";

import { Button } from "@/components/ui/button";

type SaveJobButtonProps = {
  jobId: string;
  token?: string;
};

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ jobId }) => {
  const { toast } = useToast();
  const { data } = useGetSeeker();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: saveJobMutate, isLoading } = useMutation({
    mutationFn: () => saveJob(jobId, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data.message });
    },
  });

  const fetchedSeeker: any = data;

  const isJobSaved = fetchedSeeker?.seeker?.savedJobs.find(
    (job: JobTypes) => job._id === jobId
  );

  return (
    <div>
      <Button
        variant="outline"
        onClick={async () => await saveJobMutate()}
        disabled={isLoading}
      >
        <Bookmark
          color={isJobSaved ? "#0066FF" : "gray"}
          fill={isJobSaved ? "#0066FF" : "#ffffff"}
        />
      </Button>
    </div>
  );
};

export default SaveJobButton;

import React from "react";

import { useMutation } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

import { deleteJob } from "@/lib/actions/jobs.actions";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { queryClient } from "@/context/react-query-client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type DeleteJobProps = {
  onClose: () => void;
  id: string;
  isDialog: boolean;
};

const DeleteJob: React.FC<DeleteJobProps> = ({ onClose, id, isDialog }) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: deleteJobMutate, status } = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("Unauthorized!");
      }

      return deleteJob(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Job Deleted",
        description: "The job has been successfully deleted.",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const isLoading = status === "pending";

  const onDeleteJob = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteJobMutate();
  };

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Job</DialogTitle>
          <DialogDescription>
            Deleting this job will remove it from the platform, including all
            associated applications and information. Seekers will no longer be
            able to apply. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onDeleteJob}>
          <DialogFooter>
            <Button variant="destructive" type="submit" className="w-full">
              {isLoading ? <ScaleLoader height={10} /> : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader className="flex flex-col justify-center items-center">
        <DrawerTitle>Delete Job</DrawerTitle>
        <DrawerDescription className="max-w-lg text-center">
          Deleting this job will remove it from the platform, including all
          associated applications and information. Seekers will no longer be
          able to apply. Are you sure you want to proceed?
        </DrawerDescription>
      </DrawerHeader>
      <form onSubmit={onDeleteJob}>
        <DrawerFooter>
          <Button variant="destructive" type="submit" className="w-full">
            {isLoading ? <ScaleLoader height={10} /> : "Delete"}
          </Button>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default DeleteJob;

import React from "react";

import { useMutation } from "react-query";
import { Briefcase, Edit, Trash } from "lucide-react";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { queryClient } from "@/context/react-query-client";
import { deleteExperience } from "@/lib/actions/seekers.actions";
import { formatDate } from "@/lib/utils";

import { ExperienceTypes } from "@/types";

import { useToast } from "@/components/ui/use-toast";

type ExperienceItemProps = {
  onEdit: () => void;
} & ExperienceTypes;

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  onEdit,
  _id,
  jobTitle,
  companyName,
  startDate,
  endDate,
  level,
  type,
  location,
  position,
  isCurrentlyWorking,
}) => {
  const { toast } = useToast();
  const { userType, token } = useAuthentication().getCookieHandler();

  const { mutateAsync: deleteExperienceMutate } = useMutation({
    mutationFn: () => deleteExperience(_id, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const handleDeleteExperience = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );
    if (confirmDelete) {
      await deleteExperienceMutate();
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = endDate ? formatDate(endDate) : "";

  return (
    <div className="flex items-start gap-5 dark:bg-[#1b1b1b] rounded-xl bg-white p-6 border border-gray-100 dark:border-[#3b3b3b] overflow-auto whitespace-nowrap">
      <div className="max-sm:hidden">
        <Briefcase width={25} height={25} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <HeaderSection jobTitle={jobTitle} type={type} />
        <p className="text-initial-gray">{companyName}</p>
        <DateSection
          isCurrentlyWorking={isCurrentlyWorking}
          startDate={formattedStartDate}
          endDate={formattedEndDate}
        />
        <InfoSection location={location} position={position} level={level} />
      </div>
      {userType === "seeker" && (
        <div className="flex gap-2">
          <button onClick={onEdit}>
            <Edit />
          </button>
          <button onClick={handleDeleteExperience}>
            <Trash color="red" />
          </button>
        </div>
      )}
    </div>
  );
};

const HeaderSection: React.FC<{ jobTitle: string; type: string }> = ({
  jobTitle,
  type,
}) => (
  <div className="flex items-center gap-2">
    <h1 className="font-bold">{jobTitle}</h1>
    <span className="text-sm">·</span>
    <p className="text-initial-gray">{type}</p>
  </div>
);

const DateSection: React.FC<{
  isCurrentlyWorking: boolean;
  startDate: string;
  endDate?: string;
}> = ({ isCurrentlyWorking, startDate, endDate }) => (
  <div className="flex items-center gap-2">
    <p className="text-initial-gray">{startDate}</p>
    <span className="text-sm">·</span>
    {isCurrentlyWorking ? (
      <p className="text-initial-gray">{formatDate(Date.now() as any)}</p>
    ) : (
      <p className="text-initial-gray">{endDate}</p>
    )}
  </div>
);

const InfoSection: React.FC<{
  location: string;
  position: string;
  level: string;
}> = ({ location, position, level }) => (
  <div className="flex items-center gap-2">
    <p className="text-initial-gray">{location}</p>
    <span className="text-sm">·</span>
    <p className="text-initial-gray">{position}</p>
    <span className="text-sm">·</span>
    <p className="text-initial-gray">{level}</p>
  </div>
);

export default ExperienceItem;

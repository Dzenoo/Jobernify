import React from "react";

import { Calendar, Edit, GraduationCap, Trash } from "lucide-react";
import { useMutation } from "react-query";

import { useToast } from "@/components/ui/use-toast";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { deleteEducation } from "@/lib/actions/seekers.actions";
import { formatDate } from "@/lib/utils";
import { renderIconText } from "@/helpers";
import { queryClient } from "@/context/react-query-client";

import { EducationTypes } from "@/types";

export type EducationItemProps = {
  onEdit: () => void;
} & EducationTypes;

const EducationItem: React.FC<EducationItemProps> = ({
  onEdit,
  _id,
  degree,
  fieldOfStudy,
  graduationDate,
  institution,
}) => {
  const { toast } = useToast();
  const { userType, token } = useAuthentication().getCookieHandler();

  const { mutateAsync: deleteEducationMutate } = useMutation({
    mutationFn: () => deleteEducation(_id, token as string),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const handleDeleteEducation = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this education entry?"
    );
    if (confirmDelete) {
      await deleteEducationMutate();
    }
  };

  const graduationDateFormatted = formatDate(graduationDate);

  return (
    <div className="dark:bg-[#1b1b1b] rounded-xl bg-white p-6 flex gap-5 items-start border border-gray-100 dark:border-[#3b3b3b] overflow-auto whitespace-nowrap">
      <div className="max-sm:hidden">
        <GraduationCap width={25} height={25} />
      </div>
      <div className="flex items-start justify-between gap-3 basis-full">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="font-bold">{institution}</h1>
          </div>
          <div>
            <p className="text-initial-gray">
              {degree} degree, {fieldOfStudy}
            </p>
          </div>
          <div>
            {renderIconText({
              id: "1",
              data: graduationDateFormatted,
              icon: <Calendar />,
            })}
          </div>
        </div>
        {userType === "seeker" && (
          <div className="flex items-center gap-2">
            <div>
              <button onClick={onEdit}>
                <Edit />
              </button>
            </div>
            <div>
              <button onClick={handleDeleteEducation}>
                <Trash color="red" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationItem;

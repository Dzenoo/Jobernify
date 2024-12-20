import React from 'react';

import { Calendar, Edit, GraduationCap, Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { deleteEducation } from '@/lib/actions/seekers.actions';
import { formatDate } from '@/lib/utils';
import { renderIconText } from '@/helpers';
import { queryClient } from '@/context/react-query-client';

import { Education } from '@/types';

export type EducationItemProps = {
  onEdit: () => void;
} & Education;

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
    mutationFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return deleteEducation(_id, token);
    },
    onSuccess: (response) => {
      toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  const handleDeleteEducation = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this education entry?',
    );
    if (confirmDelete) {
      await deleteEducationMutate();
    }
  };

  const graduationDateFormatted = formatDate(graduationDate);

  return (
    <div className="bg-card text-card-foreground border shadow-sm rounded-lg p-6 flex items-start gap-5 transition-all overflow-auto whitespace-nowrap hover:border-gray-300 dark:hover:border-[#585858]">
      <div className="max-sm:hidden">
        <GraduationCap width={25} height={25} />
      </div>
      <div className="flex items-start justify-between gap-3 basis-full">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="font-semibold">{institution}</h1>
          </div>
          <div>
            <p className="text-muted-foreground text-base">
              {degree} degree, {fieldOfStudy}
            </p>
          </div>
          <div>
            {renderIconText({
              id: '1',
              data: graduationDateFormatted,
              icon: <Calendar />,
            })}
          </div>
        </div>
        {userType === 'seeker' && (
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

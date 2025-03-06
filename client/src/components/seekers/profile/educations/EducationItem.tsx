import React from 'react';

import { Calendar, Edit, GraduationCap, Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/info/use-toast';
import { deleteEducation } from '@/lib/actions/seekers.actions';
import { formatDate } from '@/lib/utils';
import { renderIconText } from '@/helpers';
import { queryClient } from '@/context/react-query-client';
import { useAuthStore } from '@/store/auth.store';

import { Education } from '@/types';

import AlertDialogWrapper from '@/components/ui/info/alert-dialog-wrapper';
import { Button } from '@/components/ui/buttons/button';

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
  const { user } = useAuthStore();

  const { mutateAsync: deleteEducationMutate } = useMutation({
    mutationFn: () => {
      return deleteEducation(_id);
    },
    onSuccess: (response) => {
      toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['seeker_profile'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  const handleDeleteEducation = async () => {
    await deleteEducationMutate();
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
        {user === 'seeker' && (
          <div>
            <Button variant="ghost" onClick={onEdit}>
              <Edit />
            </Button>
            <AlertDialogWrapper
              title="Delete Education"
              description="This will delete your education and remove it from your profile."
              onAction={handleDeleteEducation}
              actionText="Delete"
              cancelText="Cancel"
              triggerContent={<Trash color="red" />}
              buttonTriggerProps={{ variant: 'ghost' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationItem;

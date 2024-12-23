import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { Briefcase, Edit, Trash } from 'lucide-react';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { queryClient } from '@/context/react-query-client';
import { deleteExperience } from '@/lib/actions/seekers.actions';
import { formatDate } from '@/lib/utils';

import { Experience } from '@/types';

import AlertDialogWrapper from '@/components/ui/info/alert-dialog-wrapper';
import { Button } from '@/components/ui/buttons/button';
import { useToast } from '@/components/ui/info/use-toast';

type ExperienceItemProps = {
  onEdit: () => void;
} & Experience;

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
    mutationFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return deleteExperience(_id, token);
    },
    onSuccess: (response) => {
      toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  const handleDeleteExperience = async () => {
    await deleteExperienceMutate();
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = endDate ? formatDate(endDate) : '';

  return (
    <div className="bg-card text-card-foreground border shadow-sm rounded-lg p-6 flex items-start gap-5 transition-all overflow-auto whitespace-nowrap hover:border-gray-300 dark:hover:border-[#585858]">
      <div className="max-sm:hidden">
        <Briefcase width={25} height={25} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <HeaderSection jobTitle={jobTitle} type={type} />
        <p className="text-muted-foreground text-base">{companyName}</p>
        <DateSection
          isCurrentlyWorking={isCurrentlyWorking}
          startDate={formattedStartDate}
          endDate={formattedEndDate}
        />
        <InfoSection location={location} position={position} level={level} />
      </div>
      {userType === 'seeker' && (
        <div>
          <Button variant="ghost" onClick={onEdit}>
            <Edit />
          </Button>
          <AlertDialogWrapper
            title="Delete Experience"
            description="This will delete your experience and remove it from your profile."
            onAction={handleDeleteExperience}
            actionText="Delete"
            cancelText="Cancel"
            triggerContent={<Trash color="red" />}
            buttonTriggerProps={{ variant: 'ghost' }}
          />
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
    <h1 className="font-semibold">{jobTitle}</h1>
    <span className="text-sm">·</span>
    <p className="text-muted-foreground text-base">{type}</p>
  </div>
);

const DateSection: React.FC<{
  isCurrentlyWorking: boolean;
  startDate: string;
  endDate?: string;
}> = ({ isCurrentlyWorking, startDate, endDate }) => (
  <div className="flex items-center gap-2">
    <p className="text-muted-foreground text-base">{startDate}</p>
    <span className="text-sm">·</span>
    {isCurrentlyWorking ? (
      <p className="text-muted-foreground text-base">Present</p>
    ) : (
      <p className="text-muted-foreground text-base">{endDate}</p>
    )}
  </div>
);

const InfoSection: React.FC<{
  location: string;
  position: string;
  level: string;
}> = ({ location, position, level }) => (
  <div className="flex items-center gap-2">
    <p className="text-muted-foreground text-base">{location}</p>
    <span className="text-sm">·</span>
    <p className="text-muted-foreground text-base">{position}</p>
    <span className="text-sm">·</span>
    <p className="text-muted-foreground text-base">{level}</p>
  </div>
);

export default ExperienceItem;

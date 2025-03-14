import React from 'react';

import {
  ApplicationMutationType,
  useApplicationMutation,
} from '@/hooks/mutations/useApplication.mutation';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/utilities/dropdown-menu';
import { CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';

type StatusBadgeProps = {
  applicationId: string;
  status: 'Pending' | 'Interview' | 'Accepted' | 'Rejected';
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ applicationId, status }) => {
  const mutation = useApplicationMutation();

  const StatusOptions = [
    {
      id: 1,
      label: 'Pending',
      value: 'Pending',
      icon: <Clock className="text-yellow-500" />,
    },
    {
      id: 2,
      label: 'Interview',
      value: 'Interview',
      icon: <UserCheck className="text-blue-500" />,
    },
    {
      id: 3,
      label: 'Accepted',
      value: 'Accepted',
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      id: 4,
      label: 'Rejected',
      value: 'Rejected',
      icon: <XCircle className="text-red-500" />,
    },
  ];

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== status) {
      mutation.mutateAsync({
        type: ApplicationMutationType.UPDATE_APPLICATION_STATUS,
        applicationId: applicationId,
        status: status,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{status}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {StatusOptions.map(({ id, icon, label, value }) => (
            <DropdownMenuItem
              onClick={() => handleStatusChange(value)}
              key={id}
            >
              {icon}
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusBadge;

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/context/react-query-client';

import { updateApplicationStatus } from '@/lib/actions/applications.actions';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StatusBadgeProps = {
  applicationId: string;
  status: 'Pending' | 'Interview' | 'Accepted' | 'Rejected';
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ applicationId, status }) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  const { mutateAsync: updateStatusMutate } = useMutation({
    mutationFn: (newStatus: string) => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return updateApplicationStatus(applicationId, token, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong.',
      });
    },
  });

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

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus !== status) {
      await updateStatusMutate(newStatus);
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

import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button, ButtonProps } from '../buttons/button';

type AlertDialogWrapperProps = {
  triggerContent: React.ReactNode;
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  buttonTriggerProps?: ButtonProps;
  onAction: (...args: any) => void;
};

const AlertDialogWrapper: React.FC<AlertDialogWrapperProps> = ({
  triggerContent,
  title,
  description,
  cancelText,
  actionText,
  buttonTriggerProps,
  onAction,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...buttonTriggerProps}>{triggerContent}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogWrapper;

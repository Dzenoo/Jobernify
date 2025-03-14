import React, { useEffect } from 'react';

import zod from 'zod';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReceiveJobAlertsSchema } from '@/lib/zod/seekers.validation';

import {
  SeekerMutationType,
  useSeekerMutation,
} from '@/hooks/mutations/useSeeker.mutation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form/form';
import { Switch } from '@/components/ui/buttons/switch';

type ReceiveJobAlertsFormProps = {
  receiveJobAlerts: boolean;
};

const ReceiveJobAlertsForm: React.FC<ReceiveJobAlertsFormProps> = ({
  receiveJobAlerts,
}) => {
  const form = useForm<zod.infer<typeof ReceiveJobAlertsSchema>>({
    resolver: zodResolver(ReceiveJobAlertsSchema),
    defaultValues: {
      receiveJobAlerts: receiveJobAlerts,
    },
  });

  const mutation = useSeekerMutation();

  useEffect(() => {
    form.setValue('receiveJobAlerts', receiveJobAlerts);
  }, [receiveJobAlerts, form]);

  function onSubmit(data: zod.infer<typeof ReceiveJobAlertsSchema>) {
    const formData = new FormData();
    formData.append('receiveJobAlerts', data.receiveJobAlerts.toString());

    mutation.mutateAsync({
      type: SeekerMutationType.EDIT_PROFILE,
      data: formData,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="receiveJobAlerts"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-10 items-center justify-between rounded-lg border p-4 overflow-auto whitespace-nowrap">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Receive Job Alerts</FormLabel>
                <FormDescription>
                  Receive alerts about new jobs that you like.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  type="submit"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ReceiveJobAlertsForm;

import React, { useEffect } from 'react';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScaleLoader } from 'react-spinners';

import { JobAlertSchema } from '@/lib/zod/seekers.validation';
import { JobAlerts } from '@/types';
import { JobsFiltersData } from '@/constants';

import { useJobAlert } from '@/hooks/mutations/useJobAlert.mutation';

import { Button } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/form/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form/form';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/layout/dialog';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/layout/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';

type NewAlertFormProps = {
  closeAlerts: () => void;
  alerts: JobAlerts;
  isDialog: boolean;
};

const NewAlertForm: React.FC<NewAlertFormProps> = ({
  alerts,
  closeAlerts,
  isDialog,
}) => {
  const form = useForm<zod.infer<typeof JobAlertSchema>>({
    resolver: zodResolver(JobAlertSchema),
    defaultValues: {
      title: '',
      level: '',
      type: '',
    },
    mode: 'all',
  });

  const { mutateAsync: generateJobAlertMutate } = useJobAlert();

  useEffect(() => {
    form.setValue('title', alerts?.title || '');
    form.setValue('level', alerts?.level || '');
    form.setValue('type', alerts?.type || '');
  }, [alerts, form]);

  const onSubmit = async (values: zod.infer<typeof JobAlertSchema>) => {
    const formData = new FormData();
    formData.append('title', values.title || '');
    formData.append('type', values.type || '');
    formData.append('level', values.level || '');

    await generateJobAlertMutate(formData);
    closeAlerts();
  };

  const children = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                Enter a title for your job alert.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {JobsFiltersData[1].data.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select the desired job level for the alert.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JobsFiltersData[0].data.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select the preferred job type for the alert.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <ScaleLoader color="#fff" height={10} />
            ) : (
              'Add'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  const title = 'Add Job Alert';
  const description =
    'Stay updated with personalized alerts tailored to your job preferences. Receive notifications about new job postings.';

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <div className="p-5">{children}</div>
    </DrawerContent>
  );
};

export default NewAlertForm;

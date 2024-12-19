import React, { useEffect } from 'react';

import zod from 'zod';
import { CalendarIcon } from 'lucide-react';
import { ScaleLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import {
  AddEducationSchema,
  EditEducationSchema,
} from '@/lib/zod/seekers.validation';
import { addNewEducation, editEducation } from '@/lib/actions/seekers.actions';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';
import { queryClient } from '@/context/react-query-client';
import { cn } from '@/lib/utils';
import { Education } from '@/types';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type EducationFormProps = {
  isEdit: boolean;
  educationId: string | null;
  education: Education;
  closeForm: () => void;
  isOpen: boolean;
  isDialog: boolean;
};

const EducationForm: React.FC<EducationFormProps> = ({
  isEdit,
  educationId,
  education,
  closeForm,
  isOpen,
  isDialog,
}) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  const SchemaToInfer = isEdit ? EditEducationSchema : AddEducationSchema;

  const form = useForm<zod.infer<typeof SchemaToInfer>>({
    resolver: zodResolver(SchemaToInfer),
    defaultValues: {
      graduationDate: isEdit ? new Date(education.graduationDate) : new Date(),
      institution: isEdit ? education.institution : '',
      degree: isEdit ? education.degree : '',
      fieldOfStudy: isEdit ? education.fieldOfStudy : '',
    },
    mode: 'all',
  });

  useEffect(() => {
    if (!isOpen && !isEdit) form.reset();
  }, [isOpen, isEdit]);

  const { mutateAsync: handleEducationMutate } = useMutation({
    mutationFn: (formData: any) => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return isEdit
        ? editEducation(formData, token, educationId as string)
        : addNewEducation(formData, token);
    },
    onSuccess: (response) => {
      toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      closeForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'An error occurred',
      });
    },
  });

  const onSubmit = async (values: zod.infer<typeof SchemaToInfer>) => {
    await handleEducationMutate(values);
  };

  const children = (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="Institution" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the institution where you studied
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graduationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Graduation Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    captionLayout="dropdown-buttons"
                    mode="single"
                    selected={field.value as any}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select your graduation date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of Study</FormLabel>
              <FormControl>
                <Input placeholder="Field of Study" {...field} />
              </FormControl>
              <FormDescription>Specify your field of study</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="Degree" {...field} />
              </FormControl>
              <FormDescription>Specify the degree you obtained</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="default"
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
      </form>
    </Form>
  );

  const title = isEdit ? 'Edit Education' : 'Add Education';
  const description =
    "Add education to complete your profile. Employers can learn more about you and view if you're a good fit.";

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

export default EducationForm;

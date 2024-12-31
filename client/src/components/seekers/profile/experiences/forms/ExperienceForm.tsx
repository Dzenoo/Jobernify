import React, { useEffect } from 'react';

import zod from 'zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useToast } from '@/components/ui/info/use-toast';
import { jobLevels, jobPositions, jobTypes } from '@/constants';
import { queryClient } from '@/context/react-query-client';
import { cn, uppercaseFirstLetter } from '@/lib/utils';
import {
  AddExperienceSchema,
  EditExperienceSchema,
} from '@/lib/zod/seekers.validation';
import {
  addNewExperience,
  editExperience,
} from '@/lib/actions/seekers.actions';
import { Experience } from '@/types';

import Loader from '@/components/shared/loaders/Loader';

import { Button } from '@/components/ui/buttons/button';
import { Calendar } from '@/components/ui/utilities/calendar';
import { Checkbox } from '@/components/ui/buttons/checkbox';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/utilities/popover';
import {
  DialogContent,
  DialogDescription,
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

type ExperienceFormProps = {
  isEdit: boolean;
  experienceId: string | null;
  experience: Experience;
  closeForm: () => void;
  isOpen: boolean;
  isDialog: boolean;
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  isEdit,
  experienceId,
  experience,
  closeForm,
  isOpen,
  isDialog,
}) => {
  const { toast } = useToast();

  const SchemaToInfer = isEdit ? EditExperienceSchema : AddExperienceSchema;

  const form = useForm<zod.infer<typeof SchemaToInfer>>({
    resolver: zodResolver(SchemaToInfer),
    defaultValues: {
      jobTitle: isEdit ? experience?.jobTitle : '',
      companyName: isEdit ? experience?.companyName : '',
      startDate: isEdit ? new Date(experience?.startDate) : new Date(),
      endDate: isEdit ? new Date(experience?.endDate) : new Date(),
      level: isEdit ? experience?.level : '',
      type: isEdit ? experience?.type : '',
      position: isEdit ? experience?.position : '',
      location: isEdit ? experience?.location : '',
      isCurrentlyWorking: isEdit ? experience?.isCurrentlyWorking : false,
    },
    mode: 'all',
  });

  useEffect(() => {
    if (!isOpen && !isEdit) form.reset();
  }, [isOpen, isEdit]);

  const { mutateAsync: handleExperienceMutate } = useMutation({
    mutationFn: (formData: any) => {
      return isEdit
        ? editExperience(formData, experienceId as string)
        : addNewExperience(formData);
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
    const experienceData = {
      ...values,
      endDate: values.isCurrentlyWorking ? null : values.endDate,
    };

    await handleExperienceMutate(experienceData);
  };

  const children = (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the job title of your experience
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the name of the company where you worked
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
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
              <FormDescription>Select your start date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                      disabled={form.getValues('isCurrentlyWorking')}
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
              <FormDescription>Select your end date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isCurrentlyWorking"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormLabel className="mt-1.5">Currently Working Here</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
                    {jobLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {uppercaseFirstLetter(level)}
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
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {uppercaseFirstLetter(type)}
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
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Position" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobPositions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {uppercaseFirstLetter(position)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Specify the position you held</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormDescription>
                Specify the location of your experience
              </FormDescription>
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
            <Loader type="ScaleLoader" height={10} />
          ) : (
            'Add'
          )}
        </Button>
      </form>
    </Form>
  );

  const title = isEdit ? 'Edit Experience' : 'Add Experience';
  const description =
    'Enhance your profile by adding your work experiences. This will give employers a better understanding of your skills and qualifications, increasing your chances of being noticed.';

  if (isDialog) {
    return (
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="p-5 overflow-auto max-h-96">{children}</div>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <div className="p-5 overflow-auto max-h-96">{children}</div>
    </DrawerContent>
  );
};

export default ExperienceForm;

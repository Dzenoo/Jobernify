import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { useForm } from 'react-hook-form';

import { companySizes, industries } from '@/constants';
import { EmployerProfileSchema } from '@/lib/zod/employers.validation';

import { useEditEmployer } from '@/hooks/mutations/useEditEmployer.mutation';

import { uppercaseFirstLetter } from '@/lib/utils';
import { Employer } from '@/types';

import Loader from '@/components/shared/ui/Loader';

import { Input } from '@/components/ui/form/input';
import { Textarea } from '@/components/ui/form/textarea';
import { Button } from '@/components/ui/buttons/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';

type EditEmployerProfileFormProps = {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  employer: Employer;
};

const EditEmployerProfileForm: React.FC<EditEmployerProfileFormProps> = ({
  isEditMode,
  setIsEditMode,
  employer,
}) => {
  const { mutateAsync: editEmployerProfileMutate } = useEditEmployer();

  const form = useForm<zod.infer<typeof EmployerProfileSchema>>({
    resolver: zodResolver(EmployerProfileSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isEditMode && employer) {
      form.setValue('name', employer.name || '');
      form.setValue('address', employer.address || '');
      form.setValue('companyDescription', employer.companyDescription || '');
      form.setValue('industry', employer.industry || '');
      form.setValue('website', employer.website || '');
      form.setValue('size', employer.size || '');
    }
  }, [isEditMode, employer, form.setValue]);

  const changeEmployerInformation = async (
    values: zod.infer<typeof EmployerProfileSchema>,
  ) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('companyDescription', values.companyDescription);
    formData.append('industry', values.industry);
    formData.append('website', values.website);
    formData.append('size', values.size);

    await editEmployerProfileMutate(formData);

    setIsEditMode(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(changeEmployerInformation)}
        className="space-y-5"
      >
        <div className="flex items-center gap-3 max-sm:flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company Name" {...field} />
                </FormControl>
                <FormDescription>
                  The official name of your company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Address" {...field} />
                </FormControl>
                <FormDescription>
                  The physical address of your company's headquarters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Company Description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your company, including its
                mission, values, and key activities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Enter Website URL" {...field} />
              </FormControl>
              <FormDescription>
                The URL of your company's official website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {uppercaseFirstLetter(industry)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                The industry sector your company operates in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {uppercaseFirstLetter(size)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                The size of your company based on the number of employees.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            variant="default"
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-10"
          >
            {form.formState.isSubmitting ? (
              <Loader type="ScaleLoader" height={10} />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditEmployerProfileForm;

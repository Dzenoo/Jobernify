import React, { useEffect } from 'react';

import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useEditSeeker } from '@/hooks/mutations/useEditSeeker.mutation';
import { Seeker } from '@/types';
import { SeekerProfileSchema } from '@/lib/zod/seekers.validation';

import Loader from '@/components/shared/loaders/Loader';

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

type EditSeekerProfileFormProps = {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  seeker: Seeker;
};

const EditSeekerProfileForm: React.FC<EditSeekerProfileFormProps> = ({
  isEditMode,
  setIsEditMode,
  seeker,
}) => {
  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const form = useForm<zod.infer<typeof SeekerProfileSchema>>({
    resolver: zodResolver(SeekerProfileSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isEditMode && seeker) {
      form.setValue('first_name', seeker?.first_name || '');
      form.setValue('last_name', seeker?.last_name || '');
      form.setValue('headline', seeker?.headline || '');
      form.setValue('biography', seeker?.biography || '');
    }
  }, [isEditMode, seeker, form.setValue]);

  const changeSeekerInformation = async (
    values: zod.infer<typeof SeekerProfileSchema>,
  ) => {
    const formData = new FormData();

    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('headline', values.headline);
    formData.append('biography', values.biography);

    await editSeekerProfileMutate(formData);

    setIsEditMode(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(changeSeekerInformation)}
        className="space-y-5"
      >
        <div className="flex items-center gap-3 max-sm:flex-col">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your first name as it appears on your official
                  documents.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your last name as it appears on your official documents.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input placeholder="Software Developer....." {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief headline of your professional background and
                skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-96"
                  placeholder="Biography"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Share more detailed information about your professional journey
                and experiences. Maximum of 3000 characters.
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

export default EditSeekerProfileForm;

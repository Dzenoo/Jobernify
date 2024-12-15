import React from 'react';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScaleLoader } from 'react-spinners';

import useEditSeeker from '@/hooks/mutations/useEditSeeker.mutation';
import { SeekerSocialsSchema } from '@/lib/zod/seekers.validation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type EditSocialsFormProps = {
  isEditSocialsOpen: boolean;
  closeEditSocials: () => void;
  seeker?: {
    portfolio: string;
    linkedin: string;
    github: string;
  };
  isDialog: boolean;
};

const EditSocialsForm: React.FC<EditSocialsFormProps> = ({
  isEditSocialsOpen,
  closeEditSocials,
  seeker,
  isDialog,
}) => {
  const form = useForm<zod.infer<typeof SeekerSocialsSchema>>({
    resolver: zodResolver(SeekerSocialsSchema),
    defaultValues: {
      portfolio: seeker?.portfolio || '',
      github: seeker?.github || '',
      linkedin: seeker?.linkedin || '',
    },
    mode: 'all',
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  React.useEffect(() => {
    if (!isEditSocialsOpen)
      form.reset({
        portfolio: seeker?.portfolio || '',
        github: seeker?.github || '',
        linkedin: seeker?.linkedin || '',
      });
  }, [isEditSocialsOpen]);

  const onSubmit = async (values: zod.infer<typeof SeekerSocialsSchema>) => {
    const formData = new FormData();

    formData.append('portfolio', values.portfolio || '');
    formData.append('github', values.github || '');
    formData.append('linkedin', values.linkedin || '');

    await editSeekerProfileMutate(formData);

    closeEditSocials();
  };

  const children = (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourportfolio.com" {...field} />
                </FormControl>
                <FormDescription>
                  Provide the URL to your online portfolio or personal website.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/yourusername"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the URL to your Github profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide the URL to your LinkedIn profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-7">
            <Button
              variant="default"
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <ScaleLoader color="#fff" height={10} />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Socials</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className="flex-col justify-center">
      <DrawerHeader className="text-center">
        <DrawerTitle>Edit Socials</DrawerTitle>
      </DrawerHeader>
      <div className="p-5">{children}</div>
    </DrawerContent>
  );
};

export default EditSocialsForm;

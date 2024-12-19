import React, { useState } from 'react';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import { queryClient } from '@/context/react-query-client';

import { useUploads } from '@/hooks/core/useUploads.hook';
import { useGetSeeker } from '@/hooks/queries/useGetSeeker.query';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { ApplyToJobSchema } from '@/lib/zod/jobs.validation';
import { applyToJob } from '@/lib/actions/applications.actions';

import { Seeker } from '@/types';

import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
  DialogDescription,
  Dialog,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type ApplyToJobFormProps = {
  isApplyToJob: boolean;
  setIsApplyToJob: React.Dispatch<React.SetStateAction<boolean>>;
  jobId: string;
  isDialog: boolean;
};

const ApplyToJobForm: React.FC<ApplyToJobFormProps> = ({
  setIsApplyToJob,
  isApplyToJob,
  jobId,
  isDialog,
}) => {
  const [willSeekerUploadResume, setWillSeekerUploadResume] = useState(false);
  const { token } = useAuthentication().getCookieHandler();
  const { toast } = useToast();
  const { getInputProps, getRootProps, selectedFile } = useUploads({
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const { data: fetchedSeekerProfile } = useGetSeeker();

  const seekerData = fetchedSeekerProfile as { seeker: Seeker };

  const form = useForm<zod.infer<typeof ApplyToJobSchema>>({
    resolver: zodResolver(ApplyToJobSchema),
    defaultValues: {
      coverLetter: '',
    },
    mode: 'all',
  });

  const { mutateAsync: applyToJobMutate } = useMutation({
    mutationFn: (formData: FormData) => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return applyToJob(jobId, token, formData);
    },
    onSuccess: () => {
      form.reset();
      toast({ title: 'Success', description: 'Successfully Applied to Job' });
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'job', 'profile', { jobId }],
      });

      setIsApplyToJob(false);
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.response.data.message });
    },
  });

  const existingResume = seekerData?.seeker?.resume;
  const resumeToSubmit = selectedFile || existingResume;

  const onSubmit = async (values: zod.infer<typeof ApplyToJobSchema>) => {
    if (!resumeToSubmit) {
      toast({ title: 'Error', description: 'Please select a resume file' });
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append('resume', selectedFile);
    else formData.set('resume', existingResume as string);

    if (values.coverLetter) formData.set('coverLetter', values.coverLetter);

    await applyToJobMutate(formData);
  };

  const children = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {existingResume && !willSeekerUploadResume ? (
          <div className="flex flex-col gap-5 border border-blue-200 bg-blue-50 p-4 rounded-md">
            <p className="text-center text-blue-700">
              Your existing resume will be used for this application.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setWillSeekerUploadResume(true)}
            >
              Upload New Resume
            </Button>
          </div>
        ) : (
          <FormItem>
            <div
              {...getRootProps()}
              className="border-4 border-dashed border-gray-300 rounded-md p-4 cursor-pointer transition-colors hover:border-blue-600 h-40 flex items-center justify-center"
            >
              <input {...getInputProps()} />
              {selectedFile ? (
                <p>{selectedFile.name}</p>
              ) : (
                <p>
                  Drag 'n' drop your resume file here, or click to select a file
                </p>
              )}
            </div>
          </FormItem>
        )}
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between gap-2 items-center flex-wrap">
                <FormLabel>Cover Letter (optional)</FormLabel>
              </div>
              <FormControl>
                <Textarea
                  className="max-h-10"
                  placeholder="Cover Letter"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add a cover letter to strengthen your application
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-7">
          <Button
            variant="default"
            type="submit"
            disabled={form.formState.isSubmitting || !resumeToSubmit}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <ScaleLoader height={10} />
            ) : (
              'Apply'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );

  const title = 'Apply to Job';
  const description =
    'Ready to take the next step? Apply for this job opportunity by uploading your resume and cover letter.';

  if (isDialog) {
    return (
      <Dialog open={isApplyToJob} onOpenChange={setIsApplyToJob}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isApplyToJob} onOpenChange={setIsApplyToJob}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-5">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyToJobForm;

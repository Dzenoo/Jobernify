import React, { useState } from 'react';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/context/react-query-client';
import { Sparkles } from 'lucide-react';

import { useUploads } from '@/hooks/core/useUploads.hook';
import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';
import { ApplyToJobSchema } from '@/lib/zod/jobs.validation';
import { applyToJob } from '@/lib/actions/applications.actions';

import { ISeeker } from '@/types';

import Loader from '@/components/shared/ui/Loader';

import { useToast } from '@/components/ui/info/use-toast';
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from '@/components/ui/layout/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/layout/drawer';
import { generateCoverLetter } from '@/lib/actions/jobs.actions';

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

  const { toast } = useToast();
  const { getInputProps, getRootProps, selectedFile } = useUploads({
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const { data: fetchedSeekerProfile } = useSeekerQuery({
    type: SeekerQueryType.GET_SEEKER_PROFILE,
    params: { query: {} },
  });

  const seekerData = fetchedSeekerProfile as { seeker: ISeeker };

  const form = useForm<zod.infer<typeof ApplyToJobSchema>>({
    resolver: zodResolver(ApplyToJobSchema),
    defaultValues: {
      coverLetter: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: generateCoverLetterMutate, status: coverLetterStatus } =
    useMutation({
      mutationFn: () => {
        return generateCoverLetter(jobId);
      },
      onSuccess: (data) => {
        form.setValue('coverLetter', data.coverLetter);
      },
      onError: (error: any) => {
        toast({ title: 'Error', description: error.response.data.message });
      },
    });

  const { mutateAsync: applyToJobMutate } = useMutation({
    mutationFn: (formData: FormData) => {
      return applyToJob(jobId, formData);
    },
    onSuccess: () => {
      form.reset();
      toast({ title: 'Success', description: 'Successfully Applied to Job' });
      queryClient.invalidateQueries({
        queryKey: ['job', { jobId }],
      });
      queryClient.invalidateQueries({ queryKey: ['seeker_profile'] });
      setIsApplyToJob(false);
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.response.data.message });
    },
  });

  const isCoverLetterGenerated =
    coverLetterStatus === 'success' && !!form.getValues('coverLetter');
  const isCoverLetterGenerating = coverLetterStatus === 'pending';
  const existingResume = seekerData?.seeker?.resume;
  const resumeToSubmit = selectedFile || existingResume;

  const handleGenerateCoverLetter = async () => {
    if (isCoverLetterGenerated || isCoverLetterGenerating) return;
    await generateCoverLetterMutate();
  };

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
          <div className="flex flex-col gap-5 border border-blue-200 bg-blue-50 p-4 rounded-xl">
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
              className="border-4 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer transition-colors hover:border-blue-600 h-40 flex items-center justify-center text-center"
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
                <Button
                  onClick={handleGenerateCoverLetter}
                  disabled={isCoverLetterGenerating || isCoverLetterGenerated}
                  type="button"
                  variant="outline"
                >
                  {isCoverLetterGenerating ? (
                    <Loader type="ScaleLoader" height={10} />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />{' '}
                      Generate
                    </>
                  )}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  className="min-h-52 resize-none"
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
        <div>
          <Button
            variant="default"
            type="submit"
            disabled={form.formState.isSubmitting || !resumeToSubmit}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <Loader type="ScaleLoader" height={10} />
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

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import zod from 'zod';
import TurndownService from 'turndown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  JobMutationType,
  useJobMutation,
} from '@/hooks/mutations/useJob.mutation';
import { UpdateJobSchema } from '@/lib/zod/jobs.validation';
import { IJob } from '@/types';

import Loader from '@/components/shared/ui/Loader';
import Details from '@/components/employers/dashboard/jobs/new/Details';
import Overview from '@/components/employers/dashboard/jobs/new/Overview';
import Scope from '@/components/employers/dashboard/jobs/new/Scope';
import Skills from '@/components/employers/dashboard/jobs/new/Skills';
import Text from '@/components/employers/dashboard/jobs/new/Text';

import { Button } from '@/components/ui/buttons/button';
import { Form } from '@/components/ui/form/form';

type UpdateJobFormProps =
  | {
      isEdit: false;
    }
  | {
      isEdit: true;
      formData: IJob;
      jobId: string;
    };

const UpdateJobForm: React.FC<UpdateJobFormProps> = (props) => {
  const turndownService = new TurndownService();
  const router = useRouter();

  const form = useForm<zod.infer<typeof UpdateJobSchema>>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      overview: '',
      location: '',
      description: '',
      expiration_date: '',
      salary: 0,
      skills: [],
      position: '',
      level: '',
      type: '',
    },
    resolver: zodResolver(UpdateJobSchema),
  });

  const { reset } = form;

  const mutation = useJobMutation({
    onSuccess: () => {
      router.push(`/dashboard/jobs/?page=1`);
    },
  });

  useEffect(() => {
    if (props.isEdit) {
      reset({
        title: props.formData.title,
        overview: props.formData.overview,
        location: props.formData.location,
        description: props.formData.description,
        expiration_date: props.formData.expiration_date,
        salary: props.formData.salary,
        skills: props.formData.skills,
        position: props.formData.position,
        level: props.formData.level,
        type: props.formData.type,
      });
    }
  }, [props.isEdit && props.formData]);

  const isLoading = mutation.status === 'pending';

  const [currentJobForm, setCurrentJobForm] = useState<number>(0);

  function hadleFormNext(): void {
    setCurrentJobForm(currentJobForm === 3 ? 3 : currentJobForm + 1);
  }

  function hadleFormPrev(): void {
    setCurrentJobForm(currentJobForm === 0 ? 0 : currentJobForm - 1);
  }

  const onSelectSkills = (skills: any) => {
    form.setValue('skills', skills);
  };

  function renderCurrentStep() {
    const components = [
      <Details control={form.control} />,
      <Overview control={form.control} />,
      <Skills control={form.control} onSelectSkills={onSelectSkills} />,
      <Scope control={form.control} />,
    ];

    return components[currentJobForm];
  }

  function updateJob(values: zod.infer<typeof UpdateJobSchema>) {
    const markdownDescription = turndownService.turndown(values.description);

    const jobData = {
      ...values,
      description: markdownDescription,
    };

    const formData = new FormData();

    // Object.entries(jobData).forEach(([key, value]) =>
    //   formData.append(
    //     key,
    //     typeof value === 'object' ? JSON.stringify(value) : String(value),
    //   ),
    // );

    Object.entries(jobData).forEach(([key, value]) => {
      if (key === 'skills') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'salary') {
        formData.append(key, String(Number(value)));
      } else if (key === 'expiration_date') {
        formData.append(key, new Date(value).toISOString());
      } else {
        formData.append(key, String(value));
      }
    });

    if (props.isEdit) {
      return mutation.mutateAsync({
        type: JobMutationType.EDIT_JOB,
        data: formData,
        jobId: props.jobId,
      });
    }

    return mutation.mutateAsync({
      type: JobMutationType.CREATE_NEW_JOB,
      data: formData,
    });
  }

  const stepDetails = [
    {
      title: 'Begin by crafting a solid foundation for the job',
      description:
        "Crafting a compelling job title is key to attracting top-tier candidates. It's the first impression seekers will have of your job, so make it count.",
    },
    {
      title: 'Provide a detailed description of the job',
      description:
        'This information helps candidates assess their fit for the position and enhances the quality of applications you receive',
    },
    {
      title: 'What key skills are essential for this role?',
      description:
        'Clearly defined skills help applicants gauge their qualifications and suitability for the role.',
    },
    {
      title: 'Describe the scope of the job',
      description:
        " A clear scope helps candidates understand the role's impact and envision their future within the organization",
    },
  ];

  return (
    <section>
      <div className="flex px-36 gap-10 py-16 max-xl:flex-col max-lg:px-0">
        <div className="basis-1/2 flex flex-col gap-3">
          <Text
            step={currentJobForm}
            title={stepDetails[currentJobForm].title}
            description={stepDetails[currentJobForm].description}
          />
        </div>
        <div className="basis-1/2 flex flex-col gap-10 justify-between">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updateJob)}
                className="space-y-10"
              >
                {renderCurrentStep()}
                {stepDetails.length - 1 === currentJobForm && (
                  <div className="flex gap-3 justify-end">
                    <Button type="submit" variant="default">
                      {isLoading ? (
                        <Loader type="ScaleLoader" height={10} />
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
          <div className="flex gap-3 items-center">
            {currentJobForm != 0 && (
              <div>
                <Button
                  onClick={hadleFormPrev}
                  className="w-28"
                  variant="outline"
                >
                  Previous
                </Button>
              </div>
            )}
            {stepDetails.length - 1 != currentJobForm && (
              <div>
                <Button
                  onClick={hadleFormNext}
                  className="w-28"
                  variant="default"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateJobForm;

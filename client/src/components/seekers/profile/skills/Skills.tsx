import React, { Fragment, useState } from 'react';

import zod from 'zod';
import { ScaleLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

import { useEditSeeker } from '@/hooks/mutations/useEditSeeker.mutation';
import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';

import { SkillsSchema } from '@/lib/zod/seekers.validation';
import { getSkillsData, multiselectSkills } from '@/lib/utils';
import { renderSkills } from '@/helpers';

import MultiSelect from '@/components/ui/multiselect';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type AddSkillsProps = {
  closeSkills: () => void;
  skills?: string[];
  isDialog: boolean;
};

const AddSkillsForm: React.FC<AddSkillsProps> = ({
  closeSkills,
  skills = [],
  isDialog,
}) => {
  const form = useForm<zod.infer<typeof SkillsSchema>>({
    resolver: zodResolver(SkillsSchema),
    defaultValues: {
      skills: skills,
    },
    mode: 'all',
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const onSubmit = async (values: zod.infer<typeof SkillsSchema>) => {
    await editSeekerProfileMutate(values);
    closeSkills();
  };

  const children = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <MultiSelect
                  options={multiselectSkills}
                  selectedValues={field.value}
                  onChange={(selectedValues) => {
                    form.setValue('skills', selectedValues);
                  }}
                />
              </FormControl>
              <FormDescription>
                Select skills that represent your expertise
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
              'Update'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );

  const title = 'Add Skills';
  const description = 'Show your skills to employers';

  if (isDialog) {
    return (
      <DialogContent className="sm:max-w-lg p-6">
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
      <div className="overflow-y-scroll p-5">{children}</div>
    </DrawerContent>
  );
};

type SkillsProps = {
  skills: string[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const isSmall = useMediaQuery('(min-width: 650px)');
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const openSkills = () => setIsSkillsOpen(true);
  const closeSkills = () => setIsSkillsOpen(false);

  const categorizedSkills = getSkillsData(skills || []);

  return (
    <Fragment>
      {isSmall && (
        <Dialog onOpenChange={setIsSkillsOpen} open={isSkillsOpen}>
          <AddSkillsForm
            closeSkills={closeSkills}
            skills={skills}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isSmall && (
        <Drawer onOpenChange={setIsSkillsOpen} open={isSkillsOpen}>
          <AddSkillsForm
            closeSkills={closeSkills}
            skills={skills}
            isDialog={false}
          />
        </Drawer>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Skills</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openSkills}
            >
              <div className="max-lg:hidden">Add Skills</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <div>
            {skills?.length === 0 && (
              <p className="text-muted-foreground text-base">
                No skills listed
              </p>
            )}
          </div>
          {renderSkills(categorizedSkills)}
        </div>
      </div>
    </Fragment>
  );
};

export default Skills;

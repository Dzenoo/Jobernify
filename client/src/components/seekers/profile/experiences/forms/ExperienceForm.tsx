import React, { useEffect, useState } from "react";

import zod from "zod";
import { CalendarIcon } from "lucide-react";
import { ScaleLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { useToast } from "@/components/ui/use-toast";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { JobsFiltersData } from "@/constants";
import { queryClient } from "@/context/react-query-client";
import { cn } from "@/lib/utils";
import {
  AddExperienceSchema,
  EditExperienceSchema,
} from "@/lib/zod/seekers.validation";
import {
  addNewExperience,
  editExperience,
} from "@/lib/actions/seekers.actions";
import { ExperienceTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ExperienceFormProps = {
  isEdit: boolean;
  experienceId: string | null;
  experience: ExperienceTypes;
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
  const { token } = useAuthentication().getCookieHandler();

  const SchemaToInfer = isEdit ? EditExperienceSchema : AddExperienceSchema;

  const form = useForm<zod.infer<typeof SchemaToInfer>>({
    resolver: zodResolver(SchemaToInfer),
    mode: "all",
  });

  useEffect(() => {
    if (isOpen) {
      if (!isEdit) {
        form.reset();
      } else {
        form.reset({
          jobTitle: experience?.jobTitle,
          companyName: experience?.companyName,
          startDate: new Date(experience?.startDate),
          endDate: new Date(experience?.endDate),
          level: experience?.level as any,
          type: experience?.type as any,
          position: experience?.position as any,
          location: experience?.location,
          isCurrentlyWorking: experience.isCurrentlyWorking,
        });
      }
    }
  }, [isOpen, isEdit, experience]);

  const { mutateAsync: handleExperienceMutate } = useMutation({
    mutationFn: (formData: any) =>
      isEdit
        ? editExperience(formData, token as string, experienceId as string)
        : addNewExperience(formData, token as string),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
      closeForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occurred",
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
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
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
                      date > new Date() || date < new Date("1900-01-01")
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
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={form.getValues("isCurrentlyWorking")}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
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
                      date > new Date() || date < new Date("1900-01-01")
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
              <FormLabel>Currently Working Here</FormLabel>
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
                    {JobsFiltersData[3].data.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.title}
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
            <ScaleLoader color="#fff" height={10} />
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </Form>
  );

  const title = isEdit ? "Edit Experience" : "Add Experience";

  if (isDialog) {
    return (
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div className="text-center mb-4">
            <p className="text-initial-gray">
              Enhance your profile by adding your work experiences. This will
              give employers a better understanding of your skills and
              qualifications, increasing your chances of being noticed.
            </p>
          </div>
        </DialogHeader>
        <div className="p-5 overflow-auto max-h-96">{children}</div>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center">{title}</DrawerTitle>
        <div className="text-center mb-4">
          <p className="text-initial-gray">
            Enhance your profile by adding your work experiences. This will give
            employers a better understanding of your skills and qualifications,
            increasing your chances of being noticed.
          </p>
        </div>
      </DrawerHeader>
      <div className="p-5 overflow-auto max-h-96">{children}</div>
    </DrawerContent>
  );
};

export default ExperienceForm;

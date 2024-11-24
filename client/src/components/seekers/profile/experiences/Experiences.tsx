"use client";

import React, { Fragment, useState } from "react";

import { CalendarIcon, Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

import { ExperienceSchema } from "@/lib/zod/seekers.validation";
import { addNewExperience } from "@/lib/actions/seekers.actions";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { queryClient } from "@/context/react-query-client";
import { cn } from "@/lib/utils";
import { SeekerTypes } from "@/types";

import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import { JobsFiltersData } from "@/constants";
import ExperienceList from "./ExperienceList";

type AddExperienceProps = {
  closeExperience: () => void;
  isDialog: boolean;
};

const AddExperience: React.FC<AddExperienceProps> = ({
  closeExperience,
  isDialog,
}) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const form = useForm<zod.infer<typeof ExperienceSchema>>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      startDate: new Date(),
      endDate: new Date(),
      level: "Junior",
      type: "Freelance",
      position: "Hybrid",
      location: "",
    },
    mode: "all",
  });

  React.useEffect(() => {
    return () => form.reset();
  }, [closeExperience, form]);

  const { mutateAsync: addNewExperienceMutate } = useMutation({
    mutationFn: (formData: any) => addNewExperience(formData, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
      closeExperience();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occurred",
      });
    },
  });

  const onSubmit = async (values: zod.infer<typeof ExperienceSchema>) => {
    await addNewExperienceMutate(values);
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
          {form.formState.isSubmitting ? <ClipLoader color="#fff" /> : "Add"}
        </Button>
      </form>
    </Form>
  );

  if (isDialog) {
    return (
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
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
        <DrawerTitle className="text-center">Add Experience</DrawerTitle>
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

type ExperiencesProps = {
  seeker?: SeekerTypes;
};

const Experiences: React.FC<ExperiencesProps> = ({ seeker }) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const openExperience = () => setIsExperienceOpen(true);
  const closeExperience = () => setIsExperienceOpen(false);

  return (
    <Fragment>
      {isLarge && (
        <Dialog open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
          <AddExperience closeExperience={closeExperience} isDialog={true} />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
          <AddExperience closeExperience={closeExperience} isDialog={false} />
        </Drawer>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Experience</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openExperience}
            >
              <div className="max-lg:hidden">Add Experience</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <ExperienceList experiences={seeker?.experience} />
        </div>
      </div>
    </Fragment>
  );
};

export default Experiences;

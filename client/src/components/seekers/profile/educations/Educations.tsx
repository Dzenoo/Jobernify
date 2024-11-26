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

import { EducationSchema } from "@/lib/zod/seekers.validation";
import { addNewEducation } from "@/lib/actions/seekers.actions";
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
import { Calendar } from "@/components/ui/calendar";

import EducationList from "./EducationList";
import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";

type AddEducationsProps = {
  isEducationsOpen: boolean;
  closeEducations: () => void;
  isDialog: boolean;
};

const AddEducations: React.FC<AddEducationsProps> = ({
  isEducationsOpen,
  closeEducations,
  isDialog,
}) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const form = useForm<zod.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      graduationDate: new Date(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
    },
    mode: "all",
  });

  React.useEffect(() => {
    if (!isEducationsOpen) {
      form.reset();
    }
  }, [isEducationsOpen]);

  const { mutateAsync: addNewEducationMutate } = useMutation({
    mutationFn: (formData: any) => addNewEducation(formData, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
      closeEducations();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occurred",
      });
    },
  });

  const onSubmit = async (values: zod.infer<typeof EducationSchema>) => {
    await addNewEducationMutate(values);
  };

  const children = (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="Institution" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the institution where you studied
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graduationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Graduation Date</FormLabel>
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
              <FormDescription>Select your graduation date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of Study</FormLabel>
              <FormControl>
                <Input placeholder="Field of Study" {...field} />
              </FormControl>
              <FormDescription>Specify your field of study</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="Degree" {...field} />
              </FormControl>
              <FormDescription>Specify the degree you obtained</FormDescription>
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
          <DialogTitle>Add Education</DialogTitle>
          <div className="text-center mb-4">
            <p className="text-initial-gray">
              Add education to complete your profile. Employers can learn more
              about you and view if you're a good fit.
            </p>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center">Add Education</DrawerTitle>
        <div className="text-center mb-4">
          <p className="text-initial-gray">
            Add education to complete your profile. Employers can learn more
            about you and view if you're a good fit.
          </p>
        </div>
      </DrawerHeader>
      <div className="p-5">{children}</div>
    </DrawerContent>
  );
};

type EducationsProps = {
  seeker?: SeekerTypes;
};

const Educations: React.FC<EducationsProps> = ({ seeker }) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isEducationsOpen, setIsEducationsOpen] = useState(false);

  const openEducations = () => setIsEducationsOpen(true);
  const closeEducations = () => setIsEducationsOpen(false);

  return (
    <Fragment>
      {isLarge && (
        <Dialog open={isEducationsOpen} onOpenChange={setIsEducationsOpen}>
          <AddEducations
            isEducationsOpen={isEducationsOpen}
            closeEducations={closeEducations}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={isEducationsOpen} onOpenChange={setIsEducationsOpen}>
          <AddEducations
            isEducationsOpen={isEducationsOpen}
            closeEducations={closeEducations}
            isDialog={false}
          />
        </Drawer>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Education</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openEducations}
            >
              <div className="max-lg:hidden">Add Education</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <EducationList educations={seeker?.education} />
        </div>
      </div>
    </Fragment>
  );
};

export default Educations;

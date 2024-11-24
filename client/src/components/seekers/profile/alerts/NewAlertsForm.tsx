import React, { Fragment, useEffect } from "react";

import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
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

import { JobAlertSchema } from "@/lib/zod/seekers.validation";
import { JobAlertsTypes } from "@/types";

import useJobAlert from "@/hooks/mutations/useJobAlert.mutation";
import { JobsFiltersData } from "@/constants";
import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";

type NewAlertsFormProps = {
  closeAlerts: () => void;
  alerts: JobAlertsTypes;
  isDialog: boolean;
};

const NewAlertsForm: React.FC<NewAlertsFormProps> = ({
  alerts,
  closeAlerts,
  isDialog,
}) => {
  const form = useForm<zod.infer<typeof JobAlertSchema>>({
    resolver: zodResolver(JobAlertSchema),
    defaultValues: {
      title: "",
      level: "",
      type: "",
    },
    mode: "all",
  });

  const { mutateAsync: generateJobAlertMutate } = useJobAlert();

  useEffect(() => {
    form.setValue("title", alerts?.title || "");
    form.setValue("level", alerts?.level || "");
    form.setValue("type", alerts?.type || "");
  }, [alerts, form]);

  const onSubmit = async (values: zod.infer<typeof JobAlertSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title || "");
    formData.append("type", values.type || "");
    formData.append("level", values.level || "");

    await generateJobAlertMutate(formData);
    closeAlerts();
  };

  const children = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                Enter a title for your job alert.
              </FormDescription>
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
        <DialogFooter>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            className="w-full"
          >
            {form.formState.isSubmitting ? <ClipLoader color="#fff" /> : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  if (isDialog) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job Alert</DialogTitle>
          <DialogDescription>
            Stay updated with personalized alerts tailored to your job
            preferences. Receive notifications about new job postings.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader className="text-center">
        <DrawerTitle>Add Job Alert</DrawerTitle>
        <DrawerDescription>
          Stay updated with personalized alerts tailored to your job
          preferences. Receive notifications about new job postings.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-5">{children}</div>
    </DrawerContent>
  );
};

type SeekerProfileAlertsProps = {
  alerts?: JobAlertsTypes;
};

const SeekerProfileAlerts: React.FC<SeekerProfileAlertsProps> = ({
  alerts,
}) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isOpen, setIsOpen] = React.useState(false);

  const closeAlerts = () => setIsOpen(false);
  const openAlerts = () => setIsOpen(true);

  function areObjectKeysEmpty(obj: any) {
    if (obj == null || typeof obj !== "object") {
      return true;
    }
    return !Object.values(obj).some((value) => value);
  }

  return (
    <Fragment>
      {isLarge && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <NewAlertsForm
            alerts={alerts!}
            closeAlerts={closeAlerts}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <NewAlertsForm
            alerts={alerts!}
            closeAlerts={closeAlerts}
            isDialog={false}
          />
        </Drawer>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between gap-3">
            <div>
              <h1 className="text-base-black">Job Alerts</h1>
            </div>
            <div>
              <Button onClick={openAlerts} variant="default">
                Edit Job Alerts
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {areObjectKeysEmpty(alerts) ? (
            <div className="text-center flex flex-col gap-[10px]">
              <div>
                <h1 className="text-base-black">No alert generated</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  Consider enabling alerts to help you find the best job and
                  opportunity.
                </p>
              </div>
              <div>
                <Button onClick={openAlerts} variant="default">
                  Add New Alert
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-100 bg-white p-3 rounded-lg dark:bg-[#0d0d0d] flex justify-between gap-8 dark:border-[#3b3b3b] overflow-auto whitespace-nowrap">
              {Array.from([
                {
                  id: "1",
                  title: "Title",
                  data: alerts?.title,
                },
                {
                  id: "2",
                  title: "Type",
                  data: alerts?.type,
                },
                {
                  id: "3",
                  title: "Level",
                  data: alerts?.level,
                },
              ]).map((alertsInfoData) => (
                <div key={alertsInfoData.id} className="flex flex-col gap-3">
                  <div>
                    <h1 className="font-bold">{alertsInfoData.title}</h1>
                  </div>
                  <div>
                    <p className="text-initial-gray">{alertsInfoData?.data}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SeekerProfileAlerts;

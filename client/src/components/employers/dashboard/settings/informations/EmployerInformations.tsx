import React, { useEffect, useState } from "react";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { Edit, X } from "lucide-react";

import { EmployerTypes } from "@/types";
import { EmployerProfileSchema } from "@/lib/zod/employers.validation";
import useEditEmployer from "@/hooks/mutations/useEditEmployer.mutation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findIndustriesData } from "@/lib/utils";
import { industries } from "@/constants";

type EmployerInformationsProps = {
  employer?: EmployerTypes;
};

const EmployerInformations: React.FC<EmployerInformationsProps> = ({
  employer,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const form = useForm<zod.infer<typeof EmployerProfileSchema>>({
    resolver: zodResolver(EmployerProfileSchema),
    mode: "all",
  });
  const { mutateAsync: editEmployerProfileMutate } = useEditEmployer();

  console.log({ employer });

  useEffect(() => {
    if (isEditMode && employer) {
      form.setValue("name", employer.name || "");
      form.setValue("address", employer.address || "");
      form.setValue("companyDescription", employer.companyDescription || "");
      form.setValue("industry", employer.industry || "");
      form.setValue("website", employer.website || "");
      form.setValue("size", employer.size || "");
    }
  }, [isEditMode, employer, form.setValue]);

  const changeEmployerInformation = async (
    values: zod.infer<typeof EmployerProfileSchema>
  ) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("companyDescription", values.companyDescription);
    formData.append("industry", values.industry);
    formData.append("website", values.website);
    formData.append("size", values.size);

    await editEmployerProfileMutate(formData);

    setIsEditMode(false);
  };

  const ProfileInformationArrays = [
    {
      id: "1",
      title: "Company Name",
      data: employer?.name,
    },
    {
      id: "2",
      title: "Address",
      data: employer?.address,
    },
  ];

  return (
    <div className="flex flex-col gap-[16px] dark:border-[#3b3b3b]">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-base-black">Company Information</h1>
        </div>
        <div>
          <Button
            variant={isEditMode ? "outline" : "default"}
            className="flex items-center gap-3"
            onClick={() => setIsEditMode((prevEditMode) => !prevEditMode)}
          >
            <div className="max-lg:hidden">
              {isEditMode ? "Cancel" : "Edit Profile"}
            </div>
            <div>{isEditMode ? <X /> : <Edit />}</div>
          </Button>
        </div>
      </div>
      <div>
        {!isEditMode ? (
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-[3rem] flex-wrap max-md:gap-3">
              {ProfileInformationArrays.map(({ id, data, title }) => (
                <div key={id} className="flex flex-col gap-[3px]">
                  <div>
                    <p className="text-initial-gray">{title}</p>
                  </div>
                  <div>
                    <h1 className="font-bold">{data}</h1>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div>
                <h1>Description</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  {employer?.companyDescription || "No Description Available"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[3px]">
              <div>
                <h1 className="text-initial-black">Website</h1>
              </div>
              <div>
                <a href={employer?.website} target="_blank">
                  <p className="text-initial-gray">
                    {employer?.website || "No Website Available"}
                  </p>
                </a>
              </div>
            </div>
            <div>
              <div>
                <h1>Industry</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  {findIndustriesData(employer?.industry || "") ||
                    "No Industry Available"}
                </p>
              </div>
            </div>
            <div>
              <div>
                <h1>Size</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  {employer?.size || "No Size Available"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(changeEmployerInformation)}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 max-sm:flex-col">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Company Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The official name of your company.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Address" {...field} />
                      </FormControl>
                      <FormDescription>
                        The physical address of your company's headquarters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="companyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Company Description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your company, including
                      its mission, values, and key activities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Website URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL of your company's official website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem
                              key={industry.value}
                              value={industry.value}
                            >
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      The industry sector your company operates in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Less-than-17">
                            Less than 17
                          </SelectItem>
                          <SelectItem value="20-50">20-50</SelectItem>
                          <SelectItem value="50-100">50-100</SelectItem>
                          <SelectItem value="100-250">100-250</SelectItem>
                          <SelectItem value="250-500">250-500</SelectItem>
                          <SelectItem value="500-1000">500-1000</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      The size of your company based on the number of employees.
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
                    <ClipLoader color="#fff" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EmployerInformations;

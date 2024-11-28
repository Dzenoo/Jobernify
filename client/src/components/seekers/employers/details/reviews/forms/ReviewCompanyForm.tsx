import React from "react";
import { useRouter } from "next/navigation";

import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { ScaleLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { ReviewSchema } from "@/lib/zod/reviews.validation";
import { reviewEmployer } from "@/lib/actions/reviews.actions";
import { multiselectSkills } from "@/lib/utils";

import MultiSelect from "@/components/ui/multiselect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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

type ReviewCompanyFormProps = {
  employerId: string;
};

const ReviewCompanyForm: React.FC<ReviewCompanyFormProps> = ({
  employerId,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const { token } = useAuthentication().getCookieHandler();

  const form = useForm<zod.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      job_position: "",
      time: "4-7",
      type: "Internship",
      technologies: [],
      positiveReview: "",
      negativeReview: "",
    },
    mode: "all",
  });

  const { mutateAsync: reviewEmployerMutate } = useMutation({
    mutationFn: (formData: any) =>
      reviewEmployer(employerId, token as string, formData),
    onSuccess: () => {
      router.push(`/companies/${employerId}?section=reviews`);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const onSubmit = async (reviewData: zod.infer<typeof ReviewSchema>) => {
    await reviewEmployerMutate(reviewData);
  };

  return (
    <Card className="flex flex-col gap-7 py-6 ">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Employment</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Specify the type of employment (e.g., full-time, part-time,
                    contract, internship).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time of Employment</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time of Employment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Less than 1">Less than 1</SelectItem>
                        <SelectItem value="1-2">1-2</SelectItem>
                        <SelectItem value="2-4">2-4</SelectItem>
                        <SelectItem value="4-7">4-7</SelectItem>
                        <SelectItem value="7-10">7-10</SelectItem>
                        <SelectItem value="10 or greater">
                          10 or greater
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Describe the typical time for the job (e.g., 9-6).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job_position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Software Engineer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify the job position (e.g., software engineer, project
                    manager, marketing specialist).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="positiveReview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Positive Review</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Mention positive aspects of the job or company.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="negativeReview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Negative Review</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Mention any negative aspects or areas for improvement.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={multiselectSkills}
                      selectedValues={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    List the technologies used in the job or company.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-7 flex justify-end">
              <Button
                variant="default"
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                className="px-10"
              >
                {form.formState.isSubmitting ? (
                  <ScaleLoader height={10} />
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReviewCompanyForm;

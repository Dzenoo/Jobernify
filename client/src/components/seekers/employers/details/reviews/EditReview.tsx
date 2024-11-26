import React from "react";

import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewTypes } from "@/types";
import { EditReviewSchema } from "@/lib/zod/reviews.validation";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { ScaleLoader } from "react-spinners";
import { useMutation } from "react-query";
import { editReview } from "@/lib/actions/reviews.actions";
import { queryClient } from "@/context/react-query-client";

import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type EditReviewProps = {
  review: ReviewTypes;
  closeDialog: () => void;
};

const EditReview: React.FC<EditReviewProps> = ({ review, closeDialog }) => {
  const { token } = useAuthentication().getCookieHandler();

  const { mutateAsync: editReviewMutate } = useMutation({
    mutationFn: (formData: any) =>
      editReview(review?.company, token!, {
        job_position: formData?.job_position,
        negative_review: formData?.negativeReview,
        positive_review: formData?.positiveReview,
        reviewId: review?._id,
      }),
    onSuccess: () => {
      toast({ title: "Success", description: "Edited!" });
      queryClient.invalidateQueries(["company"]);
      closeDialog();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data.message });
    },
  });

  const form = useForm<zod.infer<typeof EditReviewSchema>>({
    resolver: zodResolver(EditReviewSchema),
    defaultValues: {
      positiveReview: review?.positiveReview || "",
      negativeReview: review?.negativeReview || "",
      job_position: review?.job_position || "",
    },
    mode: "all",
  });

  const onSubmit = async (values: zod.infer<typeof EditReviewSchema>) => {
    await editReviewMutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <DialogFooter>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <ScaleLoader color="#fff" height={10} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditReview;

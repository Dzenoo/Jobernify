import React, { useState } from "react";

import { Briefcase, Calendar, Timer, Trash } from "lucide-react";

import { ReviewTypes } from "@/types";
import { getSkillNames, getTime } from "@/lib/utils";
import { renderIconText } from "@/helpers";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useGetSeeker from "@/hooks/queries/useGetSeeker";
import { useMutation } from "react-query";
import { deleteReview } from "@/lib/actions/reviews.actions";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import { queryClient } from "@/context/react-query-client";
import { toast } from "@/components/ui/use-toast";
import EditReview from "./EditReview";

type ReviewItemProps = {
  review: ReviewTypes;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { token } = useAuthentication().getCookieHandler();
  const { data: seekerData } = useGetSeeker();
  const { mutateAsync: deleteReviewMutate } = useMutation({
    mutationFn: () => deleteReview(review?.company, token!),
    onSuccess: () => {
      toast({ title: "Success", description: "Deleted!" });
      queryClient.invalidateQueries(["company"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.data?.response.message });
    },
  });
  const createdTime = getTime(review?.createdAt);

  const isAlreadyReviewedEmployer = review.seeker === seekerData?.seeker._id;

  const ReviewFooterData = new Array(
    {
      id: "1",
      data: review?.time,
      icon: <Timer color="gray" />,
    },
    {
      id: "2",
      data: review?.type,
      icon: <Briefcase color="gray" />,
    },
    {
      id: "3",
      data: createdTime,
      icon: <Calendar color="gray" />,
    }
  );

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  const skillNames = getSkillNames(review?.technologies || []);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <EditReview review={review} closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
      <Card hoverable={true}>
        <CardHeader>
          <div className="flex items-center justify-between gap-10">
            <div>
              <h1 className="text-base-black">{review?.job_position}</h1>
            </div>
            {isAlreadyReviewedEmployer && (
              <div className="flex items-center gap-5">
                <div>
                  <Button onClick={openDialog}>Edit</Button>
                </div>
                <div>
                  <Button
                    onClick={async () => await deleteReviewMutate()}
                    variant="destructive"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Positive Review</h1>
            </div>
            <div>
              <p className="text-initial-gray">{review?.positiveReview}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Negative Review</h1>
            </div>
            <div>
              <p className="text-initial-gray">{review?.negativeReview}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Skills</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillNames.map((skillName, index) => (
                <Button variant="outline" key={index}>
                  {skillName}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-100 pt-6 dark:border-[#0d0d0d]">
          <div className="w-full flex justify-between items-center gap-3 max-sm:flex-wrap">
            {ReviewFooterData.map((footerData) => renderIconText(footerData))}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ReviewItem;

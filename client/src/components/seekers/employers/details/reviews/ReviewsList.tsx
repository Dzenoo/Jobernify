import React from "react";

import { ReviewTypes } from "@/types";

import ReviewItem from "./ReviewItem";
import { Search } from "lucide-react";

type ReviewsListProps = {
  reviews?: ReviewTypes[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <div>
      <div>
        {reviews?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div>
              <Search size={50} className="mb-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold ">No Reviews Found</h2>
            </div>
            <div>
              <p className="text-gray-600">
                Oops! It looks like no reviews have been found
              </p>
            </div>
          </div>
        )}
        <ul className="flex flex-col gap-3">
          {reviews &&
            reviews?.length > 0 &&
            reviews?.map((review) => (
              <ReviewItem review={review} key={review._id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewsList;

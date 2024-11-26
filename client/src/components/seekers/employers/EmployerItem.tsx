import React from "react";

import Link from "next/link";

import { Camera, Text } from "lucide-react";

import { renderIconText } from "@/helpers";
import { getImageUrl } from "@/lib/utils";

import { EmployerTypes } from "@/types";

import FollowEmployerButton from "./FollowEmployerButton";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type EmployersItemProps = {
  employer: EmployerTypes;
};

const EmployerItem: React.FC<EmployersItemProps> = ({ employer }) => {
  const FooterEmployerData = [
    {
      id: "1",
      icon: <Camera color="gray" />,
      data: employer.followers.length + " Followers",
    },
    {
      id: "2",
      icon: <Text color="gray" />,
      data: employer.reviews.length + " Reviews",
    },
  ];

  return (
    <Card hoverable={true}>
      <CardContent>
        <div className="flex gap-3 max-xl:flex-col">
          <Avatar className="border border-blue-900 w-28 h-28">
            <AvatarImage
              src={getImageUrl(employer?.image)}
              className="object-cover w-auto h-auto"
            />
          </Avatar>
          <div className="flex flex-col gap-5 basis-full">
            <div className="flex gap-3 justify-between sm:items-center">
              <div>
                <Link href={`/companies/${employer._id}?section=jobs`}>
                  <h1 className="hover:text-blue-700 hover:underline text-base-black font-bold">
                    {employer.name}
                  </h1>
                </Link>
              </div>
              <div>
                <FollowEmployerButton employerId={employer._id} />
              </div>
            </div>
            <div>
              <p className="text-initial-gray">{employer.companyDescription}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-6 dark:border-[#0d0d0d]">
        <div className="w-full gap-6 flex items-center justify-between flex-wrap">
          {FooterEmployerData.map((data) => renderIconText(data))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmployerItem;

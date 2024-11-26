import React from "react";

import Link from "next/link";

import { Building, Camera, Text } from "lucide-react";

import { EmployerTypes } from "@/types";
import { findIndustriesData, getImageUrl } from "@/lib/utils";
import { renderIconText } from "@/helpers";

import FollowEmployerButton from "../FollowEmployerButton";
import Navigator from "@/components/ui/navigator";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type EmployerDetailsInfoProps = {
  employer: EmployerTypes;
};

const EmployerDetailsInfo: React.FC<EmployerDetailsInfoProps> = ({
  employer,
}) => {
  const employerIndustry = findIndustriesData(employer?.industry);

  const FooterEmployerData = [
    {
      id: "1",
      icon: <Camera color="gray" />,
      data: employer?.followers.length + " Followers",
    },
    {
      id: "2",
      icon: <Text color="gray" />,
      data: employer?.reviews.length + " Reviews",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Navigator info="Employers" href={"/companies"} title={employer?.name} />
      <Card>
        <div className="flex overflow-auto justify-between max-lg:flex-wrap">
          <div className="flex sm:items-center gap-3 max-sm:flex-col">
            <CardHeader>
              <Avatar className="border border-blue-900 w-36 h-36">
                <AvatarImage
                  src={getImageUrl(employer?.image)}
                  className="object-cover w-auto h-auto"
                />
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:pl-0">
              <div className="rounded-full bg-blue-100 p-3 w-fit dark:bg-blue-500">
                <p className="text-initial-blue">
                  {employer?.address || "Location"}
                </p>
              </div>
              <div>
                <h1 className="text-base-black">{employer?.name}</h1>
              </div>
              <div>
                {renderIconText({
                  id: "1",
                  icon: <Building color="gray" />,
                  data: employerIndustry,
                })}
              </div>
            </CardContent>
          </div>
          <CardFooter className="items-start pt-5 flex flex-col justify-between gap-10 max-lg:basis-full">
            <div className="flex items-center gap-6 flex-wrap">
              {FooterEmployerData.map((data) => renderIconText(data))}
            </div>
            <div className="w-full flex items-center justify-end gap-2 max-sm:flex-col max-lg:justify-stretch max-lg:gap-3 max-lg:items-stretch">
              <div>
                <Button
                  className="max-sm:w-full"
                  disabled={employer?.website === ""}
                  variant="outline"
                >
                  <a
                    target="_blank"
                    href={employer?.website || ""}
                    className="text-blue-500"
                  >
                    Visit Website
                  </a>
                </Button>
              </div>
              <div>
                <Link href={`/companies/${employer?._id}/review`}>
                  <Button className="max-sm:w-full" variant="outline">
                    Review
                  </Button>
                </Link>
              </div>
              <div>
                <FollowEmployerButton employerId={employer?._id} />
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-base-black">About</h1>
        </div>
        <div>
          <p className="text-initial-gray">
            {employer?.companyDescription || "No Biography Available"}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default EmployerDetailsInfo;

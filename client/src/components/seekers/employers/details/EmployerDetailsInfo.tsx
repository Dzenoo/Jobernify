import React from "react";

import { Building, Camera, LayoutTemplate } from "lucide-react";

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
  employer: {
    _id,
    name,
    image,
    address,
    companyDescription,
    website,
    followers,
    industry,
    size,
  },
}) => {
  const employerIndustry = findIndustriesData(industry);

  const FooterEmployerData = [
    {
      id: "1",
      icon: <Camera />,
      data: followers?.length + " Followers",
    },
    {
      id: "2",
      icon: <Building />,
      data: employerIndustry,
    },
    {
      id: "3",
      icon: <LayoutTemplate />,
      data: size + " Employees",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Navigator info="Employers" href={"/companies"} title={name} />
      <Card>
        <div className="flex overflow-auto justify-between max-lg:flex-col hide-scrollbar">
          <div className="flex sm:items-center max-sm:flex-col">
            <CardHeader>
              <Avatar className="border border-blue-100 dark:border-[#1b1b1b] w-36 h-36">
                <AvatarImage
                  src={getImageUrl(image)}
                  className="object-cover w-auto h-auto"
                />
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col justify-between gap-5 sm:pl-0">
              <div className="rounded-full bg-gray-100 p-3 w-fit dark:bg-[#1b1b1b]">
                <p className="text-low-gray">{address || "Location"}</p>
              </div>
              <div>
                <h1 className="text-base-black">{name}</h1>
              </div>
              <div className="flex items-center gap-5 whitespace-nowrap max-sm:flex-col max-sm:items-start">
                {FooterEmployerData.map((data) => renderIconText(data))}
              </div>
            </CardContent>
          </div>
          <CardFooter className="items-start pt-5 flex flex-col justify-between gap-10 max-lg:basis-full flex-wrap">
            <div className="w-full flex items-center justify-end gap-2 max-lg:flex-col max-lg:justify-stretch max-lg:gap-3 max-lg:items-stretch">
              {website !== "" && (
                <div>
                  <a target="_blank" href={website}>
                    <Button className="max-lg:w-full px-10" variant="outline">
                      Website
                    </Button>
                  </a>
                </div>
              )}
              <div>
                <FollowEmployerButton employerId={_id} />
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
            {companyDescription || "No Biography Available"}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default EmployerDetailsInfo;

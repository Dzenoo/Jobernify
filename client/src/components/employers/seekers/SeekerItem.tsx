import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Github, Linkedin, LucideImage } from "lucide-react";

import { SeekerTypes } from "@/types";
import { formatURL, getImageUrl, getSkillNames } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SeekerItemProps = {
  seeker: SeekerTypes;
};

const SeekerItem: React.FC<SeekerItemProps> = ({
  seeker: {
    _id,
    portfolio,
    github,
    linkedin,
    image,
    skills,
    first_name,
    last_name,
    headline,
  },
}) => {
  const SocialsArrays = [
    {
      id: "1",
      href: portfolio,
      icon: <LucideImage />,
    },
    {
      id: "2",
      href: github,
      icon: <Github />,
    },
    {
      id: "3",
      href: linkedin,
      icon: <Linkedin />,
    },
  ];

  const profileImageUrl = getImageUrl(image);

  const skillNames = getSkillNames(skills || []);

  return (
    <Card hoverable={true} className="overflow-hidden">
      <CardHeader className="flex items-center justify-center">
        <Image
          src={profileImageUrl}
          width={130}
          height={130}
          className="rounded-full w-36 h-36 object-cover"
          alt="seeker"
        />
      </CardHeader>
      <CardContent className="text-center flex flex-col justify-center items-center gap-3">
        <div>
          <Link
            className="hover:text-blue-700 hover:underline"
            href={`/seekers/${_id}`}
          >
            <h1 className="font-bold">
              {first_name} {last_name}
            </h1>
          </Link>
        </div>
        <div>
          <p>{headline}</p>
        </div>
        <div className="flex items-center gap-10 pt-3">
          {SocialsArrays.map((socials) =>
            socials.href ? (
              <a
                className="text-[--blue-base-color]"
                href={formatURL(socials.href)}
                target="_blank"
                rel="noopener noreferrer"
                key={socials.id}
              >
                {socials.icon}
              </a>
            ) : (
              <div
                className="text-initial-gray cursor-not-allowed"
                key={socials.id}
              >
                {socials.icon}
              </div>
            )
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3 whitespace-nowrap overflow-x-scroll items-center justify-center hide-scrollbar">
          {skillNames.map((skillName, index) => (
            <Button variant="outline" key={index}>
              {skillName}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeekerItem;

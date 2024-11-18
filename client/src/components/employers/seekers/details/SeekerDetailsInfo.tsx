"use client";

import React from "react";
import Image from "next/image";

import { Github, Linkedin, LucideImage } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navigator from "@/components/ui/navigator";

import EducationList from "@/components/seekers/profile/educations/EducationList";

import { SeekerTypes } from "@/types";
import { formatURL, getImageUrl, getSkillsData } from "@/lib/utils";
import { renderSkills } from "@/helpers";
import ExperienceList from "@/components/seekers/profile/experiences/ExperienceList";

type SeekerDetailsInfoProps = {
  seeker: SeekerTypes;
};

const SeekerDetailsInfo: React.FC<SeekerDetailsInfoProps> = ({ seeker }) => {
  const profileImageUrl = getImageUrl(seeker?.image);
  const categorizedSkills = getSkillsData(seeker?.skills);

  const SocialsArrays = [
    {
      id: "1",
      href: seeker?.portfolio,
      icon: <LucideImage />,
      label: "Portfolio",
    },
    {
      id: "2",
      href: seeker?.github,
      icon: <Github />,
      label: "Github",
    },
    {
      id: "3",
      href: seeker?.linkedin,
      icon: <Linkedin />,
      label: "Linkedin",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Navigator info="Seekers" href={"/seekers"} title={seeker?.first_name} />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5 max-sm:flex-col">
            <div className="flex items-start gap-7 max-md:flex-col">
              <div>
                <Image
                  src={profileImageUrl}
                  width={100}
                  height={100}
                  className="rounded-full w-28 h-28 object-cover"
                  alt="seeker"
                />
              </div>
              <div className="flex flex-col gap-[3px]">
                <div>
                  <h1 className="text-base-black">
                    {seeker?.first_name} {seeker?.last_name}
                  </h1>
                </div>
                <div>
                  <p className="font-bold">{seeker?.headline}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10 flex-wrap">
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
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Biography</h1>
            </div>
            {seeker?.biography ? (
              <div>
                <p className="text-initial-gray">{seeker?.biography}</p>
              </div>
            ) : (
              <div>
                <p className="text-initial-gray">No biography available</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Experience</h1>
            </div>
            <div>
              <ExperienceList experiences={seeker?.experience} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Education</h1>
            </div>
            <div>
              <EducationList educations={seeker?.education} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="font-bold">Skills</h1>
            </div>
            {seeker?.skills.length > 0 ? (
              renderSkills(categorizedSkills)
            ) : (
              <div>
                <p className="text-initial-gray">No skills listed</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeekerDetailsInfo;

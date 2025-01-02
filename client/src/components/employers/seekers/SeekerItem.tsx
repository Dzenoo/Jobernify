import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Github, Linkedin, LucideImage } from 'lucide-react';

import { Seeker } from '@/types';
import { formatURL, getImageUrl, getSkillNames } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';
import { Separator } from '@/components/ui/layout/separator';

type SeekerItemProps = {
  seeker: Seeker;
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
      id: '1',
      href: portfolio,
      icon: <LucideImage />,
      tooltip: 'Portfolio',
    },
    {
      id: '2',
      href: github,
      icon: <Github />,
      tooltip: 'Github',
    },
    {
      id: '3',
      href: linkedin,
      icon: <Linkedin />,
      tooltip: 'Linkedin',
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
      <Separator />
      <CardContent className="text-center flex flex-col justify-center items-center gap-3">
        <div>
          <Link
            className="hover:text-blue-700 hover:underline"
            href={`/seekers/${_id}`}
          >
            <h1 className="font-semibold">
              {first_name} {last_name}
            </h1>
          </Link>
        </div>
        <div>
          <p>{headline}</p>
        </div>
        <div className="flex items-center gap-10 pt-3">
          {SocialsArrays.map((socials) => (
            <TooltipWrapper key={socials.id} tooltip={socials.tooltip}>
              {socials.href ? (
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
                  className="text-muted-foreground cursor-not-allowed"
                  key={socials.id}
                >
                  {socials.icon}
                </div>
              )}
            </TooltipWrapper>
          ))}
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

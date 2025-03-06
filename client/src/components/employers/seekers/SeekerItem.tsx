import React from 'react';

import { LucideImage } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { ISeeker } from '@/types';
import { getImageUrl, getSkillNames } from '@/lib/utils';

import SocialLinks from './SocialLinks';
import GithubIcon from '@/components/shared/icons/GithubIcon';
import LinkedinIcon from '@/components/shared/icons/LinkedinIcon';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Separator } from '@/components/ui/layout/separator';

type SeekerItemProps = {
  seeker: ISeeker;
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
  const socialLinks = [
    {
      id: '1',
      href: portfolio,
      icon: <LucideImage />,
      label: 'Portfolio',
    },
    {
      id: '2',
      href: github,
      icon: <GithubIcon />,
      label: 'Github',
    },
    {
      id: '3',
      href: linkedin,
      icon: <LinkedinIcon />,
      label: 'Linkedin',
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
          <SocialLinks links={socialLinks} />
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

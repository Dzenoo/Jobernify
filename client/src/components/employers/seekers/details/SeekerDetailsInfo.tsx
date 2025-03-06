'use client';

import React from 'react';
import Image from 'next/image';

import { LucideImage } from 'lucide-react';

import { getImageUrl, getSkillsData } from '@/lib/utils';
import { renderSkills } from '@/helpers';

import { ISeeker } from '@/types';

import CardSection from './CardSection';
import SocialLinks from '../SocialLinks';
import EducationList from '@/components/seekers/profile/educations/EducationList';
import ExperienceList from '@/components/seekers/profile/experiences/ExperienceList';
import GithubIcon from '@/components/shared/icons/GithubIcon';
import LinkedinIcon from '@/components/shared/icons/LinkedinIcon';

import Navigator from '@/components/ui/navigation/navigator';
import { Card, CardContent, CardHeader } from '@/components/ui/layout/card';

type SeekerDetailsInfoProps = {
  seeker: ISeeker;
};

const SeekerDetailsInfo: React.FC<SeekerDetailsInfoProps> = ({ seeker }) => {
  const profileImageUrl = getImageUrl(seeker?.image);
  const categorizedSkills = getSkillsData(seeker?.skills);

  const socialLinks = [
    {
      id: '1',
      href: seeker?.portfolio,
      icon: <LucideImage />,
      label: 'Portfolio',
    },
    {
      id: '2',
      href: seeker?.github,
      icon: <GithubIcon />,
      label: 'Github',
    },
    {
      id: '3',
      href: seeker?.linkedin,
      icon: <LinkedinIcon />,
      label: 'Linkedin',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Navigator
        info="Seekers"
        href={'/seekers'}
        title={seeker?.first_name || 'Unknown'}
      />

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-5 max-sm:flex-col">
            <div className="flex items-start gap-7 max-md:flex-col">
              <Image
                src={profileImageUrl}
                width={100}
                height={100}
                className="w-28 h-28 rounded-full object-cover"
                alt={`${seeker?.first_name ?? ''} ${
                  seeker?.last_name ?? ''
                } profile picture`}
              />
              <div className="flex flex-col gap-[3px]">
                <h1 className="text-base-black">
                  {seeker?.first_name} {seeker?.last_name}
                </h1>
                <p>{seeker?.headline ?? 'No headline provided'}</p>
              </div>
            </div>

            <SocialLinks links={socialLinks} />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-10">
          <CardSection title="Biography">
            {seeker?.biography ? (
              <p className="text-base text-muted-foreground">
                {seeker.biography}
              </p>
            ) : (
              <p className="text-base text-muted-foreground">
                No biography available
              </p>
            )}
          </CardSection>

          <CardSection title="Experience">
            <ExperienceList
              openForm={() => {}}
              experiences={seeker?.experience}
            />
          </CardSection>

          <CardSection title="Education">
            <EducationList openForm={() => {}} educations={seeker?.education} />
          </CardSection>

          <CardSection title="Skills">
            {seeker?.skills?.length ? (
              renderSkills(categorizedSkills)
            ) : (
              <p className="text-base text-muted-foreground">
                No skills listed
              </p>
            )}
          </CardSection>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeekerDetailsInfo;

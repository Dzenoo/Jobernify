import React, { Fragment, useState } from 'react';

import { Edit, Image } from 'lucide-react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';
import { formatURL } from '@/lib/utils';

import { ISeeker } from '@/types';

import EditSocialsForm from './forms/EditSocialsForm';
import GithubIcon from '@/components/shared/icons/GithubIcon';
import LinkedinIcon from '@/components/shared/icons/LinkedinIcon';

import { Button } from '@/components/ui/buttons/button';
import { Dialog } from '@/components/ui/layout/dialog';
import { Drawer } from '@/components/ui/layout/drawer';

type SocialsProps = {
  seeker: ISeeker;
};

const Socials: React.FC<SocialsProps> = ({ seeker }) => {
  const isSmall = useMediaQuery('(min-width: 650px)');
  const [isEditSocialsOpen, setIsEditSocialsOpen] = useState(false);

  const openEditSocials = () => setIsEditSocialsOpen(true);
  const closeEditSocials = () => setIsEditSocialsOpen(false);

  const SocialsArrays = [
    {
      id: '1',
      title: 'Portfolio',
      data: seeker?.portfolio || '',
      icon: <Image />,
    },
    {
      id: '2',
      title: 'Github',
      data: seeker?.github || '',
      icon: <GithubIcon />,
    },
    {
      id: '3',
      title: 'Linkedin',
      data: seeker?.linkedin || '',
      icon: <LinkedinIcon />,
    },
  ];

  return (
    <Fragment>
      {isSmall && (
        <Dialog open={isEditSocialsOpen} onOpenChange={setIsEditSocialsOpen}>
          <EditSocialsForm
            isEditSocialsOpen={isEditSocialsOpen}
            seeker={seeker}
            closeEditSocials={closeEditSocials}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isSmall && (
        <Drawer open={isEditSocialsOpen} onOpenChange={setIsEditSocialsOpen}>
          <EditSocialsForm
            isEditSocialsOpen={isEditSocialsOpen}
            seeker={seeker}
            closeEditSocials={closeEditSocials}
            isDialog={false}
          />
        </Drawer>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Socials</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openEditSocials}
            >
              <div className="max-lg:hidden">Edit Socials</div>
              <div>
                <Edit />
              </div>
            </Button>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {SocialsArrays.map(({ id, title, data, icon }) => (
            <div
              key={id}
              className={`bg-card text-card-foreground border rounded-lg px-16 py-7 flex flex-col gap-3 items-center justify-center transition-all overflow-hidden hover:border-gray-300 dark:hover:border-[#585858] ${
                title === 'Linkedin' && 'max-lg:col-span-2 max-sm:col-span-1'
              }`}
            >
              <div>{icon}</div>
              <div>
                <h1 className="font-semibold">{title}</h1>
              </div>
              <div className="text-center">
                {data === '' ? (
                  <p className="text-muted-foreground text-base">Add {title}</p>
                ) : (
                  <a
                    className="text-blue-500"
                    href={formatURL(data)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Socials;

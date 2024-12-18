import React, { Fragment, useState } from 'react';

import { Edit, Github, Image, Linkedin } from 'lucide-react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';
import { formatURL } from '@/lib/utils';

import { Seeker } from '@/types';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Drawer } from '@/components/ui/drawer';
import EditSocialsForm from './forms/EditSocialsForm';

type SocialsProps = {
  seeker: Seeker;
};

const Socials: React.FC<SocialsProps> = ({ seeker }) => {
  const isLarge = useMediaQuery('(min-width: 1280px)');
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
      icon: <Github />,
    },
    {
      id: '3',
      title: 'Linkedin',
      data: seeker?.linkedin || '',
      icon: <Linkedin />,
    },
  ];

  return (
    <Fragment>
      {isLarge && (
        <Dialog open={isEditSocialsOpen} onOpenChange={setIsEditSocialsOpen}>
          <EditSocialsForm
            isEditSocialsOpen={isEditSocialsOpen}
            seeker={seeker}
            closeEditSocials={closeEditSocials}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={isEditSocialsOpen} onOpenChange={setIsEditSocialsOpen}>
          <EditSocialsForm
            isEditSocialsOpen={isEditSocialsOpen}
            seeker={seeker}
            closeEditSocials={closeEditSocials}
            isDialog={false}
          />
        </Drawer>
      )}
      <div className="flex flex-col gap-10">
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
              className="bg-card text-card-foreground border rounded-lg px-16 py-7 flex flex-col gap-3 items-center justify-center transition-all overflow-hidden hover:border-gray-300 dark:hover:border-[#585858]"
            >
              <div>{icon}</div>
              <div>
                <h1 className="font-semibold">{title}</h1>
              </div>
              <div className="text-center">
                {data === '' ? (
                  <p className="text-initial-gray">Add {title}</p>
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

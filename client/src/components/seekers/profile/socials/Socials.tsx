import React, { Fragment, useState } from "react";

import { Edit, Github, Image, Linkedin } from "lucide-react";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import { formatURL } from "@/lib/utils";

import { SeekerTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";
import EditSocialsForm from "./forms/EditSocialsForm";

type SocialsProps = {
  seeker: SeekerTypes;
};

const Socials: React.FC<SocialsProps> = ({ seeker }) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isEditSocialsOpen, setIsEditSocialsOpen] = useState(false);

  const openEditSocials = () => setIsEditSocialsOpen(true);
  const closeEditSocials = () => setIsEditSocialsOpen(false);

  const SocialsArrays = [
    {
      id: "1",
      title: "Portfolio",
      data: seeker?.portfolio || "",
      icon: <Image />,
    },
    {
      id: "2",
      title: "Github",
      data: seeker?.github || "",
      icon: <Github />,
    },
    {
      id: "3",
      title: "Linkedin",
      data: seeker?.linkedin || "",
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
              className="flex flex-col gap-3 items-center justify-center px-16 py-7 border border-gray-300 rounded-lg transition-all hover:bg-gray-100 overflow-hidden dark:border-[#3b3b3b] dark:hover:bg-[#0d0d0d]"
            >
              <div>{icon}</div>
              <div>
                <h1 className="font-bold">{title}</h1>
              </div>
              <div className="text-center">
                {data === "" ? (
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

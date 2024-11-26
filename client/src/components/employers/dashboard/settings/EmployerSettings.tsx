"use client";

import React, { Fragment, useState } from "react";

import { Trash } from "lucide-react";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";

import { EmployerTypes } from "@/types";

import UploadEmployerImage from "./UploadEmployerImage";
import DeleteEmployerProfile from "./DeleteEmployerProfile";
import EmployerProfile from "./informations/EmployerProfile";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";

type EmployerSettingsProps = {
  employer: EmployerTypes;
  token: string;
};

const EmployerSettings: React.FC<EmployerSettingsProps> = ({
  employer,
  token,
}) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <Fragment>
      {isLarge && (
        <Dialog onOpenChange={setIsDeleteOpen} open={isDeleteOpen}>
          <DeleteEmployerProfile
            token={token}
            closeDelete={() => setIsDeleteOpen(false)}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer onOpenChange={setIsDeleteOpen} open={isDeleteOpen}>
          <DeleteEmployerProfile
            token={token}
            closeDelete={() => setIsDeleteOpen(false)}
            isDialog={false}
          />
        </Drawer>
      )}
      <div className="flex justify-between items-start gap-5">
        <UploadEmployerImage image={employer?.image} />
        <Button
          className="flex items-center gap-3"
          variant="destructive"
          onClick={() => setIsDeleteOpen(true)}
        >
          <div className="max-sm:hidden whitespace-nowrap">Delete Profile</div>
          <Trash color="#fff" />
        </Button>
      </div>
      <div className="flex flex-col gap-10">
        <Separator className="relative top-5" />
        <EmployerProfile employer={employer as EmployerTypes} />
      </div>
    </Fragment>
  );
};

export default EmployerSettings;

"use client";

import React, { FormEvent, Fragment, useState } from "react";
import Image from "next/image";

import { ImagePlusIcon, Trash } from "lucide-react";
import { useMutation } from "react-query";

import useEditEmployer from "@/hooks/mutations/useEditEmployer.mutation";
import useUploads from "@/hooks/defaults/useUploads.hook";
import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { AWS_URL } from "@/constants";
import { EmployerTypes } from "@/types";
import { deleteEmployerProfile } from "@/lib/actions/employers.actions";

import EmployerInformations from "./informations/EmployerInformations";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerHeader,
} from "@/components/ui/drawer";

type DeleteEmployerProfileProps = {
  token: string;
  closeDelete: () => void;
  isDialog: boolean;
};

const DeleteEmployerProfile: React.FC<DeleteEmployerProfileProps> = ({
  token,
  closeDelete,
  isDialog,
}) => {
  const { toast } = useToast();
  const { deleteCookieHandler } = useAuthentication();
  const { mutateAsync: deleteEmployerProfileMutate } = useMutation({
    mutationFn: () => deleteEmployerProfile({ token }),
    onSuccess: () => {},
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const onDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    await deleteEmployerProfileMutate();

    deleteCookieHandler();
    closeDelete();
  };

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="max-w-lg">
            <div className="flex items-center justify-center gap-3 flex-col">
              <p className="text-initial-gray text-center">
                Deleting your account will remove all your information,
                including applications and jobs. Seeker will no longer be able
                to view your profile. Are you sure you want to proceed?
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={onDeleteAccount}>
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center">Delete Profile</DrawerTitle>
      </DrawerHeader>
      <div className="p-5 flex flex-col items-center justify-center gap-6">
        <div className="max-w-lg">
          <div className="flex items-center justify-center gap-3 flex-col">
            <p className="text-initial-gray text-center">
              Deleting your account will remove all your information, including
              applications and jobs. Seeker will no longer be able to vi you.
              Are you sure you want to proceed?
            </p>
          </div>
        </div>
      </div>
      <DrawerFooter>
        <Button variant="destructive" onClick={onDeleteAccount}>
          Delete
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

type EmployerProfileInformationProps = {
  employer?: EmployerTypes;
  token: string;
};

const EmployerProfileInformation: React.FC<EmployerProfileInformationProps> = ({
  employer,
  token,
}) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const { toast } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      "application/image": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const { mutateAsync: editEmployerProfileMutate } = useEditEmployer();

  const changeEmployerImage = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({ title: "Error", description: "Please Select Image" });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    await editEmployerProfileMutate(formData);
    restart();
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : employer?.image.includes("https:")
    ? employer?.image
    : `${AWS_URL}/${employer?.image}`;

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
      <div>
        <div>
          <div className="flex justify-between items-start gap-5">
            <div className="flex items-center gap-7 flex-wrap">
              <div>
                <Image
                  src={profileImageUrl}
                  alt="Employer_profile_img"
                  width={130}
                  height={130}
                  className="border border-gray-900 rounded-full w-36 h-36 object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-initial-black">Profile Image</h1>
                <form
                  onSubmit={changeEmployerImage}
                  className="flex items-center gap-3"
                >
                  <div
                    {...getRootProps()}
                    className="tag flex items-center gap-3 w-fit cursor-pointer"
                  >
                    <input {...getInputProps()} type="file" />
                    <div className="flex items-center gap-3">
                      <Button type="button" variant="outline">
                        Upload new photo
                      </Button>
                      <ImagePlusIcon />
                    </div>
                  </div>
                  {selectedFile && (
                    <Button variant="default" type="submit">
                      Save
                    </Button>
                  )}
                </form>
                <p className="text-initial-gray">
                  Please upload your photo in JPG or PNG format.
                </p>
              </div>
            </div>
            <div>
              <Button
                className="flex items-center gap-3"
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
              >
                <div className="max-sm:hidden whitespace-nowrap">
                  Delete Profile
                </div>
                <Trash color="#fff" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <Separator className="relative top-5" />
          <EmployerInformations employer={employer} />
        </div>
      </div>
    </Fragment>
  );
};

export default EmployerProfileInformation;

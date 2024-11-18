"use client";

import React, { FormEvent, Fragment, useState } from "react";
import Image from "next/image";

import { ImagePlusIcon, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";

import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import useUploads from "@/hooks/defaults/useUploads";
import useAuthentication from "@/hooks/defaults/useAuthentication";

import { SeekerTypes } from "@/types";

import { deleteSeekerProfile } from "@/lib/actions/seekers.actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Informations from "./informations/Informations";
import Educations from "./educations/Educations";
import Skills from "./skills/Skills";
import Socials from "./socials/Socials";
import { ClipLoader } from "react-spinners";
import { useTheme } from "next-themes";
import useMediaQuery from "@/hooks/defaults/useMediaQuery";
import Experiences from "./experiences/Experiences";

type DeleteSeekerProfileProps = {
  token: string;
  closeDialog: () => void;
  isDialog: boolean;
};

const DeleteSeekerProfile: React.FC<DeleteSeekerProfileProps> = ({
  token,
  closeDialog,
  isDialog,
}) => {
  const { toast } = useToast();
  const { deleteCookieHandler } = useAuthentication();
  const { mutateAsync: deleteSeekerProfileMutate } = useMutation({
    mutationFn: () => deleteSeekerProfile(token),
    onSuccess: () => {},
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const onDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();
    await deleteSeekerProfileMutate();
    deleteCookieHandler();
    closeDialog();
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
                including applications and jobs. Employers will no longer be
                able to contact you. Are you sure you want to proceed?
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
    <DrawerContent className="flex-col items-center justify-center">
      <DrawerHeader className="text-center">
        <DrawerTitle>Delete Profile</DrawerTitle>
      </DrawerHeader>
      <div className="p-5 flex flex-col gap-6">
        <div className="max-w-lg">
          <div className="flex items-center justify-center gap-3 flex-col">
            <p className="text-initial-gray text-center">
              Deleting your account will remove all your information, including
              applications and jobs. Employers will no longer be able to contact
              you. Are you sure you want to proceed?
            </p>
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <Button variant="destructive" onClick={onDeleteAccount}>
            Delete
          </Button>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};

type SeekerProfileInformationProps = {
  seeker?: SeekerTypes;
  token: string;
};

const SeekerProfileInformation: React.FC<SeekerProfileInformationProps> = ({
  seeker,
  token,
}) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);
  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();
  const { theme } = useTheme();
  const { toast } = useToast();
  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      "application/image": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const changeSeekerImage = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({ title: "Error", description: "Please Select Image" });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    await editSeekerProfileMutate(formData);
    restart();
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : seeker?.image.includes("https:")
    ? seeker?.image
    : `https://job-searching-application.s3.amazonaws.com/${seeker?.image}`;

  return (
    <Fragment>
      {isLarge && (
        <Dialog
          onOpenChange={setIsDeleteProfileOpen}
          open={isDeleteProfileOpen}
        >
          <DeleteSeekerProfile
            token={token}
            closeDialog={() => setIsDeleteProfileOpen(false)}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer
          onOpenChange={setIsDeleteProfileOpen}
          open={isDeleteProfileOpen}
        >
          <DeleteSeekerProfile
            token={token}
            closeDialog={() => setIsDeleteProfileOpen(false)}
            isDialog={false}
          />
        </Drawer>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5">
            <div className="flex items-center gap-7 flex-wrap">
              <div>
                {seeker?.image ? (
                  <Image
                    src={profileImageUrl}
                    alt="seeker_profile_img"
                    width={130}
                    height={130}
                    className="rounded-full w-36 h-36 object-cover"
                  />
                ) : (
                  <ClipLoader
                    color={theme === "dark" ? "#ffffff" : ""}
                    size={100}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-initial-black">Profile Image</h1>
                <form
                  onSubmit={changeSeekerImage}
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
                onClick={() => setIsDeleteProfileOpen(true)}
              >
                <div className="max-sm:hidden whitespace-nowrap">
                  Delete Profile
                </div>
                <Trash color="#fff" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <Informations seeker={seeker} />
          <Socials seeker={seeker} />
          <Experiences seeker={seeker} />
          <Educations seeker={seeker} />
          <Skills skills={seeker?.skills} />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SeekerProfileInformation;

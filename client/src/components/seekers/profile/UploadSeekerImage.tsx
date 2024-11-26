import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { ImagePlusIcon } from "lucide-react";
import { ScaleLoader } from "react-spinners";

import { AWS_URL } from "@/constants";

import useUploads from "@/hooks/defaults/useUploads.hook";
import useEditSeeker from "@/hooks/mutations/useEditSeeker.mutation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type UploadSeekerImageProps = {
  image: string;
};

const UploadSeekerImage: React.FC<UploadSeekerImageProps> = ({ image }) => {
  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();
  const { theme } = useTheme();
  const { toast } = useToast();

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      "application/image": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const changeSeekerImage = async (e: React.FormEvent) => {
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
    : image.includes("https:")
    ? image
    : `${AWS_URL}/${image}`;

  return (
    <div className="flex items-center gap-7 flex-wrap">
      <div>
        {image ? (
          <Image
            src={profileImageUrl}
            alt="seeker_profile_img"
            width={130}
            height={130}
            className="rounded-full w-36 h-36 object-cover"
          />
        ) : (
          <ScaleLoader color={theme === "dark" ? "#ffffff" : ""} height={10} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-initial-black">Profile Image</h1>
        <form onSubmit={changeSeekerImage} className="flex items-center gap-3">
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
  );
};

export default UploadSeekerImage;

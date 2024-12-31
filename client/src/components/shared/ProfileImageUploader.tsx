import React from 'react';
import Image from 'next/image';

import { ImagePlusIcon } from 'lucide-react';

import { AWS_URL } from '@/constants';
import { useUploads } from '@/hooks/core/useUploads.hook';
import { useEditEmployer } from '@/hooks/mutations/useEditEmployer.mutation';
import { useEditSeeker } from '@/hooks/mutations/useEditSeeker.mutation';

import Loader from './loaders/Loader';

import { Button } from '@/components/ui/buttons/button';
import { useToast } from '@/components/ui/info/use-toast';

type ProfileImageUploaderProps =
  | {
      role: 'EMPLOYER';
      image: string;
      isApproved: boolean;
    }
  | {
      role: 'SEEKER';
      image: string;
    };

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = (props) => {
  const { role, image } = props;
  const { toast } = useToast();
  const { mutateAsync: editEmployerProfileMutate } = useEditEmployer();
  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      'application/image': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
  });

  const handleImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({ title: 'Error', description: 'Please Select Image' });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    role === 'EMPLOYER'
      ? await editEmployerProfileMutate(formData)
      : await editSeekerProfileMutate(formData);

    restart();
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : image?.includes('https:')
      ? image
      : `${AWS_URL}/${image}`;

  const showUploader =
    role === 'SEEKER' || (role === 'EMPLOYER' && props.isApproved);

  return (
    <div className="flex items-center gap-7 flex-wrap">
      <div>
        {image ? (
          <Image
            src={profileImageUrl}
            alt="profile_img"
            width={130}
            height={130}
            className="border border-gray-000 rounded-full w-36 h-36 object-cover"
          />
        ) : (
          <Loader type="ScaleLoader" height={10} />
        )}
      </div>
      {showUploader && (
        <div className="flex flex-col gap-3">
          <h1 className="text-initial-black">Profile Image</h1>
          <form onSubmit={handleImage} className="flex items-center gap-3">
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
          <p className="text-muted-foreground text-base">
            Please upload your photo in JPG or PNG format.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;

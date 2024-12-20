import React from 'react';
import Image from 'next/image';

import { ImagePlusIcon } from 'lucide-react';

import { AWS_URL } from '@/constants';

import { useEditEmployer } from '@/hooks/mutations/useEditEmployer.mutation';
import { useUploads } from '@/hooks/core/useUploads.hook';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

type UploadEmployerImageProps = {
  image: string;
};

const UploadEmployerImage: React.FC<UploadEmployerImageProps> = ({ image }) => {
  const { toast } = useToast();

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      'application/image': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
  });

  const { mutateAsync: editEmployerProfileMutate } = useEditEmployer();

  const changeEmployerImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({ title: 'Error', description: 'Please Select Image' });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    await editEmployerProfileMutate(formData);
    restart();
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : image?.includes('https:')
      ? image
      : `${AWS_URL}/${image}`;

  return (
    <div className="flex items-center gap-7 flex-wrap">
      <div>
        <Image
          src={profileImageUrl}
          alt="Employer_profile_img"
          width={130}
          height={130}
          className="border border-gray-100 rounded-full w-36 h-36 object-cover dark:border-[#1b1b1b]"
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
        <p className="text-muted-foreground text-base">
          Please upload your photo in JPG or PNG format.
        </p>
      </div>
    </div>
  );
};

export default UploadEmployerImage;

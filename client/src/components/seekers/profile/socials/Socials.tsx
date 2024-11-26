import React, { Fragment, useState } from "react";

import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { Edit, Github, Image, Linkedin } from "lucide-react";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import useEditSeeker from "@/hooks/mutations/useEditSeeker.mutation";
import { SeekerSocialsSchema } from "@/lib/zod/seekers.validation";

import { SeekerTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatURL } from "@/lib/utils";

type EditSocialsProps = {
  isEditSocialsOpen: boolean;
  closeEditSocials: () => void;
  seeker?: {
    portfolio: string;
    linkedin: string;
    github: string;
  };
  isDialog: boolean;
};

const EditSocials: React.FC<EditSocialsProps> = ({
  isEditSocialsOpen,
  closeEditSocials,
  seeker,
  isDialog,
}) => {
  const form = useForm<zod.infer<typeof SeekerSocialsSchema>>({
    resolver: zodResolver(SeekerSocialsSchema),
    defaultValues: {
      portfolio: seeker?.portfolio || "",
      github: seeker?.github || "",
      linkedin: seeker?.linkedin || "",
    },
    mode: "all",
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  React.useEffect(() => {
    if (isEditSocialsOpen) {
      form.reset();
    }
  }, [isEditSocialsOpen]);

  const onSubmit = async (values: zod.infer<typeof SeekerSocialsSchema>) => {
    const formData = new FormData();

    formData.append("portfolio", values.portfolio || "");
    formData.append("github", values.github || "");
    formData.append("linkedin", values.linkedin || "");

    await editSeekerProfileMutate(formData);

    closeEditSocials();
  };

  const children = (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourportfolio.com" {...field} />
                </FormControl>
                <FormDescription>
                  Provide the URL to your online portfolio or personal website.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/yourusername"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the URL to your Github profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide the URL to your LinkedIn profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-7">
            <Button
              variant="default"
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <ClipLoader color="#fff" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Socials</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className="flex-col justify-center">
      <DrawerHeader className="text-center">
        <DrawerTitle>Edit Socials</DrawerTitle>
      </DrawerHeader>
      <div className="p-5">{children}</div>
    </DrawerContent>
  );
};

type SocialsProps = {
  seeker?: SeekerTypes;
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
          <EditSocials
            isEditSocialsOpen={isEditSocialsOpen}
            seeker={seeker}
            closeEditSocials={closeEditSocials}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={isEditSocialsOpen} onOpenChange={setIsEditSocialsOpen}>
          <EditSocials
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
                    className="text-initial-blue"
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

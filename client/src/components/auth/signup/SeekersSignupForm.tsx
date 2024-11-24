"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

import { SeekerRegistrationSchemas } from "@/lib/zod/auth";
import { signupSeeker } from "@/lib/actions/auth.actions";
import { TypeOfAccount } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SeekersSignupFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const SeekersSignupForm: React.FC<SeekersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<zod.infer<typeof SeekerRegistrationSchemas>>({
    resolver: zodResolver(SeekerRegistrationSchemas),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const { mutateAsync: signupSeekerMutation } = useMutation({
    mutationFn: signupSeeker,
    onSuccess: () => {
      form.reset();
      localStorage.setItem("pendingVerification", "true");
      router.push("/check-your-email");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data.message,
      });
    },
  });

  const onSubmit = async (
    values: zod.infer<typeof SeekerRegistrationSchemas>
  ) => {
    await signupSeekerMutation(values);
  };

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Hiring a talent?{" "}
              <button
                className="text-blue-700 font-bold"
                onClick={() => handleTypeSelection(TypeOfAccount.Employer)}
              >
                Employer
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sign up to find job you want</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-start gap-3 max-[600px]:flex-wrap">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                    <FormDescription>Enter your given name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormDescription>
                      Enter your family or surname.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="Email" />
                  </FormControl>
                  <FormDescription>
                    Enter a valid email address where employers can reach you.
                    Ensure it's a valid to verify your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormDescription>
                    Create a secure password with at least 8 characters,
                    including symbols and numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="default"
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <ClipLoader size={25} color="#fff" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-initial-gray relative text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SeekersSignupForm;

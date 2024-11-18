"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { ClipLoader } from "react-spinners";

import { EmployersRegistrationSchemas } from "@/lib/zod/auth";
import { signupEmployer } from "@/lib/actions/auth.actions";
import { TypeOfAccount } from "@/types";
import { industries } from "@/constants";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EmployersSignupFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const EmployersSignupForm: React.FC<EmployersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<zod.infer<typeof EmployersRegistrationSchemas>>({
    resolver: zodResolver(EmployersRegistrationSchemas),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      industry: "",
      size: "",
      address: "",
      number: "",
    },
    mode: "all",
  });

  const { mutateAsync: signupEmployerMutation } = useMutation({
    mutationFn: signupEmployer,
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
    values: zod.infer<typeof EmployersRegistrationSchemas>
  ) => {
    await signupEmployerMutation(values);
  };

  return (
    <Card className="flex flex-col gap-2 lg:w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Looking for a job?{" "}
              <button
                className="text-blue-700 font-bold"
                onClick={() => handleTypeSelection(TypeOfAccount.Seeker)}
              >
                Seeker
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sign up to hire a talent</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Of Company</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormDescription>
                    Enter the official name of your company.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Number" />
                  </FormControl>
                  <FormDescription>
                    Provide a contact number where you can be reached.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="Email" />
                  </FormControl>
                  <FormDescription>
                    Enter your business email address. Ensure it's a valid to
                    verify your account.
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
                    <Input type="password" {...field} placeholder="Password" />
                  </FormControl>
                  <FormDescription>
                    Choose a strong password with at least 8 characters,
                    including symbols and numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-5 max-sm:flex-col">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem
                              key={industry.value}
                              value={industry.value}
                            >
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select the industry your company operates in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Size</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Less-than-17">
                            Less than 17
                          </SelectItem>
                          <SelectItem value="20-50">20-50</SelectItem>
                          <SelectItem value="50-100">50-100</SelectItem>
                          <SelectItem value="100-250">100-250</SelectItem>
                          <SelectItem value="250-500">250-500</SelectItem>
                          <SelectItem value="500-1000">500-1000</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Indicate the size of your company.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormDescription>
                    Enter the physical address of your company.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting}
                className="m-auto block relative px-10"
              >
                {form.formState.isSubmitting ? (
                  <ClipLoader size={25} color="#fff" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
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

export default EmployersSignupForm;

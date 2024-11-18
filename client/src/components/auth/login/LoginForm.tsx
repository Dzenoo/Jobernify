import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { ClipLoader } from "react-spinners";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import { loginUserAccount } from "@/lib/actions/auth.actions";
import { LoginSchema } from "@/lib/zod/auth";
import { TypeOfAccount } from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type LoginFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
  type: TypeOfAccount;
};

const LoginForm: React.FC<LoginFormTypes> = ({ handleTypeSelection, type }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { getCookieHandler, storeCookieHandler } = useAuthentication();
  const { isAuthenticated } = getCookieHandler();
  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const { mutateAsync: loginToAccount } = useMutation({
    mutationFn: loginUserAccount,
    onSuccess: (data) => {
      form.reset();
      storeCookieHandler(data.token);
      if (data?.employer) {
        router.replace("/seekers");
      } else {
        router.replace("/jobs");
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data.message,
      });
    },
  });

  const onSubmit = async (loginData: zod.infer<typeof LoginSchema>) => {
    await loginToAccount({ type, loginData });
  };

  return (
    <Card className="flex flex-col sm:w-[450px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Login to{" "}
              <button
                className={`text-blue-700 ${
                  type === TypeOfAccount.Seeker && "font-bold"
                }`}
                onClick={() => handleTypeSelection(TypeOfAccount.Seeker)}
              >
                Seeker
              </button>{" "}
              or{" "}
              <button
                className={`text-blue-700 ${
                  type === TypeOfAccount.Employer && "font-bold"
                }`}
                onClick={() => handleTypeSelection(TypeOfAccount.Employer)}
              >
                Employer
              </button>{" "}
              Account
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Login to Jobernify</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
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
                    <Input
                      type="password"
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting || isAuthenticated}
                className="m-auto block relative px-10"
              >
                {form.formState.isSubmitting ? (
                  <ClipLoader size={25} />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-gray-500">
          Dont have account?{" "}
          <Link href="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

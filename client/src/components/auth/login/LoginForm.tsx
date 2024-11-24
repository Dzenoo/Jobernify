import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { ClipLoader } from "react-spinners";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { signIn } from "@/lib/actions/auth.actions";
import { LoginSchema } from "@/lib/zod/auth.validation";

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

const LoginForm: React.FC = () => {
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
    mutationFn: signIn,
    onSuccess: (data) => {
      form.reset();
      storeCookieHandler(data.access_token);
      if (data?.role === "seeker") {
        router.replace("/jobs");
      } else {
        router.replace("/seekers");
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
    await loginToAccount({ loginData });
  };

  return (
    <Card className="flex flex-col sm:w-[450px]">
      <CardHeader>
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div>
            <h1 className="text-2xl font-bold">Login to Jobernify</h1>
          </div>
          <div>
            <p className="text-gray-500">
              Welcome back! Please enter your email and password to access your
              account.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
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
            <Button
              variant="default"
              type="submit"
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                isAuthenticated
              }
              className="w-full"
            >
              {form.formState.isSubmitting ? <ClipLoader size={25} /> : "Login"}
            </Button>
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

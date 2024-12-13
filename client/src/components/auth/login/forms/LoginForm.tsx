import React from "react";
import { useRouter } from "next/navigation";

import zod from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScaleLoader } from "react-spinners";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { signIn } from "@/lib/actions/auth.actions";
import { LoginSchema } from "@/lib/zod/auth.validation";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
    mode: "onChange",
  });

  const { mutateAsync: loginToAccount } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      form.reset();
      storeCookieHandler(data.access_token);
      router.replace(data?.role === "seeker" ? "/jobs" : "/seekers");
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
                <Input type="password" placeholder="**********" {...field} />
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
          {form.formState.isSubmitting ? (
            <ScaleLoader color="#fff" height={10} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

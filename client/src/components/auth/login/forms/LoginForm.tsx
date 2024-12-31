import React from 'react';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';
import { signIn } from '@/lib/actions/auth.actions';
import { LoginSchema } from '@/lib/zod/auth.validation';

import Loader from '@/components/shared/loaders/Loader';

import { useToast } from '@/components/ui/info/use-toast';
import { Button } from '@/components/ui/buttons/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const { getCookieHandler } = useAuthentication();
  const { isAuthenticated } = getCookieHandler();

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: loginToAccount } = useMutation({
    mutationFn: signIn,
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data.message,
      });
    },
  });

  const onSubmit = async (loginData: zod.infer<typeof LoginSchema>) => {
    await loginToAccount({ loginData });
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
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
        <div className="flex flex-col text-center gap-3">
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
              <Loader type="ScaleLoader" height={10} />
            ) : (
              'Login'
            )}
          </Button>
          <p className="text-muted-foreground">Or</p>
          <Button
            variant="default"
            type="button"
            onClick={() => handleGoogleSignIn()}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

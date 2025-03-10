'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import Loader from '@/components/shared/ui/Loader';

import { SeekerRegistrationSchema } from '@/lib/zod/auth.validation';
import { signupSeeker } from '@/lib/actions/auth.actions';

import { useToast } from '@/components/ui/info/use-toast';
import { Button } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/form/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';

const SeekersSignupForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<zod.infer<typeof SeekerRegistrationSchema>>({
    resolver: zodResolver(SeekerRegistrationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: signupSeekerMutation } = useMutation({
    mutationFn: signupSeeker,
    onSuccess: () => {
      form.reset();
      localStorage.setItem('pendingVerification', 'true');
      router.push('/check-your-email');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (
    values: zod.infer<typeof SeekerRegistrationSchema>,
  ) => {
    await signupSeekerMutation(values);
  };

  const handleSeekerGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?type=seeker`;
  };

  return (
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
                <FormDescription>Enter your family or surname.</FormDescription>
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
                Start with uppercase letter, minimum 8 characters and contain
                symbols and numbers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col text-center gap-3">
          <Button
            variant="default"
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <Loader type="ScaleLoader" height={10} />
            ) : (
              'Register'
            )}
          </Button>
          <p className="text-muted-foreground">Or</p>
          <Button
            variant="outline"
            className="flex items-center justify-center w-full"
            disabled={form.formState.isSubmitting}
            type="button"
            onClick={() => handleSeekerGoogleSignUp()}
          >
            <img
              src="/icons/google-icon-logo-transparent.png"
              alt="google-logo"
            />
            Sign up with Google
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SeekersSignupForm;

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScaleLoader } from 'react-spinners';

import { SeekerRegistrationSchema } from '@/lib/zod/auth.validation';
import { signupSeeker } from '@/lib/actions/auth.actions';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
    mode: 'all',
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
      });
    },
  });

  const onSubmit = async (
    values: zod.infer<typeof SeekerRegistrationSchema>,
  ) => {
    await signupSeekerMutation(values);
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
                Create a strong password with at least 8 characters, one
                uppercase including symbols and numbers.
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
            <ScaleLoader color="#fff" height={10} />
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SeekersSignupForm;

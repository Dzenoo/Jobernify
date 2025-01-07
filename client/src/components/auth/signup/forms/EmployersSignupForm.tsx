'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import Loader from '@/components/shared/ui/Loader';

import { EmployerRegistrationSchema } from '@/lib/zod/auth.validation';
import { signupEmployer } from '@/lib/actions/auth.actions';
import { companySizes, industries } from '@/constants';
import { uppercaseFirstLetter } from '@/lib/utils';

import { useToast } from '@/components/ui/info/use-toast';
import { Input } from '@/components/ui/form/input';
import { Button } from '@/components/ui/buttons/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';

const EmployersSignupForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<zod.infer<typeof EmployerRegistrationSchema>>({
    resolver: zodResolver(EmployerRegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      industry: '',
      size: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: signupEmployerMutation } = useMutation({
    mutationFn: signupEmployer,
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
    values: zod.infer<typeof EmployerRegistrationSchema>,
  ) => {
    await signupEmployerMutation(values);
  };

  const handleEmployerGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?type=employer`;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[40em] overflow-y-auto space-y-8 py-2 px-5"
      >
        <div className="border p-4 rounded-xl space-y-2">
          <p className="text-muted-foreground font-light text-sm">
            Your account approval is typically processed within 24 hours. Once
            approved, you will gain access to manage your jobs and profile.
            Please note that you cannot add jobs or make your profile visible to
            seekers until your account is approved.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-center w-full"
          disabled={form.formState.isSubmitting}
          type="button"
          onClick={() => handleEmployerGoogleSignUp()}
        >
          <img
            src="/icons/google-icon-logo-transparent.png"
            alt="google-logo"
          />
          Sign up with Google
        </Button>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Email" />
              </FormControl>
              <FormDescription>
                Enter your business email address. Ensure it's a valid to verify
                your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="Password" />
              </FormControl>
              <FormDescription>
                Start with uppercase letter, minimum 8 characters and contain
                symbols and numbers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-5 max-sm:flex-col">
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
                        <SelectItem key={industry} value={industry}>
                          {uppercaseFirstLetter(industry)}
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
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {uppercaseFirstLetter(size)}
                        </SelectItem>
                      ))}
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
      </form>
    </Form>
  );
};

export default EmployersSignupForm;

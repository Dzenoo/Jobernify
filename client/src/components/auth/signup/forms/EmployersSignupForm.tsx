'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScaleLoader } from 'react-spinners';

import { EmployerRegistrationSchema } from '@/lib/zod/auth.validation';
import { signupEmployer } from '@/lib/actions/auth.actions';
import { companySizes, industries } from '@/constants';
import { uppercaseFirstLetter } from '@/lib/utils';

import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  return (
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
                Choose a strong password with at least 8 characters, one
                uppercase including symbols and numbers.
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
            <ScaleLoader color="#fff" height={10} />
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmployersSignupForm;

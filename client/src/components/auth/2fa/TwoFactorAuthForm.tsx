'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import QRCode from 'qrcode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  generate2FACode,
  verify2FACode,
  verify2FALogin,
} from '@/lib/actions/auth.actions';
import { Verify2FACodeSchema } from '@/lib/zod/auth.validation';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import Loader from '@/components/shared/loaders/Loader';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/form/input-otp';
import { Button } from '@/components/ui/buttons/button';
import { useToast } from '@/components/ui/info/use-toast';
import { cn } from '@/lib/utils';

type TwoFactorAuthFormProps =
  | {
      mode: 'ENABLE';
      userId?: never;
      role?: never;
      onSuccess?: () => void;
      formClassName?: string;
    }
  | {
      mode: 'LOGIN_VERIFY';
      userId: string;
      role: string;
      onSuccess?: () => void;
      formClassName?: string;
    }
  | {
      mode: 'DISABLE';
      userId?: never;
      role?: never;
      onSuccess?: () => void;
      formClassName?: string;
    };

const TwoFactorAuthForm: React.FC<TwoFactorAuthFormProps> = (props) => {
  const { mode, formClassName, onSuccess } = props;

  const { getCookieHandler, storeCookieHandler } = useAuthentication();
  const { token, userType } = getCookieHandler();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const { toast } = useToast();

  const router = useRouter();
  const form = useForm<z.infer<typeof Verify2FACodeSchema>>({
    resolver: zodResolver(Verify2FACodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const generate2FA = useMutation({
    mutationFn: async () => {
      if (!token || !userType) throw new Error('Unauthorized!');
      return await generate2FACode(userType, token);
    },
    onSuccess: async (data) => {
      const otpAuthUrl = data.otpauthUrl;

      if (otpAuthUrl) {
        const dataUrl = await QRCode.toDataURL(otpAuthUrl);
        setQrCodeDataUrl(dataUrl);
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const verify2FAEnable = useMutation({
    mutationFn: async (code: string) => {
      if (!token || !userType) throw new Error('Unauthorized!');
      return await verify2FACode(userType, token, code);
    },
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: data.message,
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const verify2FAOther = useMutation({
    mutationFn: async (code: string) => {
      if (mode === 'LOGIN_VERIFY') {
        return verify2FALogin(props.userId, props.role, code);
      }
    },
    onSuccess: (data) => {
      if (mode === 'LOGIN_VERIFY') {
        form.reset();
        storeCookieHandler(data?.access_token as string);
        router.replace(data?.role === 'seeker' ? '/jobs' : '/seekers');
      }
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description: err?.response?.data?.message,
      });
    },
  });

  async function handleGenerate2FACode() {
    await generate2FA.mutateAsync();
  }

  async function handleSubmit({ code }: z.infer<typeof Verify2FACodeSchema>) {
    if (mode === 'ENABLE') {
      await verify2FAEnable.mutateAsync(code);
    } else {
      await verify2FAOther.mutateAsync(code);
    }
  }

  const isGenerating2FACode = generate2FA.status === 'pending';
  const isEnabling2FACode = verify2FAEnable.status === 'pending';
  const isVerifyingOther = verify2FAOther.status === 'pending';

  return (
    <div className="space-y-5">
      {mode === 'ENABLE' && (
        <div className="p-5 border rounded-xl border-muted flex flex-col items-center justify-center">
          {qrCodeDataUrl ? (
            <Image
              width={200}
              height={200}
              src={qrCodeDataUrl}
              alt="QR code for TOTP"
              className="object-cover"
            />
          ) : (
            <Button
              disabled={isGenerating2FACode}
              onClick={handleGenerate2FACode}
            >
              {isGenerating2FACode ? (
                <Loader type="ScaleLoader" height={10} />
              ) : (
                'Reveal QR code'
              )}
            </Button>
          )}
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn('space-y-5', formClassName)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the code from your authenticator.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {mode === 'ENABLE'
              ? isEnabling2FACode
                ? 'Verifying...'
                : 'Enable 2FA'
              : mode === 'LOGIN_VERIFY'
                ? isVerifyingOther
                  ? 'Verifying...'
                  : 'Confirm Login'
                : isVerifyingOther
                  ? 'Verifying...'
                  : 'Disable 2FA'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TwoFactorAuthForm;

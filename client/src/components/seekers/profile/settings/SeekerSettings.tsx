import React from 'react';

import TwoFactorAuthForm from '@/components/auth/2fa/TwoFactorAuthForm';

import { Badge } from '@/components/ui/utilities/badge';
import { Button } from '@/components/ui/buttons/button';
import { Separator } from '@/components/ui/layout/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/layout/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';

type SeekerSettingsProps = {
  isTwoFactorAuthEnabled: boolean;
};

const SeekerSettings: React.FC<SeekerSettingsProps> = ({
  isTwoFactorAuthEnabled,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-5">
          <div>
            <h1 className="font-semibold">Security</h1>
          </div>
          <div className="flex justify-between gap-5 items-center">
            <div className="max-sm:space-y-2">
              <div className="flex gap-2 max-sm:flex-wrap-reverse sm:items-center">
                <h1>Two-factor authentication (2FA)</h1>
                {isTwoFactorAuthEnabled && (
                  <Badge className="w-fit">Activated</Badge>
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  Setup two-factor authentication (2FA) to enhance your account
                  security and protect your account from unauthorized access.
                </p>
              </div>
            </div>
            {!isTwoFactorAuthEnabled && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Activate 2FA</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="pb-5 text-left">
                    <DialogTitle>Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                      To be able to log in to your account, you will need to
                      scan the QR code with Google Authenticator App and enter
                      code below.
                    </DialogDescription>
                  </DialogHeader>
                  <TwoFactorAuthForm mode="ENABLE" />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeekerSettings;

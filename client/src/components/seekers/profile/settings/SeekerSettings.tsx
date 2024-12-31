'use client';

import React from 'react';

import { FieldGroup } from '@/helpers';

import ReceiveJobAlertsForm from '../alerts/forms/ReceiveJobAlertsForm';
import Enable2FA from '@/components/shared/Enable2FA';

import { Badge } from '@/components/ui/utilities/badge';
import { Separator } from '@/components/ui/layout/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';

type SeekerSettingsProps = {
  isTwoFactorAuthEnabled: boolean;
  receiveJobAlerts: boolean;
};

const SeekerSettings: React.FC<SeekerSettingsProps> = ({
  isTwoFactorAuthEnabled,
  receiveJobAlerts,
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
      <CardContent className="space-y-5">
        <FieldGroup
          customStyles={{ div: 'gap-5', h1: 'font-semibold' }}
          title="Security"
        >
          <div className="flex justify-between gap-5 max-sm:flex-col max-sm:w-full sm:items-center">
            <div className="max-sm:space-y-2">
              <div className="flex gap-2 max-sm:flex-wrap-reverse sm:items-center">
                <h1>Two-factor authentication (2FA)</h1>
                {isTwoFactorAuthEnabled && (
                  <Badge className="w-fit">Activated</Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                Setup two-factor authentication (2FA) to enhance your account
                security and protect your account from unauthorized access.
              </p>
            </div>
            {!isTwoFactorAuthEnabled && <Enable2FA />}
          </div>
        </FieldGroup>
        <Separator />
        <FieldGroup
          customStyles={{ div: 'gap-5', h1: 'font-semibold' }}
          title="Notifications"
        >
          <ReceiveJobAlertsForm receiveJobAlerts={receiveJobAlerts} />
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default SeekerSettings;

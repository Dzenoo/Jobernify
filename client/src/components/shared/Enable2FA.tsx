import React, { useState } from 'react';

import TwoFactorAuthForm from '../auth/2fa/TwoFactorAuthForm';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/layout/dialog';
import { Button } from '@/components/ui/buttons/button';

type Enable2FAProps = {};

const Enable2FA: React.FC<Enable2FAProps> = () => {
  const [is2faDialogOpen, setIs2faDialogOpen] = useState(false);

  const handleOpen2faDialog = () => {
    setIs2faDialogOpen(true);
  };

  const handleClose2faDialog = () => {
    setIs2faDialogOpen(false);
  };

  return (
    <Dialog open={is2faDialogOpen} onOpenChange={setIs2faDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen2faDialog}>Activate 2FA</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-5 text-left">
          <DialogTitle>Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            To be able to log in to your account, you will need to scan the QR
            code with Google Authenticator App and enter code below.
          </DialogDescription>
        </DialogHeader>
        <TwoFactorAuthForm mode="ENABLE" onSuccess={handleClose2faDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default Enable2FA;

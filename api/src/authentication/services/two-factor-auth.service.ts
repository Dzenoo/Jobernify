import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private seekersService: SeekersService,
    private employersService: EmployersService,
  ) {}

  async generateTwoFactorAuthSecret(
    userId: string,
  ): Promise<{ secret: string; otpauthUrl: string }> {
    const secret = speakeasy.generateSecret({
      name: 'Jobernify',
    });

    const seeker = await this.seekersService.findOneById(userId);

    if (seeker) {
      await this.seekersService.findAndUpdateOne(
        { _id: userId },
        {
          twoFactorAuthSecret: secret.base32,
        },
      );
    }

    const employer = await this.employersService.findOneById(userId);

    if (employer) {
      await this.employersService.findOneByIdAndUpdate(userId, {
        twoFactorAuthSecret: secret.base32,
      });
    }

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url,
    };
  }

  async verifyTwoFactorAuthToken(
    userId: string,
    code: string,
  ): Promise<boolean> {
    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return false;
    }

    const user = await this.getUserWithTwoFactorSecret(userId);

    if (!user || !user.twoFactorAuthSecret) {
      return false;
    }

    return speakeasy.totp.verify({
      secret: user.twoFactorAuthSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
  }

  private async getUserWithTwoFactorSecret(userId: string): Promise<any> {
    const seeker = await this.seekersService.findOneById(
      userId,
      '+twoFactorAuthSecret',
    );
    if (seeker) {
      return seeker;
    }

    const employer = await this.employersService.findOneById(
      userId,
      '+twoFactorAuthSecret',
    );
    if (employer) {
      return employer;
    }

    return null;
  }

  async setTwoFactorAuthEnabled(userId: string, enabled: boolean) {
    const seeker = await this.seekersService.findOneById(userId);

    if (seeker) {
      await this.seekersService.findAndUpdateOne(
        { _id: userId },
        {
          isTwoFactorAuthEnabled: enabled,
        },
      );
    }

    const employer = await this.employersService.findOneById(userId);

    if (employer) {
      await this.employersService.findOneByIdAndUpdate(userId, {
        isTwoFactorAuthEnabled: enabled,
      });
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

import { SeekersService } from 'src/models/seekers/seekers.service';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';
import { EmployersService } from 'src/models/employers/employers.service';
import { Employer } from 'src/models/employers/schemas/employer.schema';

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
    let user: Seeker | Employer | null = null;

    user = await this.seekersService.findOneById(
      userId,
      '+twoFactorAuthSecret',
    );

    if (!user) {
      user = await this.employersService.findOneById(
        userId,
        '+twoFactorAuthSecret',
      );
    }

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

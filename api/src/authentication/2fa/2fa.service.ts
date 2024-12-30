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

  /**
   * 1) Generate a TOTP secret and store it on the user object
   */
  async generateTwoFactorAuthSecret(
    userId: string,
    role: 'seeker' | 'employer',
  ): Promise<{ secret: string; otpauthUrl: string }> {
    const secret = speakeasy.generateSecret({
      name: 'Jobernify',
    });

    if (role === 'seeker') {
      await this.seekersService.findAndUpdateOne(
        { _id: userId },
        {
          twoFactorAuthSecret: secret.base32,
        },
      );
    } else {
      await this.employersService.findOneByIdAndUpdate(userId, {
        twoFactorAuthSecret: secret.base32,
      });
    }

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url,
    };
  }

  /**
   * 2) Verify the TOTP code submitted by the user
   */
  async verifyTwoFactorAuthToken(
    userId: string,
    role: 'seeker' | 'employer',
    code: string,
  ): Promise<boolean> {
    let user: Seeker | Employer | null = null;

    if (role === 'seeker') {
      user = await this.seekersService.findOneById(
        userId,
        '+twoFactorAuthSecret',
      );
    } else {
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
      window: 1, // optional; how lenient you want to be with timing
    });
  }

  /**
   * Enable or disable 2FA after successful verification
   */
  async setTwoFactorAuthEnabled(
    userId: string,
    role: 'seeker' | 'employer',
    enabled: boolean,
  ) {
    if (role === 'seeker') {
      await this.seekersService.findAndUpdateOne(
        { _id: userId },
        {
          isTwoFactorAuthEnabled: enabled,
        },
      );
    } else {
      await this.employersService.findOneByIdAndUpdate(userId, {
        isTwoFactorAuthEnabled: enabled,
      });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { VERIFICATION_TOKEN_EXPIRATION_TIME } from '@/common/constants';

import { SeekersService } from '@/models/seekers/seekers.service';
import { EmployersService } from '@/models/employers/employers.service';

@Injectable()
export class CleanupService {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupExpiredAccounts() {
    try {
      const expirationDate = new Date(
        Date.now() - VERIFICATION_TOKEN_EXPIRATION_TIME,
      );

      await this.seekersService.findAndDeleteMany({
        emailVerified: false,
        verificationExpiration: { $lt: expirationDate },
      });
      await this.employersService.findAndDeleteMany({
        isApproved: false,
        emailVerified: false,
        verificationExpiration: { $lt: expirationDate },
      });
    } catch (error) {}
  }
}

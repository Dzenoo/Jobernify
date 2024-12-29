import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { VERIFICATION_TOKEN_EXPIRATION_TIME } from '../constants';

import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';

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

import { Module } from '@nestjs/common';

import { SeekersModule } from 'src/models/seekers/seekers.module';
import { EmployersModule } from 'src/models/employers/employers.module';
import { MailModule } from 'src/common/email/mail.module';

import { VerificationService } from '../services/verification.service';

@Module({
  imports: [SeekersModule, EmployersModule, MailModule],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}

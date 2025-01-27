import { forwardRef, Module } from '@nestjs/common';

import { SeekersModule } from '@/models/seekers/seekers.module';
import { EmployersModule } from '@/models/employers/employers.module';
import { MailModule } from '@/common/modules/email/mail.module';

import { VerificationService } from '@/authentication/services/verification.service';

@Module({
  imports: [
    forwardRef(() => SeekersModule),
    forwardRef(() => EmployersModule),
    MailModule,
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}

import { Module } from '@nestjs/common';
import { MailService } from '@/common/modules/email/mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

import { Module } from '@nestjs/common';
import { MailController } from '@/common/email/mail.controller';
import { MailService } from '@/common/email/mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

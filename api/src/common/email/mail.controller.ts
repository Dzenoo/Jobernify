import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send')
  async sendTestEmail() {
    const testEmail = 'dzenisgudzevic18@gmail.com';
    const subject = 'Test Email from Jobernify';
    const html =
      '<h1>This is a test email!</h1><p>If you wish to unsubscribe, click <a href="https://jobernify.com/email/unsubscribe?email=your-email@example.com">here</a>.</p>';

    await this.mailService.sendMail(testEmail, subject, html);
    return { message: 'Test email sent successfully' };
  }
}

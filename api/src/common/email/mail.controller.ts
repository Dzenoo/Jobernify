import { Controller, Get } from '@nestjs/common';
import { MailService } from '@/common/email/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send')
  async sendTestEmail() {
    const testEmail = 'dzenisgudzevic18@gmail.com';
    const subject = 'Test Email from Jobernify';
    const html = `
                          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                            <h2 style="color: #333;">Jobernify - Verify your email</h2>
                            <p style="color: #555;">Please verify your email by clicking on this link: 
                            <a href="${process.env.FRONTEND_URL}/verify-email?token=token12345&type=seeker" 
                            style="color: #1a73e8;">Verify Email</a></p>
                            <p style="color: #555;">This token expires in 24 hours, so please verify your account within this timeframe.</p>
                          </div>
                         `;

    await this.mailService.sendMail(testEmail, subject, html);
    return { message: 'Test email sent successfully' };
  }
}

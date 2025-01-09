import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly domain: string;
  private readonly from: string;
  private readonly mg: IMailgunClient;

  constructor(private readonly configService: ConfigService) {
    const mailgunClient = new Mailgun(formData);

    this.mg = mailgunClient.client({
      username: 'api',
      key: this.configService.get<string>('MAILGUN_API_KEY'),
      url:
        this.configService.get<string>('MAILGUN_API_URL') ||
        'https://api.mailgun.net',
    });

    this.domain = this.configService.get<string>('MAILGUN_DOMAIN');
    this.from = this.configService.get<string>('MAILGUN_FROM');
  }

  /**
   * Sends an email using the Mailgun API.
   *
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The email subject.
   * @param {string} templateName - The template name to use for the email body.
   * @param {Record<string, any>} variables - The variables to pass to the template.
   * @returns {Promise<void>}
   */
  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    variables: Record<string, any>,
  ): Promise<void> {
    const html = this.renderTemplate(templateName, variables);

    const messageData = {
      from: this.from,
      to,
      subject,
      html,
    };

    try {
      await this.mg.messages.create(this.domain, messageData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  private renderTemplate(
    templateName: string,
    variables: Record<string, any>,
  ): string {
    try {
      const templatePath = path.join(
        __dirname,
        '..',
        'email',
        'templates',
        `${templateName}.hbs`,
      );
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateContent);
      return compiledTemplate(variables);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to render email template: ${error.message}`,
      );
    }
  }

  // Optional: Implement batch sending or templating as needed
}

// /**
//  * Adds an email to the queue for asynchronous sending.
//  * @param to Recipient email address
//  * @param subject Email subject
//  * @param html Email HTML content
//  */
// async sendMail(to: string, subject: string, html: string) {
//   await this.emailQueue.add(
//     'send-email',
//     { to, subject, html },
//     {
//       attempts: 3, // Number of retry attempts
//       backoff: 5000, // Delay between attempts in ms
//     },
//   );
// }

// /**
//  * Generates email content with an unsubscribe link.
//  * @param to Recipient email address
//  * @param content Original email HTML content
//  * @returns HTML content with unsubscribe link
//  */
// generateEmailContent(to: string, content: string): string {
//   const unsubscribeUrl = `https://jobernify.com/email/unsubscribe?email=${encodeURIComponent(to)}`;
//   return `
//     <html>
//       <body>
//         ${content}
//         <p>If you wish to unsubscribe, click <a href="${unsubscribeUrl}">here</a>.</p>
//       </body>
//     </html>
//   `;
// }

// /**
//  * Adds an email address to Mailgun's suppression (unsubscribe) list.
//  * @param email Email address to unsubscribe
//  */
// async addToUnsubscribeList(email: string) {
//   try {
//     await this.mg.lists(`${this.domain}/unsubscribe`).members.create({ address: email });
//     this.logger.log(`Added to unsubscribe list: ${email}`);
//   } catch (error) {
//     this.logger.error(`Failed to add to unsubscribe list: ${email}`, error);
//     throw new InternalServerErrorException('Failed to process unsubscription');
//   }
// }

import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { SeekersService } from '@/models/seekers/seekers.service';
import { EmployersService } from '@/models/employers/employers.service';
import { MailService } from '@/common/email/mail.service';

import { uuidv7 } from 'uuidv7';
import { VERIFICATION_TOKEN_EXPIRATION_TIME } from '@/common/constants';

@Injectable()
export class VerificationService {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
    private readonly mailService: MailService,
  ) {}

  async verifyEmail(
    token: string,
    userType: 'seeker' | 'employer',
  ): Promise<any> {
    let user: any;

    if (userType === 'seeker') {
      user = await this.seekersService.findOne({ verificationToken: token });
    } else if (userType === 'employer') {
      user = await this.employersService.findOne({ verificationToken: token });
    }

    if (!user) {
      throw new ConflictException('Invalid token.');
    }

    if (user.verificationExpiration < new Date()) {
      throw new UnauthorizedException('Token expired.');
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiration = undefined;

    await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: 'Email successfully verified.',
    };
  }

  async sendVerificationEmail(
    email: string,
    verificationToken: string,
    userType: string,
  ) {
    const variables = {
      title: 'Verify Your Email',
      verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&type=${userType}`,
      currentYear: new Date().getFullYear(),
    };

    await this.mailService.sendMail(
      email,
      'Jobernify - Verify your email',
      'verify-email',
      variables,
    );
  }

  create() {
    const verificationToken = uuidv7();
    const verificationExpiration =
      Date.now() + VERIFICATION_TOKEN_EXPIRATION_TIME;

    return { verificationToken, verificationExpiration };
  }
}

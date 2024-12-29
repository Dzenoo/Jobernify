import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Employer,
  EmployerDocument,
} from 'src/models/employers/schemas/employer.schema';
import {
  Seeker,
  SeekerDocument,
} from 'src/models/seekers/schemas/seeker.schema';
import { MailService } from 'src/common/email/mail.service';

import { Model } from 'mongoose';

import { uuidv7 } from 'uuidv7';
import { VERIFICATION_TOKEN_EXPIRATION_TIME } from 'src/common/constants';

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
    private readonly mailService: MailService,
  ) {}

  async verifyEmail(
    token: string,
    userType: 'seeker' | 'employer',
  ): Promise<any> {
    let user: SeekerDocument | EmployerDocument;

    if (userType === 'seeker') {
      user = await this.seekerModel.findOne({ verificationToken: token });
    } else if (userType === 'employer') {
      user = await this.employerModel.findOne({ verificationToken: token });
    }

    if (!user) {
      throw new ConflictException('Invalid token.');
    }

    if (user.verificationExpiration < new Date()) {
      throw new UnauthorizedException();
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
    const emailContent = `
                          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                            <h2 style="color: #333;">Jobernify - Verify your email</h2>
                            <p style="color: #555;">Please verify your email by clicking on this link: 
                            <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&type=${userType}" 
                            style="color: #1a73e8;">Verify Email</a></p>
                            <p style="color: #555;">This token expires in 24 hours, so please verify your account within this timeframe.</p>
                          </div>
                         `;

    await this.mailService.sendMail(
      email,
      'Jobernify - Verify your email',
      emailContent,
    );
  }

  create() {
    const verificationToken = uuidv7();
    const verificationExpiration =
      Date.now() + VERIFICATION_TOKEN_EXPIRATION_TIME;

    return { verificationToken, verificationExpiration };
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Seeker } from './schemas/seeker.schema';

import { Model } from 'mongoose';
import { SignupSeekerDto } from './dto/signup-seeker.dto';

import { VerificationService } from 'src/authentication/verification/verification.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';

@Injectable()
export class SeekersService {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly emailService: NodemailerService,
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
  ) {}

  async findOneByEmail(email: string, select?: string): Promise<Seeker> {
    return await this.seekerModel.findOne({ email: email }).select(select);
  }

  async createOne(body: SignupSeekerDto): Promise<void> {
    const existingSeeker = await this.findOneByEmail(body.email);

    if (existingSeeker) {
      const isEmailVerified = existingSeeker.emailVerified;

      const errorMessage = isEmailVerified
        ? 'An account with this email already exists.'
        : 'An account with this email already exists but is not verified. Please check your email for the verification link or request a new one.';

      throw isEmailVerified
        ? new ConflictException(errorMessage)
        : new NotAcceptableException(errorMessage);
    }

    const { verificationToken, verificationExpiration } =
      this.verificationService.create();

    const newSeeker = await this.seekerModel.create({
      ...body,
      verificationToken,
      verificationExpiration,
    });

    if (!newSeeker) {
      throw new InternalServerErrorException(
        'Cannot register account, please try again',
      );
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">Jobernify - Verify your email</h2>
        <p style="color: #555;">Please verify your email by clicking on this link: <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&type=seeker" style="color: #1a73e8;">Verify Email</a></p>
        <p style="color: #555;">This token expires in 24 hours, so please verify your account within this timeframe.</p>
      </div>
    `;

    await this.emailService.sendMail(
      newSeeker.email,
      'Jobernify - Verify your email',
      emailContent,
    );
  }
}

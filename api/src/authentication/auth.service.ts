import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';
import { VerificationService } from './verification/verification.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';

import * as bcrypt from 'bcrypt';

import { SignupSeekerDto } from 'src/models/seekers/dto/signup-seeker.dto';
import { SignUpEmployerDto } from 'src/models/employers/dto/signup-employer.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: NodemailerService,
    private readonly verificationService: VerificationService,
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user;

    user = await this.seekersService.findOneByEmail(email, '+password');

    if (!user) {
      user = await this.employersService.findOneByEmail(email, '+password');
    }

    if (!user) {
      throw new NotFoundException(
        'User not found. Please check your email and password.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Entered password is not valid!');
    }

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user._doc._id.toString(),
      email: user._doc.email,
      role: user._doc.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signupSeeker(body: SignupSeekerDto) {
    const existingEmployer = await this.employersService.findOneByEmail(
      body.email,
    );

    if (existingEmployer) {
      throw new ConflictException(
        'This email is already associated with one account',
      );
    }

    const existingSeeker = await this.seekersService.findOneByEmail(body.email);

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

    const newSeeker = await this.seekersService.createOne({
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

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Signup successful! Please verify your email.',
    };
  }

  async signupEmployer(body: SignUpEmployerDto) {
    const existingSeeker = await this.seekersService.findOneByEmail(body.email);

    if (existingSeeker) {
      throw new ConflictException(
        'This email is already associated with one account',
      );
    }

    const existingEmployer = await this.employersService.findOneByEmail(
      body.email,
    );

    if (existingEmployer) {
      const isEmailVerified = existingEmployer.emailVerified;

      const errorMessage = isEmailVerified
        ? 'An account with this email already exists.'
        : 'An account with this email already exists but is not verified. Please check your email for the verification link or request a new one.';

      throw isEmailVerified
        ? new ConflictException(errorMessage)
        : new NotAcceptableException(errorMessage);
    }

    const { verificationToken, verificationExpiration } =
      this.verificationService.create();

    const newEmployer = await this.employersService.createOne({
      ...body,
      verificationToken,
      verificationExpiration,
    });

    if (!newEmployer) {
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
      newEmployer.email,
      'Jobernify - Verify your email',
      emailContent,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Signup successful! Please verify your email.',
    };
  }
}

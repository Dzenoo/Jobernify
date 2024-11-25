import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { VerificationService } from './verification/verification.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';
import { JwtService } from '@nestjs/jwt';
import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';

import * as bcrypt from 'bcrypt';

import { SignupSeekerDto } from 'src/models/seekers/dto/signup-seeker.dto';
import { SignUpEmployerDto } from 'src/models/employers/dto/signup-employer.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly emailService: NodemailerService,
    private readonly jwtService: JwtService,
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
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
      role: user._doc.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user._doc.role,
    };
  }

  async signup(
    body: SignupSeekerDto | SignUpEmployerDto,
    userType: 'seeker' | 'employer',
  ) {
    const emailCheckResult = await this.checkEmailExistence(body.email);

    if (emailCheckResult) {
      const errorMessage = emailCheckResult.emailVerified
        ? 'An account with this email already exists.'
        : 'An account with this email already exists but is not verified. Please check your email for the verification link or request a new one.';

      throw emailCheckResult.emailVerified
        ? new ConflictException(errorMessage)
        : new NotAcceptableException(errorMessage);
    }

    const { verificationToken, verificationExpiration } =
      this.verificationService.create();

    let newUser;

    if (userType === 'seeker') {
      const seekerBody = {
        ...(body as SignupSeekerDto),
        verificationToken,
        verificationExpiration,
      };

      newUser = await this.seekersService.createOne(seekerBody);
    } else {
      const employerBody = {
        ...(body as SignUpEmployerDto),
        verificationToken,
        verificationExpiration,
      };

      newUser = await this.employersService.createOne(employerBody);
    }

    if (!newUser) {
      throw new InternalServerErrorException(
        'Cannot register account, please try again',
      );
    }

    await this.sendVerificationEmail(
      newUser.email,
      verificationToken,
      userType,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Signup successful! Please verify your email.',
    };
  }

  async signupSeeker(body: SignupSeekerDto) {
    return this.signup(body, 'seeker');
  }

  async signupEmployer(body: SignUpEmployerDto) {
    return this.signup(body, 'employer');
  }

  private async checkEmailExistence(email: string) {
    const existingSeeker = await this.seekersService.findOneByEmail(email);
    if (existingSeeker) {
      return {
        userType: 'seeker',
        emailVerified: existingSeeker.emailVerified,
      };
    }

    const existingEmployer = await this.employersService.findOneByEmail(email);
    if (existingEmployer) {
      return {
        userType: 'employer',
        emailVerified: existingEmployer.emailVerified,
      };
    }

    return null;
  }

  private async sendVerificationEmail(
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

    await this.emailService.sendMail(
      email,
      'Jobernify - Verify your email',
      emailContent,
    );
  }
}

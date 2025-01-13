import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SeekersService } from '@/models/seekers/seekers.service';
import { EmployersService } from '@/models/employers/employers.service';
import { JwtService } from '@nestjs/jwt';
import { VerificationService } from '@/authentication/services/verification.service';

import { SignupSeekerDto } from '@/authentication/dto/signup-seeker.dto';
import { SignUpEmployerDto } from '@/authentication/dto/signup-employer.dto';
import { getRedirectUrl } from '@/common/utils';

import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalAuthService {
  constructor(
    private seekersService: SeekersService,
    private employersService: EmployersService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
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

    if (user.isGoogleAccount && user.password === null) {
      throw new NotFoundException(
        'Your account is registered via Google. Please log in with Google.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Entered password is not valid!');
    }

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      // IMPORTANT: Do not return the password
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user._doc._id.toString(),
      role: user._doc.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    const redirectUrl = getRedirectUrl(payload.role);

    return { access_token, redirectUrl };
  }

  async signup(
    body: SignupSeekerDto | SignUpEmployerDto,
    userType: 'seeker' | 'employer',
  ) {
    const emailCheckResult = await this.checkEmailExistence(body.email);

    if (emailCheckResult) {
      if (emailCheckResult.emailVerified) {
        throw new ConflictException(
          `An account with this email already exists as a ${emailCheckResult.userType}.`,
        );
      } else {
        throw new NotAcceptableException(
          `An account with this email already exists as a ${emailCheckResult.userType} but is not verified. Please check your email for the verification link or request a new one.`,
        );
      }
    }

    const { verificationToken, verificationExpiration } =
      this.verificationService.create();

    let newUser;

    if (userType === 'seeker') {
      const seekerSignUpBody = body as SignupSeekerDto;

      const seekerBody = {
        ...seekerSignUpBody,
        verificationToken,
        verificationExpiration,
      };

      newUser = await this.seekersService.createOne(seekerBody);
    } else {
      const employerSignUpBody = body as SignUpEmployerDto;

      const employerBody = {
        ...employerSignUpBody,
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

    await this.verificationService.sendVerificationEmail(
      newUser.email,
      verificationToken,
      userType,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Signup successful! Please verify your email.',
    };
  }

  private async checkEmailExistence(email: string) {
    const existingSeeker = await this.seekersService.findOneByEmail(
      email,
      '+emailVerified',
    );
    if (existingSeeker) {
      return {
        userType: 'seeker',
        emailVerified: existingSeeker.emailVerified,
      };
    }

    const existingEmployer = await this.employersService.findOneByEmail(
      email,
      '+emailVerified',
    );
    if (existingEmployer) {
      return {
        userType: 'employer',
        emailVerified: existingEmployer.emailVerified,
      };
    }

    return null;
  }
}

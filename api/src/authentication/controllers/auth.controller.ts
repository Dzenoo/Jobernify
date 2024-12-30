import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { LocalAuthService } from '../services/local-auth.service';
import { GoogleAuthService } from '../services/google-auth.service';
import { TwoFactorAuthService } from '../services/two-factor-auth.service';
import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';

import { SignupSeekerDto } from 'src/models/seekers/dto/signup-seeker.dto';
import { SignUpEmployerDto } from 'src/models/employers/dto/signup-employer.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private localAuthService: LocalAuthService,
    private googleAuthService: GoogleAuthService,
    private twoFactorAuthService: TwoFactorAuthService,
    private seekersService: SeekersService,
    private employersService: EmployersService,
  ) {}

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  googleAuth(@Query('type') type?: 'seeker' | 'employer') {}

  @Get('/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Request() req: any,
    @Response() res: any,
    @Query('state') state: 'seeker' | 'employer',
  ) {
    try {
      if (state) {
        const result = await this.googleAuthService.googleSignup(req, state);
        return res.redirect(
          `${process.env.FRONTEND_URL}/auth/success?token=${result.access_token}&role=${result.role}`,
        );
      } else {
        const result = await this.googleAuthService.googleLogin(req);

        if (result.twoFactorRequired) {
          return res.redirect(
            `${process.env.FRONTEND_URL}/login/2fa?userId=${result.userId}&role=${result.role}`,
          );
        }

        return res.redirect(
          `${process.env.FRONTEND_URL}/auth/success?token=${result.access_token}&role=${result.role}`,
        );
      }
    } catch (error) {
      const message = encodeURIComponent(error.message);

      return res.redirect(
        `${process.env.FRONTEND_URL}/auth/error?error=${message}`,
      );
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    const user = req.user;

    const { isTwoFactorAuthEnabled } = user._doc;

    if (!isTwoFactorAuthEnabled) {
      return this.localAuthService.login(user);
    }

    return {
      message: '2FA code required',
      twoFactorRequired: true,
      userId: user._doc._id,
      role: user._doc.role,
    };
  }

  @Post('/2fa/login-verify')
  async verify2FALogin(
    @Body() body: { userId: string; role: 'seeker' | 'employer'; code: string },
  ) {
    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      body.userId,
      body.role,
      body.code,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    // If valid, fetch user from DB and generate final JWT
    let user;
    if (body.role === 'seeker') {
      user = await this.seekersService.findOneById(body.userId);
    } else {
      user = await this.employersService.findOneById(body.userId);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Use your existing localAuthService to generate the token
    return this.localAuthService.login(user);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/seekers-signup')
  async signupSeeker(@Body() body: SignupSeekerDto) {
    return this.localAuthService.signup(body, 'seeker');
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/employers-signup')
  async signupEmployer(@Body() body: SignUpEmployerDto) {
    return this.localAuthService.signup(body, 'employer');
  }
}

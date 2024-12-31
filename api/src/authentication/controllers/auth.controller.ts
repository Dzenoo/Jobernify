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
import { getRedirectUrl } from 'src/common/utils';

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

        res.cookie('access_token', result.access_token, {
          httpOnly: true,
          secure: false, // In production set to true
          sameSite: 'strict',
          maxAge: 3600000,
        });

        const redirectUrl = getRedirectUrl(result.role);
        return res.redirect(redirectUrl);
      } else {
        const result = await this.googleAuthService.googleLogin(req);

        if (result.twoFactorRequired) {
          return res.redirect(
            `${process.env.FRONTEND_URL}/login/2fa?userId=${result.userId}`,
          );
        }

        res.cookie('access_token', result.access_token, {
          httpOnly: true,
          secure: false, // In production set to true
          sameSite: 'strict',
          maxAge: 3600000,
        });

        const redirectUrl = getRedirectUrl(result.role as any);
        return res.redirect(redirectUrl);
      }
    } catch (error) {
      const message = encodeURIComponent(error.message);

      return res.redirect(
        `${process.env.FRONTEND_URL}/auth/error?error=${message}`,
      );
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Request() req, @Response() res) {
    const user = req.user;

    const { isTwoFactorAuthEnabled } = user._doc;

    if (!isTwoFactorAuthEnabled) {
      return this.localAuthService.login(user, res);
    }

    return {
      message: '2FA code required',
      twoFactorRequired: true,
      userId: user._doc._id,
      role: user._doc.role,
    };
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/2fa/login-verify')
  async verify2FALogin(
    @Response() res,
    @Body() body: { userId: string; code: string },
  ) {
    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      body.userId,
      body.code,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    let user;

    user = await this.seekersService.findOneById(body.userId);

    if (!user) {
      user = await this.employersService.findOneById(body.userId);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.localAuthService.login(user, res);
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

  @Post('/logout')
  async logout(@Response() res) {
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }
}

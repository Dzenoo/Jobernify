import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
import { cookieOptions } from 'src/common/constants';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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

        res.cookie('access_token', result.access_token, cookieOptions);

        const redirectUrl = getRedirectUrl(result.role);
        return res.redirect(redirectUrl);
      } else {
        const result = await this.googleAuthService.googleLogin(req);

        if (result.twoFactorRequired) {
          return res.redirect(
            `${process.env.FRONTEND_URL}/login/2fa?userId=${result.userId}`,
          );
        }

        res.cookie('access_token', result.access_token, cookieOptions);

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

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getCurrentUser(@Request() req) {
    if (!req.user) throw new UnauthorizedException('Unauthorized!');
    return { role: req.user.role };
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Request() req, @Response() res) {
    const user = req.user;

    const { _id, isTwoFactorAuthEnabled } = user._doc;

    if (!isTwoFactorAuthEnabled) {
      const { access_token, redirectUrl } =
        await this.localAuthService.login(user);

      res.cookie('access_token', access_token, cookieOptions);

      res
        .status(HttpStatus.OK)
        .send({ message: '2FA successful', redirectUrl });
    }

    res.status(HttpStatus.OK).send({
      message: '2FA code required',
      twoFactorRequired: true,
      userId: _id,
    });
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

    const { access_token, redirectUrl } =
      await this.localAuthService.login(user);

    res.cookie('access_token', access_token, cookieOptions);

    res.status(HttpStatus.OK).send({ message: '2FA successful', redirectUrl });
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
    console.log('Logout endpoint hit');
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });
    res.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  Res,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Request, Response } from 'express';

import { LocalAuthService } from '@/authentication/services/local-auth.service';
import { GoogleAuthService } from '@/authentication/services/google-auth.service';
import { TwoFactorAuthService } from '@/authentication/services/two-factor-auth.service';

import { LocalAuthGuard } from '@/authentication/guards/local-auth.guard';
import { GoogleOAuthGuard } from '@/authentication/guards/google-oauth.guard';
import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';

import { SeekersService } from '@/models/seekers/seekers.service';
import { EmployersService } from '@/models/employers/employers.service';
import { SignupSeekerDto } from '@/authentication/dto/signup-seeker.dto';
import { SignUpEmployerDto } from '@/authentication/dto/signup-employer.dto';
import { Seeker } from '@/models/seekers/schemas/seeker.schema';
import { Employer } from '@/models/employers/schemas/employer.schema';

import { getRedirectUrl } from '@/common/utils';
import { cookieOptions } from '@/common/constants';

import { TwoFactorVerifyDto } from '@/authentication/dto/two-factor.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly localAuthService: LocalAuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
  ) {}

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  googleAuth(@Query('type') type?: 'seeker' | 'employer') {}

  @Get('/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Query('state') state?: 'seeker' | 'employer',
  ) {
    try {
      let authResult;

      if (state) {
        authResult = await this.googleAuthService.googleSignup(req, state);
      } else {
        authResult = await this.googleAuthService.googleLogin(req);
      }

      if (authResult.twoFactorRequired) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login/2fa?userId=${authResult.userId}`,
        );
      }

      res.cookie('access_token', authResult.access_token, cookieOptions);
      const redirectUrl = getRedirectUrl(authResult.role);
      return res.redirect(redirectUrl);
    } catch (error) {
      const message = encodeURIComponent(error.message);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=${message}`);
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { _id, isTwoFactorAuthEnabled } = user._doc;

    if (isTwoFactorAuthEnabled) {
      return res.status(HttpStatus.OK).json({
        message: '2FA code required',
        twoFactorRequired: true,
        userId: _id,
      });
    }

    const { access_token, redirectUrl } =
      await this.localAuthService.login(user);

    res.cookie('access_token', access_token, cookieOptions);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Authentication successful', redirectUrl });
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/2fa/login-verify')
  async verify2FALogin(@Res() res: Response, @Body() body: TwoFactorVerifyDto) {
    const { userId, code } = body;

    const user = await this.findUserById(userId);
    if (!user || !user.isTwoFactorAuthEnabled) {
      throw new UnauthorizedException();
    }

    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      userId,
      code,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    const { access_token, redirectUrl } =
      await this.localAuthService.login(user);

    res.cookie('access_token', access_token, cookieOptions);

    return res
      .status(HttpStatus.OK)
      .json({ message: '2FA successful', redirectUrl });
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/seekers-signup')
  async signupSeeker(@Body() signupSeekerDto: SignupSeekerDto) {
    return this.localAuthService.signup(signupSeekerDto, 'seeker');
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/employers-signup')
  async signupEmployer(@Body() signUpEmployerDto: SignUpEmployerDto) {
    return this.localAuthService.signup(signUpEmployerDto, 'employer');
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      domain: '.jobernify.com',
    });
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getCurrentUser(@Req() req: Request) {
    const user = req.user;
    if (!user) throw new UnauthorizedException('Unauthorized!');
    return { role: user.role };
  }

  
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Get('/csrf-token')
  getCsrfToken(@Req() req: Request) {
    return { csrfToken: req.csrfToken() };
  }

  private async findUserById(
    userId: string,
  ): Promise<Seeker | Employer | null> {
    let user: Seeker | Employer | null =
      await this.seekersService.findOneById(userId);
    if (!user) {
      user = await this.employersService.findOneById(userId);
    }
    return user;
  }
}

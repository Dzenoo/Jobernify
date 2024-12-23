import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { LocalAuthService } from './services/local-auth.service';
import { GoogleAuthService } from './services/google-auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

import { SignupSeekerDto } from 'src/models/seekers/dto/signup-seeker.dto';
import { SignUpEmployerDto } from 'src/models/employers/dto/signup-employer.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private localAuthService: LocalAuthService,
    private googleAuthService: GoogleAuthService,
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
    return this.localAuthService.login(req.user);
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

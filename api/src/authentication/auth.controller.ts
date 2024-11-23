import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { GoogleAuthGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { SignupSeekerDto } from 'src/models/seekers/dto/signup-seeker.dto';
import { SignUpEmployerDto } from 'src/models/employers/dto/signup-employer.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Res() res) {
    // const response = await this.authService.login(req.user.id,
    //     userType as 'seeker' | 'employer',
    // );
    res.redirect(`http://localhost:3000`);
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/seekers-signup')
  async signUpSeekers(@Body() body: SignupSeekerDto) {
    return this.authService.signupSeeker(body);
  }

  @Post('/employers-signup')
  async signUpEmployers(@Body() body: SignUpEmployerDto) {
    return this.authService.signupEmployer(body);
  }
}

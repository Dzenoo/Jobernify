import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';

import { SignupSeekerDto } from 'src/models/seekers/dto/signup-seeker.dto';
import { SignUpEmployerDto } from 'src/models/employers/dto/signup-employer.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/seekers-signup')
  async signupSeeker(@Body() body: SignupSeekerDto) {
    return this.authService.signupSeeker(body);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('/employers-signup')
  async signupEmployer(@Body() body: SignUpEmployerDto) {
    return this.authService.signupEmployer(body);
  }
}

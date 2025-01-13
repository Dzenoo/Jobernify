import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { LocalAuthService } from '@/authentication/services/local-auth.service';
import { sanitizeInput } from '@/common/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localAuthService: LocalAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.localAuthService.validateUser(
      sanitizeInput(email),
      sanitizeInput(password),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

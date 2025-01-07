import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

const cookieExtractor = (req: any): string | null => {
  return req?.cookies?.access_token || null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, role: payload.role };
  }
}

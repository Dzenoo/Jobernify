import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerificationModule } from '@/authentication/modules/verification.module';
import { PassportModule } from '@nestjs/passport';
import { SeekersModule } from '@/models/seekers/seekers.module';
import { EmployersModule } from '@/models/employers/employers.module';

import { BlockedDomainsService } from '@/common/services/blocked-domains.service';
import { LocalAuthService } from '@/authentication/services/local-auth.service';
import { GoogleAuthService } from '@/authentication/services/google-auth.service';
import { TwoFactorAuthService } from '@/authentication/services/two-factor-auth.service';
import { LocalStrategy } from '@/authentication/strategies/local.strategy';
import { JwtStrategy } from '@/authentication/strategies/jwt.strategy';
import { GoogleStrategy } from '@/authentication/strategies/google.strategy';

import { AuthController } from '@/authentication/controllers/auth.controller';
import { TwoFactorAuthController } from '@/authentication/controllers/two-factor-auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h', algorithm: 'HS256' },
      }),
    }),
    VerificationModule,
    PassportModule,
    SeekersModule,
    EmployersModule,
  ],
  providers: [
    LocalAuthService,
    GoogleAuthService,
    TwoFactorAuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    BlockedDomainsService,
  ],
  controllers: [AuthController, TwoFactorAuthController],
})
export class AuthModule {}

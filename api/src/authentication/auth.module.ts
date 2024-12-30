import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerificationModule } from './verification/verification.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SeekersModule } from 'src/models/seekers/seekers.module';
import { EmployersModule } from 'src/models/employers/employers.module';

import { AuthController } from './auth.controller';
import { TwoFactorAuthController } from './2fa/2fa.controller';

import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwoFactorAuthService } from './2fa/2fa.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthService } from './services/local-auth.service';
import { GoogleAuthService } from './services/google-auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
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
  ],
  controllers: [AuthController, TwoFactorAuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerificationModule } from './modules/verification.module';
import { PassportModule } from '@nestjs/passport';
import { SeekersModule } from 'src/models/seekers/seekers.module';
import { EmployersModule } from 'src/models/employers/employers.module';

import { LocalAuthService } from './services/local-auth.service';
import { GoogleAuthService } from './services/google-auth.service';
import { TwoFactorAuthService } from './services/two-factor-auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

import { AuthController } from './controllers/auth.controller';
import { TwoFactorAuthController } from './controllers/two-factor-auth.controller';

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

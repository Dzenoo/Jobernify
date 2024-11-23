import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerificationModule } from './verification/verification.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { NodemailerModule } from 'src/common/email/nodemailer.module';
import { SeekersModule } from 'src/models/seekers/seekers.module';
import { EmployersModule } from 'src/models/employers/employers.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

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
    NodemailerModule,
    SeekersModule,
    EmployersModule,
  ],
  providers: [AuthService, GoogleStrategy, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

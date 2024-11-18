import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VerificationService } from '../shared/services/verification.service';
import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';
import { BcryptModule } from 'src/common/shared/bcrypt/bcrypt.module';
import { AuthService } from '../shared/auth/auth.service';
import { AuthModule } from '../shared/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
    BcryptModule,
    AuthModule,
  ],
  controllers: [SeekersController],
  providers: [SeekersService, VerificationService, AuthService],
  exports: [MongooseModule],
})
export class SeekersModule {}

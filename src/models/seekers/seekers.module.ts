import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';
import { BcryptModule } from 'src/common/bcrypt/bcrypt.module';
import { AuthModule } from '../shared/auth/auth.module';
import { VerificationModule } from '../shared/verification/verification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
    BcryptModule,
    AuthModule,
    VerificationModule,
  ],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports: [MongooseModule],
})
export class SeekersModule {}

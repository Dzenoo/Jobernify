import { Module } from '@nestjs/common';

import { NodemailerModule } from 'src/common/email/nodemailer.module';
import { VerificationModule } from '../../authentication/verification/verification.module';
import { MongooseModule } from '@nestjs/mongoose';

import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';

@Module({
  imports: [
    NodemailerModule,
    VerificationModule,
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
  ],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports: [SeekersService, MongooseModule],
})
export class SeekersModule {}

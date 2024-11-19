import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { VerificationModule } from '../../authentication/verification/verification.module';

import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
    VerificationModule,
  ],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports: [SeekersService, MongooseModule],
})
export class SeekersModule {}

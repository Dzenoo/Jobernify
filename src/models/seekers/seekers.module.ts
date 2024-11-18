import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VerificationService } from '../shared/services/VerificationService';
import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';
import { BcryptModule } from 'src/common/shared/bcrypt/bcrypt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
    BcryptModule,
  ],
  controllers: [SeekersController],
  providers: [SeekersService, VerificationService],
  exports: [MongooseModule],
})
export class SeekersModule {}

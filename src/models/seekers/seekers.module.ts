import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
  ],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports: [MongooseModule],
})
export class SeekersModule {}

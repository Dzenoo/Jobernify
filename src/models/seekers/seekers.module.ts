import { Module } from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';

@Module({
  controllers: [SeekersController],
  providers: [SeekersService],
})
export class SeekersModule {}

import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schemas/job.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [MongooseModule],
})
export class JobsModule {}

import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { NodemailerModule } from 'src/common/email/nodemailer.module';
import { AiModule } from 'src/ai/ai.module';
import { SeekersModule } from '../seekers/seekers.module';
import { EmployersModule } from '../employers/employers.module';
import { ApplicationsModule } from '../applications/applications.module';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    NodemailerModule,
    AiModule,
    forwardRef(() => SeekersModule),
    forwardRef(() => EmployersModule),
    forwardRef(() => ApplicationsModule),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService, MongooseModule],
})
export class JobsModule {}

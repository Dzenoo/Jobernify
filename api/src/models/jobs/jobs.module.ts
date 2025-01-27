import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '@/common/modules/email/mail.module';
import { AiModule } from '@/ai/ai.module';
import { SeekersModule } from '@/models/seekers/seekers.module';
import { EmployersModule } from '@/models/employers/employers.module';
import { ApplicationsModule } from '@/models/applications/applications.module';

import { JobsService } from '@/models/jobs/jobs.service';
import { JobsController } from '@/models/jobs/jobs.controller';
import { Job, JobSchema } from '@/models/jobs/schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    MailModule,
    forwardRef(() => AiModule),
    forwardRef(() => SeekersModule),
    forwardRef(() => EmployersModule),
    forwardRef(() => ApplicationsModule),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService, MongooseModule],
})
export class JobsModule {}

import { forwardRef, Module } from '@nestjs/common';

import { S3Module } from '@/common/modules/s3/s3.module';
import { MailModule } from '@/common/modules/email/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeekersModule } from '@/models/seekers/seekers.module';
import { JobsModule } from '@/models/jobs/jobs.module';

import { ApplicationsService } from '@/models/applications/applications.service';
import { ApplicationsController } from '@/models/applications/applications.controller';
import {
  Application,
  ApplicationSchema,
} from '@/models/applications/schemas/application.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    S3Module,
    MailModule,
    forwardRef(() => SeekersModule),
    forwardRef(() => JobsModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService, MongooseModule],
})
export class ApplicationsModule {}

import { forwardRef, Module } from '@nestjs/common';

import { S3Module } from 'src/common/s3/s3.module';
import { MailModule } from 'src/common/email/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeekersModule } from '../seekers/seekers.module';
import { JobsModule } from '../jobs/jobs.module';

import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application, ApplicationSchema } from './schemas/application.schema';

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

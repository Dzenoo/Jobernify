import { forwardRef, Module } from '@nestjs/common';

import { S3Module } from 'src/common/s3/s3.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeekersModule } from '../seekers/seekers.module';
import { EmployersModule } from '../employers/employers.module';
import { JobsModule } from '../jobs/jobs.module';

import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application, ApplicationSchema } from './schemas/application.schema';

@Module({
  imports: [
    S3Module,
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    forwardRef(() => SeekersModule),
    forwardRef(() => EmployersModule),
    forwardRef(() => JobsModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService, MongooseModule],
})
export class ApplicationsModule {}

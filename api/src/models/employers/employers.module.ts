import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from '@/common/s3/s3.module';
import { SeekersModule } from '@/models/seekers/seekers.module';
import { JobsModule } from '@/models/jobs/jobs.module';
import { ApplicationsModule } from '@/models/applications/applications.module';
import { VerificationModule } from '@/authentication/modules/verification.module';

import { EmployersService } from '@/models/employers/employers.service';
import { EmployersController } from '@/models/employers/employers.controller';
import {
  Employer,
  EmployerSchema,
} from '@/models/employers/schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    S3Module,
    ApplicationsModule,
    forwardRef(() => SeekersModule),
    forwardRef(() => JobsModule),
    forwardRef(() => VerificationModule),
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService, MongooseModule],
})
export class EmployersModule {}

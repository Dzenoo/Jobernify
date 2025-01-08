import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from '@/common/s3/s3.module';
import { EmployersModule } from '@/models/employers/employers.module';
import { JobsModule } from '@/models/jobs/jobs.module';
import { ApplicationsModule } from '@/models/applications/applications.module';
import { VerificationModule } from '@/authentication/modules/verification.module';

import { SeekersService } from '@/models/seekers/seekers.service';
import { SeekersController } from '@/models/seekers/seekers.controller';
import { Seeker, SeekerSchema } from '@/models/seekers/schemas/seeker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
    S3Module,
    forwardRef(() => EmployersModule),
    forwardRef(() => JobsModule),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => VerificationModule),
  ],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports: [SeekersService, MongooseModule],
})
export class SeekersModule {}

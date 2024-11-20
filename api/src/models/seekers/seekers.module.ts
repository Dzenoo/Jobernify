import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from 'src/common/s3/s3.module';
import { VerificationModule } from 'src/authentication/verification/verification.module';
import { NodemailerModule } from 'src/common/email/nodemailer.module';
import { EmployersModule } from '../employers/employers.module';
import { JobsModule } from '../jobs/jobs.module';
import { ApplicationsModule } from '../applications/applications.module';
import { ReviewsModule } from '../reviews/reviews.module';

import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { Seeker, SeekerSchema } from './schemas/seeker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seeker.name, schema: SeekerSchema }]),
    S3Module,
    VerificationModule,
    NodemailerModule,
    forwardRef(() => EmployersModule),
    forwardRef(() => JobsModule),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => ReviewsModule),
  ],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports: [SeekersService, MongooseModule],
})
export class SeekersModule {}

import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { VerificationModule } from '../../authentication/verification/verification.module';
import { S3Module } from 'src/common/s3/s3.module';
import { SeekersModule } from '../seekers/seekers.module';
import { JobsModule } from '../jobs/jobs.module';
import { ApplicationsModule } from '../applications/applications.module';

import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { Employer, EmployerSchema } from './schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    VerificationModule,
    S3Module,
    ApplicationsModule,
    forwardRef(() => SeekersModule),
    forwardRef(() => JobsModule),
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService, MongooseModule],
})
export class EmployersModule {}

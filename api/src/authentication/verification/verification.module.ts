import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { NodemailerModule } from 'src/common/email/nodemailer.module';

import { VerificationService } from './verification.service';

import { Seeker, SeekerSchema } from 'src/models/seekers/schemas/seeker.schema';
import {
  Employer,
  EmployerSchema,
} from 'src/models/employers/schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seeker.name, schema: SeekerSchema },
      { name: Employer.name, schema: EmployerSchema },
    ]),
    NodemailerModule,
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}

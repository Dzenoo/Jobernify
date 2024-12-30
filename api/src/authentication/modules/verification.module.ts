import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/common/email/mail.module';

import { VerificationService } from '../services/verification.service';

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
    MailModule,
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}

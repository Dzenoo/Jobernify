import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seeker, SeekerSchema } from 'src/models/seekers/schemas/seeker.schema';
import {
  Employer,
  EmployerSchema,
} from 'src/models/employers/schemas/employer.schema';
import { VerificationService } from './verification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seeker.name, schema: SeekerSchema },
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}

import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { VerificationModule } from '../../authentication/verification/verification.module';

import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { Employer, EmployerSchema } from './schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    VerificationModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService, MongooseModule],
})
export class EmployersModule {}

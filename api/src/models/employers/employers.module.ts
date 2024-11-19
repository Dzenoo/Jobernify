import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { VerificationModule } from '../../authentication/verification/verification.module';

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

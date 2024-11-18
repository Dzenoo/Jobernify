import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { VerificationService } from '../shared/services/VerificationService';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { BcryptModule } from 'src/common/shared/bcrypt/bcrypt.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    BcryptModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService, VerificationService],
  exports: [MongooseModule],
})
export class EmployersModule {}

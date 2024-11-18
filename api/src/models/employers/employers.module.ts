import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { AuthModule } from '../../authentication/auth.module';
import { VerificationModule } from '../../authentication/verification/verification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    AuthModule,
    VerificationModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [MongooseModule],
})
export class EmployersModule {}

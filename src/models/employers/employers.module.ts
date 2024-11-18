import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { BcryptModule } from 'src/common/bcrypt/bcrypt.module';
import { AuthModule } from '../shared/auth/auth.module';
import { VerificationModule } from '../shared/verification/verification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    BcryptModule,
    AuthModule,
    VerificationModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [MongooseModule],
})
export class EmployersModule {}

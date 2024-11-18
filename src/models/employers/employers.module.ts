import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { VerificationService } from '../shared/services/verification.service';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { BcryptModule } from 'src/common/shared/bcrypt/bcrypt.module';
import { AuthService } from '../shared/auth/auth.service';
import { AuthModule } from '../shared/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
    BcryptModule,
    AuthModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService, VerificationService, AuthService],
  exports: [MongooseModule],
})
export class EmployersModule {}

import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [MongooseModule],
})
export class EmployersModule {}

import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';

@Module({
  controllers: [EmployersController],
  providers: [EmployersService],
})
export class EmployersModule {}

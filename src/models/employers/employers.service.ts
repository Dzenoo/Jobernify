import { Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { BcryptService } from 'src/common/shared/bcrypt/bcrypt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Employer } from './schemas/employer.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
    private readonly bcryptService: BcryptService,
  ) {}

  create(createEmployerDto: CreateEmployerDto) {
    return 'This action adds a new employer';
  }

  findAll() {
    return `This action returns all employers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employer`;
  }

  update(id: number, updateEmployerDto: UpdateEmployerDto) {
    return `This action updates a #${id} employer`;
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }
}

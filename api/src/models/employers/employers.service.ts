import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Employer } from './schemas/employer.schema';

import { Model } from 'mongoose';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}

  async findOneByEmail(email: string): Promise<any> {
    return await this.employerModel.findOne({ email: email });
  }
}

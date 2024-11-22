import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Employer } from './schemas/employer.schema';

import { Model, UpdateQuery } from 'mongoose';

import { SignUpEmployerDto } from './dto/signup-employer.dto';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}

  async createOne(body: SignUpEmployerDto & Record<string, any>): Promise<any> {
    return await this.employerModel.create(body);
  }

  async findOneById(id: string, select?: string): Promise<Employer> {
    return await this.employerModel.findById(id).select(select);
  }

  async findOneByEmail(email: string, select?: string): Promise<Employer> {
    return await this.employerModel.findOne({ email: email }).select(select);
  }

  async findOneByIdAndUpdate(
    id: string,
    update: UpdateQuery<Employer> = {},
  ): Promise<void> {
    if (Object.keys(update).length === 0) {
      throw new Error('At least one update criterion must be provided.');
    }

    await this.employerModel.findByIdAndUpdate(id, update).exec();
  }
}

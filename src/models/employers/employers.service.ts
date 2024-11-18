import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employer } from './schemas/employer.schema';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}
}

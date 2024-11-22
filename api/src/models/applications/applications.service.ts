import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Application } from './schemas/application.schema';

import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  async findAndDeleteMany(query: FilterQuery<Application> = {}) {
    return await this.applicationModel.deleteMany(query).exec();
  }

  async find(query: FilterQuery<Application> = {}) {
    return await this.applicationModel.find(query).exec();
  }
}

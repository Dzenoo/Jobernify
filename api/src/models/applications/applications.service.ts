import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Application } from './schemas/application.schema';

import { Model } from 'mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}
}

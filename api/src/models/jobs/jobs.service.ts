import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Job } from './schemas/job.schema';

import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private readonly jobModel: Model<Job>) {}
}

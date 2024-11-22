import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Job } from './schemas/job.schema';

import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private readonly jobModel: Model<Job>) {}

  async aggregate(pipeline: any): Promise<any[]> {
    return await this.jobModel.aggregate(pipeline).exec();
  }
}

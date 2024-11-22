import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Job } from './schemas/job.schema';

import { Model } from 'mongoose';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetJobsDto } from './dto/get-jobs.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private readonly jobModel: Model<Job>) {}

  async aggregate(pipeline: any): Promise<any[]> {
    return await this.jobModel.aggregate(pipeline).exec();
  }

  async createOne(
    body: CreateJobDto,
    employerId: string,
  ): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully Created Job!',
    };
  }

  async editOne(
    id: string,
    body: UpdateJobDto,
    employerId: string,
  ): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully edited',
    };
  }

  async deleteOne(id: string, employerId: string): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Job Deleted Successfully',
    };
  }

  async saveOne(id: string, seekerId: string): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
      message: 'The job has been successfully added to your saved list.',
    };
  }

  async getOneById(id: string): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }

  async getAll(query: GetJobsDto): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }
}

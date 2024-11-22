import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Employer } from './schemas/employer.schema';

import { Model, UpdateQuery } from 'mongoose';

import { SignUpEmployerDto } from './dto/signup-employer.dto';
import { throwError } from 'rxjs';

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

  async getOne({
    page = 1,
    limit = 10,
    type = '',
    search = '',
    sort = '',
    id,
  }: {
    page?: number;
    limit?: number;
    type?: string;
    search?: string;
    sort?: string;
    id: string;
  }): Promise<any> {
    const skip = (page - 1) * limit;
    const sorter = sort === 'desc' ? -1 : 1;

    let populateQuery: any = {};
    switch (type) {
      case 'jobs':
        populateQuery = {
          path: 'jobs',
          options: {
            skip,
            limit: limit,
            sort: { _id: sorter },
          },
          select:
            'title position _id location level type applications expiration_date salary',
        };
        break;
      case 'reviews':
        populateQuery = {
          path: 'reviews',
          options: {
            skip,
            limit: limit,
            sort: { _id: sorter },
          },
        };
        break;
      default:
        break;
    }

    let searchQuery = {};
    if (search) {
      const searchFields: string[] = [];
      switch (type) {
        case 'jobs':
          searchFields.push('title', 'position', 'location');
          break;
        case 'reviews':
          searchFields.push('type');
          break;

        default:
          break;
      }

      const searchConditions = searchFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      }));
      searchQuery = { $or: searchConditions };
    }

    let employer: Employer;
    if (type && populateQuery.path) {
      employer = await this.employerModel
        .findById(id)
        .populate({
          ...populateQuery,
          match: searchQuery,
        })
        .exec();
    } else {
      employer = await this.employerModel.findById(id).exec();
    }

    if (!employer) {
      throw new NotFoundException();
    }

    // const counts: any = {};
    // if (type === 'jobs' || !type) {
    //   counts.totalJobs = await this.jobService.countDocuments({
    //     company: id,
    //     ...searchQuery,
    //   });
    // }
    // if (type === 'reviews' || !type) {
    //   counts.totalReviews = await this.reviewService.countDocuments({
    //     company: id,
    //     ...searchQuery,
    //   });
    // }

    return {
      employer,
      // counts,
    };
  }
}

import {
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { JobDocument } from '../jobs/schemas/job.schema';
import { Employer } from './schemas/employer.schema';

import { Model, UpdateQuery } from 'mongoose';

import { SignUpEmployerDto } from './dto/signup-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

import { S3Service } from 'src/common/s3/s3.service';
import { SeekersService } from '../seekers/seekers.service';
import { JobsService } from '../jobs/jobs.service';
import { ReviewsService } from '../reviews/reviews.service';

import { uuidv7 } from 'uuidv7';

@Injectable()
export class EmployersService {
  constructor(
    private readonly jobsService: JobsService,
    private readonly seekersService: SeekersService,
    private readonly reviewsService: ReviewsService,
    private readonly s3Service: S3Service,
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

  async editOne(
    id: string,
    updatedData: UpdateEmployerDto,
    image?: Express.Multer.File,
  ): Promise<any> {
    if (image) {
      const currentEmployer = await this.employerModel.findById(id);

      if (currentEmployer) {
        if (currentEmployer.image.includes('employers')) {
          await this.s3Service.deleteFile(
            currentEmployer.image.split('/')[1],
            'employers',
          );
        }

        const result = uuidv7();
        const imageKey = `employer_${result}.png`;
        await this.s3Service.uploadFile(image, imageKey, 'employers');

        updatedData.image = `employers/${imageKey}`;
      }
    }

    const updatedEmployer = await this.employerModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedEmployer) {
      throw new NotAcceptableException(
        'We cannot update your profile right now. Please try again later.',
      );
    }

    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Successfully edited profile',
    };
  }

  async deleteOne(id: string): Promise<any> {
    const employer = await this.employerModel.findById(id);

    const jobIds = (employer.jobs || []).map((job: JobDocument) => job._id);

    if (!employer) {
      throw new NotFoundException(
        "We couldn't find the employer's profile. Please check the ID and try again.",
      );
    }

    // await this.jobsService.deleteMany({ company: id });

    // await this.reviewsService.deleteMany({ company: id });

    // await this.seekersService.updateMany(
    //   {
    //     $or: [{ following: id }, { savedJobs: { $in: jobIds } }],
    //   },
    //   {
    //     $pull: {
    //       following: id,
    //       savedJobs: { $in: jobIds },
    //     },
    //   },
    // );

    if (employer.image.includes('employers')) {
      await this.s3Service.deleteFile(
        employer.image.split('/')[1],
        'employers',
      );
    }

    await this.employerModel.findByIdAndDelete(id);

    return {
      statusCode: HttpStatus.ACCEPTED,
      message:
        'Your profile and all associated data have been successfully deleted.',
    };
  }
}

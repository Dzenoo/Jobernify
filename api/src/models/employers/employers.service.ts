import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { JobDocument } from '../jobs/schemas/job.schema';
import { Employer } from './schemas/employer.schema';

import { Model, UpdateQuery } from 'mongoose';
import mongoose from 'mongoose';

import { SignUpEmployerDto } from './dto/signup-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

import { SeekersService } from '../seekers/seekers.service';
import { JobsService } from '../jobs/jobs.service';
import { S3Service } from 'src/common/s3/s3.service';
import { ReviewsService } from '../reviews/reviews.service';
import { ApplicationsService } from '../applications/applications.service';

import { uuidv7 } from 'uuidv7';

@Injectable()
export class EmployersService {
  constructor(
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    private readonly s3Service: S3Service,
    private readonly jobsService: JobsService,
    private readonly applicationsService: ApplicationsService,
    private readonly reviewsService: ReviewsService,
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}

  async createOne(
    body: SignUpEmployerDto & Record<string, any>,
  ): Promise<Employer> {
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
  }): Promise<ResponseObject> {
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
      statusCode: HttpStatus.ACCEPTED,
      employer,
      // counts,
    };
  }

  async editOne(
    id: string,
    updatedData: UpdateEmployerDto,
    image?: Express.Multer.File,
  ): Promise<ResponseObject> {
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

  async deleteOne(id: string): Promise<ResponseObject> {
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

  async getOneById({
    page = 1,
    limit = 10,
    type = 'jobs',
    id,
  }: {
    page?: number;
    limit?: number;
    type?: 'jobs' | 'reviews';
    id: string;
  }): Promise<ResponseObject> {
    const skip = (page - 1) * limit;

    let populateQuery: any;
    switch (type) {
      case 'jobs':
        populateQuery = {
          path: 'jobs',
          options: { skip, limit },
          select:
            'title position _id location level applications expiration_date createdAt overview',
          populate: {
            path: 'company',
            select: '_id image name',
          },
        };
        break;
      case 'reviews':
        populateQuery = {
          path: 'reviews',
          options: { skip, limit },
        };
        break;
      default:
        populateQuery = {};
    }

    const employer = await this.employerModel
      .findById(id)
      .populate(populateQuery)
      .select(
        'name reviews address size website followers number company_description industry image jobs',
      )
      .exec();

    if (!employer) {
      throw new NotFoundException(
        "We couldn't find the employer with the specified ID. Please try again later.",
      );
    }

    // const totalJobs = await this.jobsService.countDocuments({ company: id });
    // const totalReviews = await this.reviewsService.countDocuments({
    //   company: id,
    // });

    return {
      statusCode: HttpStatus.OK,
      employer,
      // totalJobs,
      // totalReviews
    };
  }

  async getMany({
    page = 1,
    limit = 10,
    search = '',
    sort = '',
    industry = '',
    size = '',
    location = '',
  }: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    industry?: string;
    size?: string;
    location?: string;
  }): Promise<ResponseObject> {
    const conditions: any = {};

    if (search) {
      const regex = new RegExp(String(search), 'i');

      conditions.$or = [
        { name: { $regex: regex } },
        { address: { $regex: regex } },
        { company_description: { $regex: regex } },
      ];
    }

    const sortOptions: any = {};

    if (sort) {
      if (sort === 'followers' || sort === 'reviews') {
        sortOptions[sort] = -1;
      }
    }

    if (industry) {
      conditions.industry = industry;
    }

    if (size) {
      conditions.size = size;
    }

    if (location) {
      conditions.address = location;
    }

    const employers = await this.employerModel
      .find(conditions)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('image name company_description reviews followers size address')
      .exec();

    const totalEmployers = await this.employerModel.countDocuments(conditions);

    if (!employers) {
      throw new NotFoundException(
        "We couldn't find any employers matching your criteria. Please try again later.",
      );
    }

    return { statusCode: HttpStatus.OK, employers, totalEmployers };
  }

  async getAnalytics(id: string): Promise<ResponseObject> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // const totalJobs = await this.jobsService.countDocuments({ company: id });
    // const totalReviews = await this.reviewsService.countDocuments({
    //   company: id,
    // });
    // const totalApplications = await this.applicationsService.countDocuments({
    //   job: {
    //     $in: await this.jobsService.find({ company: id }).distinct('_id'),
    //   },
    // });
    // const totalFollowers = (
    //   await this.employerModel.findById(id).select('followers')
    // ).followers.length;

    // const jobsThisMonth = await this.jobsService.countDocuments({
    //   company: id,
    //   createdAt: { $gte: startOfMonth },
    // });

    // const reviewsThisMonth = await this.reviewsService.countDocuments({
    //   company: id,
    //   createdAt: { $gte: startOfMonth },
    // });

    // const applicationsThisMonth = await this.applicationsService.countDocuments(
    //   {
    //     job: {
    //       $in: await this.jobsService.find({ company: id }).distinct('_id'),
    //     },
    //     createdAt: { $gte: startOfMonth },
    //   },
    // );

    // const employerWithFollowers = await this.employerModel
    //   .findById(id)
    //   .select('followers')
    //   .populate('followers', 'createdAt');

    // const followersThisMonth = employerWithFollowers.followers.filter(
    //   (follower: any) => {
    //     const followerCreatedAt = follower.createdAt;
    //     return (
    //       followerCreatedAt >= startOfMonth && followerCreatedAt < new Date()
    //     );
    //   },
    // ).length;

    const jobsPerMonth = await this.getJobsPerMonth(id);
    const followersOverTime = await this.getFollowersOverTime(id);
    const jobTypes = await this.getJobTypes(id);

    return {
      statusCode: HttpStatus.OK,
      // totalJobs,
      // totalReviews,
      // totalApplications,
      // totalFollowers,
      jobsPerMonth,
      followersOverTime,
      jobTypes,
      // jobsThisMonth,
      // reviewsThisMonth,
      // applicationsThisMonth,
      // followersThisMonth,
    };
  }

  private async getJobsPerMonth(id: string): Promise<any[]> {
    const objectIdEmployerId = new mongoose.Types.ObjectId(id);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const jobs = await this.jobsService.aggregate([
      {
        $match: {
          company: objectIdEmployerId,
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const jobsPerMonth = Array.from({ length: 6 }, (_, index) => {
      const month = ((sixMonthsAgo.getMonth() + index) % 12) + 1;
      const job = jobs.find((job) => job._id === month);
      return job ? job.count : 0;
    });

    return jobsPerMonth;
  }

  private async getFollowersOverTime(id: string): Promise<number[]> {
    const objectIdEmployerId = new mongoose.Types.ObjectId(id);

    const employer = await this.employerModel
      .findById(objectIdEmployerId)
      .populate('followers');

    const followers = employer.followers;

    const followersOverTime = Array.from({ length: 6 }, (_, index) => {
      const month = new Date().getMonth() - index + 1;
      return followers.filter((follower: any) => {
        return new Date(follower.createdAt).getMonth() + 1 === month;
      }).length;
    }).reverse();

    return followersOverTime;
  }

  private async getJobTypes(id: string): Promise<
    {
      label: any;
      value: any;
    }[]
  > {
    const objectIdEmployerId = new mongoose.Types.ObjectId(id);

    const jobTypes = await this.jobsService.aggregate([
      { $match: { company: objectIdEmployerId } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    return jobTypes.map((jobType) => ({
      label: jobType._id,
      value: jobType.count,
    }));
  }
}

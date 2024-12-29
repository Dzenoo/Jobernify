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

import {
  DeleteResult,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import mongoose from 'mongoose';

import { UpdateEmployerDto } from './dto/update-employer.dto';

import { SeekersService } from '../seekers/seekers.service';
import { JobsService } from '../jobs/jobs.service';
import { S3Service } from 'src/common/s3/s3.service';
import { ApplicationsService } from '../applications/applications.service';

import { uuidv7 } from 'uuidv7';

@Injectable()
export class EmployersService {
  constructor(
    private readonly s3Service: S3Service,
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}

  async findAndUpdateMany(
    query: FilterQuery<Employer> = {},
    update: UpdateQuery<Employer> = {},
  ): Promise<UpdateWriteOpResult> {
    return await this.employerModel.updateMany(query, update).exec();
  }

  async findOneByIdAndUpdate(
    id: string,
    update: UpdateQuery<Employer> = {},
  ): Promise<void> {
    await this.employerModel.findByIdAndUpdate(id, update).exec();
  }

  async findAndDeleteMany(
    query: FilterQuery<Employer> = {},
  ): Promise<DeleteResult> {
    return await this.employerModel.deleteMany(query).exec();
  }

  async findOneById(id: string, select?: string): Promise<Employer> {
    return await this.employerModel.findById(id).select(select);
  }

  async findOneByEmail(email: string, select?: string): Promise<Employer> {
    return await this.employerModel.findOne({ email: email }).select(select);
  }

  async createOne(body: Record<string, any>): Promise<Employer> {
    return await this.employerModel.create(body);
  }

  async getOne({
    page = 1,
    limit = 10,
    type = '',
    search = '',
    sort = '',
    id,
  }: {
    page: number;
    limit: number;
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
        .select('-email')
        .exec();
    } else {
      employer = await this.employerModel.findById(id).select('-email').exec();
    }

    if (!employer) {
      throw new NotFoundException();
    }

    const counts: any = {};
    if (type === 'jobs' || !type) {
      counts.totalJobs = await this.jobsService.countDocuments({
        employer: id,
        ...searchQuery,
      });
    }

    return {
      statusCode: HttpStatus.ACCEPTED,
      employer,
      counts,
    };
  }

  async editOne(
    id: string,
    updatedData: UpdateEmployerDto,
    image?: Express.Multer.File,
  ): Promise<ResponseObject> {
    const employer = await this.employerModel.findById(id);

    if (!employer) {
      throw new NotFoundException();
    }

    if (!employer.isApproved) {
      throw new NotAcceptableException(
        'Your account has not been approved yet. Please try again later.',
      );
    }

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

    await this.jobsService.findAndDeleteMany({ employer: id });

    await this.seekersService.findAndUpdateMany(
      {
        $or: [{ following: id }, { savedJobs: { $in: jobIds } }],
      },
      {
        $pull: {
          following: id,
          savedJobs: { $in: jobIds },
        },
      },
    );

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
    page: number;
    limit: number;
    type?: 'jobs';
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
            'title position employer _id location level applications expiration_date createdAt overview',
          populate: {
            path: 'employer',
            select: '_id image name',
          },
        };
        break;
      default:
        populateQuery = {};
    }

    const employer = await this.employerModel
      .findById(id)
      .populate(populateQuery)
      .select(
        'name address size website followers number companyDescription industry image jobs',
      )
      .exec();

    if (!employer) {
      throw new NotFoundException(
        "We couldn't find the employer with the specified ID. Please try again later.",
      );
    }

    const totalJobs = await this.jobsService.countDocuments({ employer: id });

    return {
      statusCode: HttpStatus.OK,
      employer,
      totalJobs,
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
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    industry?: string;
    size?: string;
    location?: string;
  }): Promise<ResponseObject> {
    const conditions: any = {
      isApproved: true,
      emailVerified: true,
    };

    if (search) {
      const regex = new RegExp(String(search), 'i');

      conditions.$or = [
        { name: { $regex: regex } },
        { address: { $regex: regex } },
        { companyDescription: { $regex: regex } },
      ];
    }

    const sortOptions: any = {};

    if (sort) {
      if (sort === 'followers') {
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
      .select(
        'image name companyDescription followers size address jobs industry',
      )
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

    const totalJobs = await this.jobsService.countDocuments({ employer: id });

    const totalApplications = await this.applicationsService.countDocuments({
      job: {
        $in: (await this.jobsService.find({ employer: id })).map(
          (job) => job._id,
        ),
      },
    });

    const totalFollowers = (
      await this.employerModel.findById(id).select('followers')
    ).followers.length;

    const jobsThisMonth = await this.jobsService.countDocuments({
      employer: id,
      createdAt: { $gte: startOfMonth },
    });

    const applicationsThisMonth = await this.applicationsService.countDocuments(
      {
        job: {
          $in: (await this.jobsService.find({ employer: id })).map(
            (job) => job._id,
          ),
        },
        createdAt: { $gte: startOfMonth },
      },
    );

    const employerWithFollowers = await this.employerModel
      .findById(id)
      .select('followers')
      .populate('followers', 'createdAt');

    const followersThisMonth = employerWithFollowers.followers.filter(
      (follower: any) => {
        const followerCreatedAt = follower.createdAt;
        return (
          followerCreatedAt >= startOfMonth && followerCreatedAt < new Date()
        );
      },
    ).length;

    const jobsPerMonth = await this.getJobsPerMonth(id);
    const followersOverTime = await this.getFollowersOverTime(id);
    const jobTypes = await this.getJobTypes(id);

    return {
      statusCode: HttpStatus.OK,
      totalJobs,
      totalApplications,
      totalFollowers,
      jobsPerMonth,
      followersOverTime,
      jobTypes,
      jobsThisMonth,
      applicationsThisMonth,
      followersThisMonth,
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
          employer: objectIdEmployerId,
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
      { $match: { employer: objectIdEmployerId } },
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

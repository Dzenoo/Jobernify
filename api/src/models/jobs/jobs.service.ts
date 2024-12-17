import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Job, JobDocument } from './schemas/job.schema';

import mongoose, {
  DeleteResult,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetJobsDto } from './dto/get-jobs.dto';

import { EmployersService } from '../employers/employers.service';
import { SeekersService } from '../seekers/seekers.service';
import { ApplicationsService } from '../applications/applications.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';

@Injectable()
export class JobsService {
  constructor(
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @Inject(forwardRef(() => EmployersService))
    private readonly employersService: EmployersService,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
    private readonly emailService: NodemailerService,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
  ) {}

  async find(query: FilterQuery<Job> = {}): Promise<Job[] | JobDocument[]> {
    return await this.jobModel.find(query).exec();
  }

  async findAndUpdateOne(
    query: FilterQuery<Job> = {},
    update: UpdateQuery<Job> = {},
  ): Promise<UpdateWriteOpResult> {
    return await this.jobModel.updateOne(query, update).exec();
  }

  async findAndUpdateMany(
    query: FilterQuery<Job> = {},
    update: UpdateQuery<Job> = {},
  ): Promise<UpdateWriteOpResult> {
    return await this.jobModel.updateMany(query, update).exec();
  }

  async findAndDeleteMany(query: FilterQuery<Job> = {}): Promise<DeleteResult> {
    return await this.jobModel.deleteMany(query).exec();
  }

  async findOneById(id: string, select?: string): Promise<Job> {
    return await this.jobModel.findById(id).select(select);
  }

  async countDocuments(query: FilterQuery<Job> = {}): Promise<number> {
    return await this.jobModel.countDocuments(query).exec();
  }

  async aggregate(pipeline: any): Promise<any[]> {
    return await this.jobModel.aggregate(pipeline).exec();
  }

  async createOne(
    body: CreateJobDto,
    employerId: string,
  ): Promise<ResponseObject> {
    const newJob = await this.jobModel.create({
      ...body,
      employer: new mongoose.Types.ObjectId(employerId),
    });

    if (!newJob) {
      throw new InternalServerErrorException(
        'We encountered an issue while creating the job posting. Please try again later.',
      );
    }

    await this.employersService.findOneByIdAndUpdate(employerId, {
      $push: { jobs: newJob._id },
    });

    const matchedSeekers = await this.seekersService.find({
      'alerts.type': newJob.type,
      'alerts.level': { $in: [newJob.level] },
      'alerts.title': { $regex: new RegExp(String(newJob.title), 'i') },
    });

    const seekersToSendAlerts = matchedSeekers.map((seeker) => ({
      email: seeker.email,
      receiveJobAlerts: seeker.receiveJobAlerts,
    }));

    for (const seeker of seekersToSendAlerts) {
      if (seeker.receiveJobAlerts === true) {
        await this.emailService.sendMail(
          seeker.email,
          'Jobernify - New Job Alert Match',
          this.generateJobEmailContent(newJob, 'alert'),
        );
      }
    }

    const followers = await this.seekersService.find({ following: employerId });
    const followerEmails = followers.map((follower) => follower.email);

    for (const followerEmail of followerEmails) {
      await this.emailService.sendMail(
        followerEmail,
        'Jobernify - New Job Created by Employer',
        this.generateJobEmailContent(newJob, 'follower'),
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully Created Job!',
      job: newJob._id,
    };
  }

  private generateJobEmailContent(
    job: JobDocument,
    type: 'alert' | 'follower',
  ): string {
    const header =
      type === 'alert'
        ? `New Job Alert: ${job.title}`
        : `New Job Created by Employer`;

    const message =
      type === 'alert'
        ? 'We have found a new job that matches your alert criteria:'
        : 'The employer you are following has created a new job:';

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">${header}</h2>
        <p style="color: #555;">${message}</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="color: #333;">${job.title}</h3>
          <p style="color: #555;"><strong>Position:</strong> ${job.position}</p>
          <p style="color: #555;">${job.overview}</p>
          <a href="${process.env.FRONTEND_URL}/jobs/${job._id}" style="display: inline-block; padding: 10px 15px; background-color: #1a73e8; color: #fff; text-decoration: none; border-radius: 5px;">View Job</a>
        </div>
        <p style="color: #555;">If you have any questions, feel free to <a href="mailto:jobernify@gmail.com" style="color: #1a73e8;">contact us</a>.</p>
        <p style="color: #555;">Best regards,<br>Jobernify Team</p>
      </div>
    `;
  }

  async editOne(
    id: string,
    body: UpdateJobDto,
    employerId: string,
  ): Promise<ResponseObject> {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException(
        'The job posting you are trying to edit could not be found.',
      );
    }

    if (employerId.toString() !== job.employer.toString()) {
      throw new UnauthorizedException(
        'You are not authorized to edit this job posting.',
      );
    }

    const editedJob = await this.jobModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!editedJob) {
      throw new NotFoundException('Job not found or could not be updated');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully edited',
    };
  }

  async deleteOne(id: string, employerId: string): Promise<ResponseObject> {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException(
        'The job posting you are trying to delete could not be found.',
      );
    }

    if (employerId.toString() !== job.employer.toString()) {
      throw new UnauthorizedException(
        'You are not authorized to edit this job posting.',
      );
    }

    const applications = await this.applicationsService.find({ job: id });

    await this.jobModel.findByIdAndDelete(id);

    await this.applicationsService.findAndDeleteMany({ job: id });

    await this.seekersService.findAndUpdateMany(
      {
        $or: [
          { applications: { $in: applications.map((app) => app._id) } },
          { savedJobs: id },
        ],
      },
      {
        $pullAll: {
          applications: applications.map((app) => app._id),
          savedJobs: [id],
        },
      },
    );

    await this.employersService.findOneByIdAndUpdate(employerId, {
      $pull: { jobs: id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Job Deleted Successfully',
    };
  }

  async saveOne(id: string, seekerId: string): Promise<ResponseObject> {
    const job = await this.jobModel.findById(id);
    const seeker = await this.seekersService.findOneById(seekerId);

    if (!job) {
      throw new NotFoundException(
        'The job posting you are trying to save/unsave could not be found.',
      );
    }

    if (seeker.savedJobs.includes(id)) {
      await this.seekersService.findAndUpdateOne(
        { _id: seekerId },
        {
          $pull: { savedJobs: id },
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'The job has been successfully removed from your saved list.',
      };
    } else {
      await this.seekersService.findAndUpdateOne(
        { _id: seekerId },
        {
          $push: { savedJobs: id },
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'The job has been successfully added to your saved list.',
      };
    }
  }

  async getOneById(id: string): Promise<ResponseObject> {
    const job = await this.jobModel
      .findById(id)
      .populate({
        path: 'employer',
        select: 'name companyDescription followers size image industry',
      })
      .select(
        '_id title overview employer position applications location expiration_date level createdAt salary skills description type',
      );

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const jobs = await this.jobModel
      .find({
        title: job.title,
      })
      .select(
        '_id title overview employer position applications location expiration_date level createdAt',
      )
      .populate({
        path: 'employer',
        select: 'name companyDescription followers size image industry',
      })
      .exec();

    const filteredJobsData = jobs.filter((job) => job._id.toString() !== id);

    return {
      statusCode: HttpStatus.OK,
      job,
      jobs: filteredJobsData,
    };
  }

  async getAll({
    page = 1,
    limit = 10,
    search,
    type,
    level,
    salary,
    position,
    sort,
  }: GetJobsDto): Promise<ResponseObject> {
    const conditions: any = {};

    const popularJobs = await this.jobModel.aggregate([
      { $project: { title: 1, applicationCount: { $size: '$applications' } } },
      { $sort: { applicationCount: -1 } },
      { $limit: 5 },
      { $project: { title: 1, _id: 1 } },
    ]);

    if (search) {
      conditions.$or = [
        { title: { $regex: new RegExp(String(search), 'i') } },
        { description: { $regex: new RegExp(String(search), 'i') } },
        { location: { $regex: new RegExp(String(search), 'i') } },
      ];
    }

    if (type) {
      conditions.type = Array.isArray(type)
        ? { $in: type }
        : type.toString().split(',');
    }

    if (level) {
      conditions.level = Array.isArray(level)
        ? { $in: level }
        : level.toString().split(',');
    }

    if (position) {
      conditions.position = Array.isArray(position)
        ? { $in: position }
        : position.toString().split(',');
    }

    if (salary) {
      const salaryRanges = Array.isArray(salary)
        ? salary
        : salary.toString().split(',');

      conditions.salary = {};

      salaryRanges.forEach((range) => {
        if (typeof range === 'string') {
          const [minSalary, maxSalary] = range.split('-').map(Number);

          if (!isNaN(minSalary)) {
            conditions.salary.$gte = conditions.salary.$gte
              ? Math.min(conditions.salary.$gte, minSalary)
              : minSalary;
          }
          if (!isNaN(maxSalary) && maxSalary > minSalary) {
            conditions.salary.$lte = conditions.salary.$lte
              ? Math.max(conditions.salary.$lte, maxSalary)
              : maxSalary;
          }
        }
      });
    }

    const sortOptions: any = { createdAt: sort === 'desc' ? -1 : 1 };

    const jobs = await this.jobModel
      .find(conditions)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: 'employer', select: 'image name _id' })
      .select(
        '_id title overview employer applications location expiration_date level createdAt',
      )
      .exec();

    const totalJobs = await this.jobModel.countDocuments(conditions);

    const filterCounts = await this.jobModel.aggregate([
      {
        $facet: {
          type: [{ $group: { _id: '$type', count: { $sum: 1 } } }],
          level: [{ $group: { _id: '$level', count: { $sum: 1 } } }],
          position: [{ $group: { _id: '$position', count: { $sum: 1 } } }],
          salary: [
            {
              $project: {
                salary: 1,
                range: {
                  $switch: {
                    branches: [
                      {
                        case: { $lt: ['$salary', 50000] },
                        then: { min: 0, max: 50000 },
                      },
                      {
                        case: { $lt: ['$salary', 100000] },
                        then: { min: 50000, max: 100000 },
                      },
                      {
                        case: { $lt: ['$salary', 150000] },
                        then: { min: 100000, max: 150000 },
                      },
                      {
                        case: { $lt: ['$salary', 200000] },
                        then: { min: 150000, max: 200000 },
                      },
                      {
                        case: { $lt: ['$salary', 500000] },
                        then: { min: 200000, max: 500000 },
                      },
                    ],
                    default: { min: 500000, max: 500000 },
                  },
                },
              },
            },
            { $group: { _id: '$range', count: { $sum: 1 } } },
            { $sort: { '_id.min': 1 } },
          ],
        },
      },
    ]);

    return {
      statusCode: HttpStatus.OK,
      jobs,
      totalJobs,
      popularJobs,
      filterCounts,
    };
  }
}

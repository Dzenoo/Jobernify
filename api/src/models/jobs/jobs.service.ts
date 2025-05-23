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

import { Job, JobDocument } from '@/models/jobs/schemas/job.schema';

import mongoose, {
  DeleteResult,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

import { CreateJobDto } from '@/models/jobs/dto/create-job.dto';
import { UpdateJobDto } from '@/models/jobs/dto/update-job.dto';
import { GetJobsDto } from '@/models/jobs/dto/get-jobs.dto';

import { EmployersService } from '@/models/employers/employers.service';
import { SeekersService } from '@/models/seekers/seekers.service';
import { ApplicationsService } from '@/models/applications/applications.service';
import { MailService } from '@/common/modules/email/mail.service';
import { AiService } from '@/ai/ai.service';

@Injectable()
export class JobsService {
  constructor(
    @Inject(forwardRef(() => AiService))
    private readonly aiService: AiService,
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @Inject(forwardRef(() => EmployersService))
    private readonly employersService: EmployersService,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
    private readonly emailService: MailService,
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

  async createCoverLetter(jobId: string, seekerId: string) {
    const job = await this.findOneById(
      jobId,
      'title description overview skills',
    );

    if (!job) {
      throw new NotFoundException(
        'Job not found. Could not create cover letter.',
      );
    }

    const seeker = await this.seekersService.findOneById(
      seekerId,
      'first_name last_name experience education github linkedin portfolio skills',
    );

    if (!seeker) {
      throw new NotFoundException(
        'Seeker not found. Could not create cover letter.',
      );
    }

    const jobData = {
      title: job.title,
      description: job.description,
      overview: job.overview,
      skills: job.skills,
    };

    const seekerData = {
      first_name: seeker.first_name,
      last_name: seeker.last_name,
      experience: seeker.experience,
      education: seeker.education,
      github: seeker.github,
      linkedin: seeker.linkedin,
      portfolio: seeker.portfolio,
      skills: seeker.skills,
    };

    const coverLetter = await this.aiService.generateCoverLetter({
      jobData,
      seekerData,
    });

    return {
      coverLetter,
      statusCode: HttpStatus.CREATED,
    };
  }

  async createOne(
    body: CreateJobDto,
    employerId: string,
  ): Promise<ResponseObject> {
    const employer = await this.employersService.findOneById(
      employerId,
      'isApproved',
    );

    if (!employer.isApproved) {
      throw new UnauthorizedException(
        'Your account has not been approved yet. Please try again later.',
      );
    }

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
          'job-alert',
          {
            title: this.generateJobEmailContent('alert').title,
            content: this.generateJobEmailContent('alert').content,
            jobTitle: newJob.title,
            jobPosition: newJob.position,
            jobOverview: newJob.overview,
            jobUrl: `${process.env.FRONTEND_URL}jobs/${newJob._id}`,
          },
        );
      }
    }

    const followers = await this.seekersService.find({ following: employerId });
    const followerEmails = followers.map((follower) => follower.email);

    for (const followerEmail of followerEmails) {
      await this.emailService.sendMail(
        followerEmail,
        'Jobernify - New Job Created by Employer',
        'job-alert',
        {
          title: this.generateJobEmailContent('alert').title,
          content: this.generateJobEmailContent('alert').content,
          jobTitle: newJob.title,
          jobPosition: newJob.position,
          jobOverview: newJob.overview,
          jobUrl: `${process.env.FRONTEND_URL}jobs/${newJob._id}`,
        },
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully Created Job!',
      job: newJob._id,
    };
  }

  private generateJobEmailContent(type: 'alert' | 'follower') {
    return {
      title: type === 'alert' ? `New Job Alert` : `New Job Created by Employer`,
      content:
        type === 'alert'
          ? 'We have found a new job that matches your alert criteria:'
          : 'The employer you are following has created a new job:',
    };
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
    const conditions: any = {
      expiration_date: { $gte: new Date() },
    };

    const popularJobs = await this.jobModel.aggregate([
      { $project: { title: 1, applicationCount: { $size: '$applications' } } },
      { $sort: { applicationCount: -1 } },
      { $limit: 5 },
      { $project: { title: 1, _id: 1 } },
    ]);

    const regex = new RegExp(String(search), 'i');

    if (search) {
      conditions.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { overview: { $regex: regex } },
        { skills: { $elemMatch: { $regex: regex } } },
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
      .lean()
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

  async findMatchingJobs(seekerId: string) {
    const seeker = await this.seekersService.findOneById(seekerId);
    if (!seeker) return [];

    const { alerts: { level, type, title } = {}, skills, experience } = seeker;

    const orConditions: any[] = [];

    // If user has some 'type' fields
    if (type && type.length > 0) {
      orConditions.push({ type: { $in: type } });
    }

    // If user has some 'level' fields
    if (level && level.length > 0) {
      orConditions.push({ level: { $in: level } });
    }

    // If user has some 'title' fields
    if (title && title.length > 0) {
      orConditions.push({ title: { $in: title } });
    }

    // If user has 'skills'
    if (skills && skills.length > 0) {
      orConditions.push({ skills: { $in: skills } });
    }

    // If user has 'experience' arrays
    if (experience && experience.length > 0) {
      const levels = experience.map((exp) => exp.level);
      const types = experience.map((exp) => exp.type);
      const positions = experience.map((exp) => exp.position);

      if (levels.length > 0) {
        orConditions.push({ 'experience.level': { $in: levels } });
      }
      if (types.length > 0) {
        orConditions.push({ 'experience.type': { $in: types } });
      }
      if (positions.length > 0) {
        orConditions.push({ 'experience.position': { $in: positions } });
      }
    }

    // If the user provided NO data (orConditions is empty), return []
    if (orConditions.length === 0) {
      return [];
    }

    // Build the final query with $or
    const query = { $or: orConditions };

    const matchingJobs = await this.jobModel
      .find(query)
      .select('_id title salary location type level skills')
      .exec();

    const refactoredMatchingJobs = matchingJobs.map((job) => ({
      ...(job.toObject?.() || job), // in case job is a Mongoose doc
      link: `${process.env.FRONTEND_URL}/jobs/${job._id}`,
    }));

    return refactoredMatchingJobs;
  }
}

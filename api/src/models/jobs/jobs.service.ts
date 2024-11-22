import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Job, JobDocument } from './schemas/job.schema';

import { Model } from 'mongoose';

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
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
    private readonly applicationsService: ApplicationsService,
    private readonly emailService: NodemailerService,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
  ) {}

  async aggregate(pipeline: any): Promise<any[]> {
    return await this.jobModel.aggregate(pipeline).exec();
  }

  async createOne(
    body: CreateJobDto,
    employerId: string,
  ): Promise<ResponseObject> {
    const newJob = await this.jobModel.create({
      ...body,
      company: employerId,
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
      'alerts.level': { $in: newJob.level },
      'alerts.title': { $regex: new RegExp(String(newJob.title), 'i') },
    });

    const alertEmails = matchedSeekers.map((seeker) => seeker.email);

    for (const seekerEmail of alertEmails) {
      await this.emailService.sendMail(
        seekerEmail,
        'Jobernify - New Job Alert Match',
        this.generateJobEmailContent(newJob, 'alert'),
      );
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

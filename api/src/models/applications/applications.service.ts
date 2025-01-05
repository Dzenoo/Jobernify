import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Application, ApplicationDocument } from './schemas/application.schema';
import { ApplicationStatus } from '@jobernify/shared';

import { DeleteResult, FilterQuery, Model } from 'mongoose';

import { SeekersService } from '../seekers/seekers.service';
import { JobsService } from '../jobs/jobs.service';
import { S3Service } from 'src/common/s3/s3.service';
import { MailService } from 'src/common/email/mail.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    private readonly s3Service: S3Service,
    private readonly mailService: MailService,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  async find(
    query: FilterQuery<Application> = {},
  ): Promise<Application[] | ApplicationDocument[]> {
    return await this.applicationModel.find(query).exec();
  }

  async findAndDeleteMany(
    query: FilterQuery<Application> = {},
  ): Promise<DeleteResult> {
    return await this.applicationModel.deleteMany(query).exec();
  }

  async countDocuments(query: FilterQuery<Application> = {}): Promise<number> {
    return await this.applicationModel.countDocuments(query).exec();
  }

  async createOne(
    seekerId: string,
    jobId: string,
    resume: Express.Multer.File,
    coverLetter?: string,
  ): Promise<ResponseObject> {
    const job = await this.jobsService.findOneById(jobId);

    if (!job) {
      throw new NotFoundException('Job not found.');
    }

    const existingApplication = await this.applicationModel.findOne({
      seeker: seekerId,
      job: jobId,
    });

    if (existingApplication) {
      throw new UnauthorizedException(
        'You have already submitted an application for this position.',
      );
    }

    if (job.expiration_date < new Date()) {
      throw new BadRequestException('This job has expired.');
    }

    let resumeUrl;

    if (!resume) {
      const seeker = await this.seekersService.findOneById(seekerId);

      if (!seeker.resume) {
        throw new ForbiddenException(
          'Please upload a resume to apply for this job.',
        );
      }

      const seekerResumeKey = seeker?.resume.split('/')[1];
      resumeUrl = `documents/resume_${seekerResumeKey}.pdf`;
    } else {
      const resumeKey = `resume_${seekerId}.pdf`;

      await this.s3Service.uploadFile(resume, resumeKey, 'documents');

      resumeUrl = `documents/${resumeKey}`;

      await this.seekersService.findAndUpdateOne(
        { _id: seekerId },
        { resume: resumeUrl },
      );
    }

    const application = await this.applicationModel.create({
      job: jobId,
      seeker: seekerId,
      status: 'Pending',
      cover_letter: coverLetter || '',
      resume: resumeUrl,
    });

    await this.jobsService.findAndUpdateOne(
      { _id: jobId },
      {
        $push: { applications: application._id },
      },
    );

    await this.seekersService.findAndUpdateOne(
      { _id: seekerId },
      {
        $push: { applications: application._id },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Your application has been successfully submitted! Good luck!',
    };
  }

  async updateOne(
    id: string,
    status: ApplicationStatus,
  ): Promise<ResponseObject> {
    if (!status) {
      throw new BadRequestException(
        'Invalid status provided. Please select a valid application status',
      );
    }

    const existingApplication = await this.applicationModel
      .findById(id)
      .populate('seeker', 'email')
      .populate({
        path: 'job',
        select: 'employer',
        populate: {
          path: 'employer',
          select: 'name',
        },
      });

    if (!existingApplication) {
      throw new NotFoundException('The specified application does not exist.');
    }

    await this.applicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    const emailContent = this.generateApplicationEmailContent(
      status,
      existingApplication.job.employer.name,
    );

    await this.mailService.sendMail(
      existingApplication.seeker.email,
      'Application Status Update',
      emailContent,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully Updated',
    };
  }

  async getManyByJobId({
    jobId,
    page = 1,
    limit = 10,
    status = ApplicationStatus.Pending,
  }: {
    jobId: string;
    page: number;
    limit: number;
    status?: ApplicationStatus;
  }): Promise<ResponseObject> {
    const job = (await this.jobsService.findOneById(jobId)).title;
    const conditions: any = { job: jobId };

    if (status) {
      conditions.status = status;
    }

    const applications = await this.applicationModel
      .find(conditions)
      .populate({
        path: 'job',
        select: '_id title type',
      })
      .populate({
        path: 'seeker',
        select:
          'first_name last_name email _id linkedin github portfolio image',
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalApplications = await this.applicationModel.countDocuments({
      job: jobId,
    });

    const totalPending = await this.applicationModel.countDocuments({
      job: jobId,
      status: 'Pending',
    });

    const totalInterview = await this.applicationModel.countDocuments({
      job: jobId,
      status: 'Interview',
    });

    const totalRejected = await this.applicationModel.countDocuments({
      job: jobId,
      status: 'Rejected',
    });

    const totalAccepted = await this.applicationModel.countDocuments({
      job: jobId,
      status: 'Accepted',
    });

    return {
      statusCode: HttpStatus.OK,
      job,
      applications,
      totalApplications,
      totalPendingStatus: totalPending,
      totalInterviewStatus: totalInterview,
      totalRejectedStatus: totalRejected,
      totalAcceptedStatus: totalAccepted,
    };
  }

  async getPresignedResumeUrl(applicationId: string): Promise<string> {
    const application = await this.applicationModel.findById(applicationId);
    if (!application || !application.resume) {
      throw new NotFoundException(
        'Resume not found for the specified application.',
      );
    }

    const resumeKey = application.resume.split('documents/')[1];

    return await this.s3Service.generatePresignedUrl(resumeKey, 'documents');
  }

  private generateApplicationEmailContent(status: string, companyName: string) {
    let content = '';
    switch (status) {
      case 'Rejected':
        content = `We regret to inform you that your application for the position at ${companyName} has been rejected. Thank you for considering us.`;
        break;
      case 'Pending':
        content = `Your application for the position at ${companyName} is currently un. We will get back to you shortly.`;
        break;
      case 'Accepted':
        content = `Congratulations! Your application for the position at ${companyName} has been accepted. We look forward to having you on board.`;
        break;
      case 'Interview':
        content = `We are pleased to inform you that you have been selected for an interview for the position at ${companyName}. Further details will be shared shortly.`;
        break;
      default:
        content = `Your application status has been updated to ${status}.`;
    }

    return `<html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; }
          .header { background-color: #f0f0f0; padding: 20px; text-align: center; }
          .header h2 { margin: 0; color: #333; }
          .content { padding: 20px; }
          .content p { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Application Update</h2>
          </div>
          <div class="content">
            <p>${content}</p>
          </div>
        </div>
      </body>
    </html>`;
  }
}

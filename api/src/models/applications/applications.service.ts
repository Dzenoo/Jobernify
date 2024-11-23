import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Application, ApplicationStatus } from './schemas/application.schema';

import { FilterQuery, Model } from 'mongoose';

import { SeekersService } from '../seekers/seekers.service';
import { EmployersService } from '../employers/employers.service';
import { JobsService } from '../jobs/jobs.service';
import { S3Service } from 'src/common/s3/s3.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @Inject(forwardRef(() => EmployersService))
    private readonly employersService: EmployersService,
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    private readonly s3Service: S3Service,
    private readonly nodemailerService: NodemailerService,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  async findAndDeleteMany(query: FilterQuery<Application> = {}) {
    return await this.applicationModel.deleteMany(query).exec();
  }

  async find(query: FilterQuery<Application> = {}) {
    return await this.applicationModel.find(query).exec();
  }

  async createOne(
    seekerId: string,
    jobId: string,
    resume: Express.Multer.File,
    coverLetter?: string,
  ): Promise<ResponseObject> {
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

    const existingApplication = await this.applicationModel.findOne({
      seeker: seekerId,
      job: jobId,
    });

    if (existingApplication) {
      throw new UnauthorizedException(
        'You have already submitted an application for this position.',
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
        select: 'company',
        populate: {
          path: 'company',
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
      existingApplication.job.company.name,
    );

    await this.nodemailerService.sendMail(
      existingApplication.seeker.email,
      'Application Status Update',
      emailContent,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully Updated',
    };
  }

  async getManyByJobId(): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }

  private generateApplicationEmailContent(status: string, companyName: string) {
    let content = '';
    switch (status) {
      case 'Rejected':
        content = `We regret to inform you that your application for the position at ${companyName} has been rejected. Thank you for considering us.`;
        break;
      case 'Pending':
        content = `Your application for the position at ${companyName} is currently under review. We will get back to you shortly.`;
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

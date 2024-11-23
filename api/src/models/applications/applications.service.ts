import {
  ConflictException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Application } from './schemas/application.schema';

import { FilterQuery, Model } from 'mongoose';

import { SeekersService } from '../seekers/seekers.service';
import { EmployersService } from '../employers/employers.service';
import { JobsService } from '../jobs/jobs.service';
import { S3Service } from 'src/common/s3/s3.service';

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
        throw new ConflictException(
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

  async updateOne(): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }

  async getManyByJobId(): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }

  private generateApplicationEmailContent() {}
}

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Seeker } from './schemas/seeker.schema';

import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { SignupSeekerDto } from './dto/signup-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';

import { EmployersService } from '../employers/employers.service';
import { JobsService } from '../jobs/jobs.service';
import { ReviewsService } from '../reviews/reviews.service';
import { ApplicationsService } from '../applications/applications.service';
import { S3Service } from 'src/common/s3/s3.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';

import { uuidv7 } from 'uuidv7';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateJobAlertDto } from './dto/create-job-alert.dto';

@Injectable()
export class SeekersService {
  constructor(
    @Inject(forwardRef(() => EmployersService))
    private readonly employersService: EmployersService,
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
    private readonly s3Service: S3Service,
    private readonly emailService: NodemailerService,
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
  ) {}

  async findAndUpdateOne(
    query: FilterQuery<Seeker>,
    update: UpdateQuery<Seeker>,
  ) {
    return await this.seekerModel.updateOne(query, update).exec();
  }

  async findAndUpdateMany(
    query: FilterQuery<Seeker>,
    update: UpdateQuery<Seeker>,
  ) {
    return await this.seekerModel.updateMany(query, update).exec();
  }

  async findOneById(id: string, select?: string): Promise<Seeker> {
    return await this.seekerModel.findById(id).select(select);
  }

  async findOneByEmail(email: string, select?: string): Promise<Seeker> {
    return await this.seekerModel.findOne({ email: email }).select(select);
  }

  async find(query: FilterQuery<Seeker> = {}) {
    return await this.seekerModel.find(query).exec();
  }

  async createOne(body: SignupSeekerDto & Record<string, any>): Promise<any> {
    return await this.seekerModel.create(body);
  }

  async getOne({
    page = 1,
    limit = 10,
    id,
  }: {
    page?: number;
    limit?: number;
    id: string;
  }): Promise<ResponseObject> {
    const skip = (page - 1) * limit;

    const seeker = await this.seekerModel
      .findById(id)
      .populate({
        path: 'savedJobs',
        options: { skip, limit: Number(limit) },
        select:
          '_id title location level expiration_date createdAt applications overview',
        populate: {
          path: 'company',
          select: '_id image name',
        },
      })
      .populate({
        path: 'applications',
        populate: {
          path: 'job',
          select: '_id title type level position',
          populate: {
            path: 'company',
            select: '_id image name size address industry',
          },
        },
        select: '_id status createdAt updatedAt',
      })
      .select(
        '_id first_name last_name biography image education experience skills alerts github linkedin portfolio following headline resume',
      )
      .exec();

    if (!seeker) {
      throw new NotFoundException(
        'We could not find your profile. Please try again later.',
      );
    }

    return {
      statusCode: HttpStatus.OK,
      seeker,
    };
  }

  async editOne(
    id: string,
    updatedData: UpdateSeekerDto,
    image?: Express.Multer.File,
  ): Promise<ResponseObject> {
    if (image) {
      const currentSeeker = await this.seekerModel.findById(id);

      if (currentSeeker) {
        if (currentSeeker.image.includes('seekers')) {
          await this.s3Service.deleteFile(
            currentSeeker.image.split('/')[1],
            'seekers',
          );
        }

        const result = uuidv7();
        const imageKey = `seeker_${result}.png`;
        await this.s3Service.uploadFile(image, imageKey, 'seekers');

        updatedData.image = `seekers/${imageKey}`;
      }
    }

    const updatedSeeker = await this.seekerModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedSeeker) {
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
    const seeker = await this.seekerModel.findById(id);

    if (!seeker) {
      throw new NotFoundException(
        'We could not find your profile or delete it. Please try again later.',
      );
    }

    // const applications = await this.applicationsService.findBySeekerId(id)
    // const reviews = await this.reviewsService.findBySeekerId(id)

    // await this.applicationsService.deleteMany({ seekerId: id });
    // await this.reviewsService.deleteMany({ seekerId: id });
    // await this.jobsService.updateMany(
    //   { applications: { $in: applications.map((app) => app._id) } },
    //   {
    //     $pull: {
    //       applications: { $in: applications.map((app) => app._id) },
    //     },
    //   },
    // );
    // await this.employersService.updateMany(
    //   {
    //     $or: [
    //       { followers: id },
    //       { reviews: { $in: reviews.map((review) => review._id) } },
    //     ],
    //   },
    //   {
    //     $pull: {
    //       followers: id,
    //       reviews: { $in: reviews.map((review) => review._id) },
    //     },
    //   },
    // );

    if (seeker.image.includes('seekers')) {
      await this.s3Service.deleteFile(seeker.image.split('/')[1], 'seekers');
    }

    await this.seekerModel.findByIdAndDelete(id);

    return {
      statusCode: HttpStatus.ACCEPTED,
      message:
        'Your profile and all associated data have been successfully deleted.',
    };
  }

  async getMany({
    page = 1,
    limit = 12,
    search = '',
    skills = [''],
  }: {
    page?: number;
    limit?: number;
    search?: string;
    skills?: string[];
  }): Promise<ResponseObject> {
    const conditions: any = {
      emailVerified: true,
    };

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');

      conditions.$or = [
        { first_name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { headline: { $regex: searchRegex } },
      ];
    }

    if (skills) {
      conditions.skills = { $in: skills };
    }

    const seekers = await this.seekerModel
      .find(conditions)
      .skip((page - 1) * limit)
      .limit(limit)
      .select(
        '_id first_name last_name skills github linkedin portfolio image headline',
      )
      .exec();

    const totalSeekers = await this.seekerModel.countDocuments(conditions);

    return {
      statusCode: HttpStatus.OK,
      seekers,
      totalSeekers,
    };
  }

  async getOneById(id: string): Promise<ResponseObject> {
    const seeker = await this.seekerModel
      .findById(id)
      .select(
        '_id first_name last_name biography education experience skills github linkedin portfolio image headline',
      );

    if (!seeker) {
      throw new NotFoundException(
        'The seeker you are looking for could not be found.',
      );
    }

    return {
      statusCode: HttpStatus.OK,
      seeker,
    };
  }

  async createEducation(
    id: string,
    educationData: CreateEducationDto,
  ): Promise<ResponseObject> {
    const seeker = await this.seekerModel.findByIdAndUpdate(
      id,
      {
        $push: { education: educationData },
      },
      { runValidators: true, new: true },
    );

    if (!seeker) {
      throw new NotFoundException(
        'Seeker not found or could not add education',
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message:
        'Your education entry has been successfully added to your profile.',
    };
  }

  async deleteEducation(
    id: string,
    educationId: string,
  ): Promise<ResponseObject> {
    const seeker = await this.seekerModel.findById(id);

    if (!seeker) {
      throw new NotFoundException(
        'Seeker not found or could not delete education',
      );
    }

    const updatedEducation = seeker.education.filter(
      (education: any) => education._id.toString() !== educationId.toString(),
    );

    const deletedSeekerEducation = await this.seekerModel.findByIdAndUpdate(
      id,
      { education: updatedEducation },
      { new: true },
    );

    if (!deletedSeekerEducation) {
      throw new NotFoundException('Could not delete education right now');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Education successfully deleted',
    };
  }

  async createExperience(
    id: string,
    experienceData: CreateExperienceDto,
  ): Promise<ResponseObject> {
    const seeker = await this.seekerModel.findByIdAndUpdate(
      id,
      {
        $push: { experience: experienceData },
      },
      { runValidators: true, new: true },
    );

    if (!seeker) {
      throw new NotFoundException(
        'Seeker not found or could not add experience',
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message:
        'Your experience entry has been successfully added to your profile.',
    };
  }

  async deleteExperience(
    id: string,
    experienceId: string,
  ): Promise<ResponseObject> {
    const seeker = await this.seekerModel.findById(id);

    if (!seeker) {
      throw new NotFoundException(
        'Seeker not found or could not delete experience',
      );
    }

    const updatedExperience = seeker.experience.filter(
      (experience: any) =>
        experience._id.toString() !== experienceId.toString(),
    );

    const deletedSeekerExperience = await this.seekerModel.findByIdAndUpdate(
      id,
      { experience: updatedExperience },
      { new: true },
    );

    if (!deletedSeekerExperience) {
      throw new NotFoundException('Could not delete experience right now');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Experience successfully deleted',
    };
  }

  async createJobAlert(
    id: string,
    alertData: CreateJobAlertDto,
  ): Promise<ResponseObject> {
    const seeker = await this.seekerModel.findByIdAndUpdate(id, {
      alerts: { ...alertData },
    });

    if (!seeker) {
      throw new NotFoundException(
        'Seeker not found or could not create job alert',
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Your job alert has been successfully created.',
    };
  }

  async followEmployer(
    id: string,
    employerId: string,
  ): Promise<ResponseObject> {
    const [employer, seeker] = await Promise.all([
      this.employersService.findOneById(employerId),
      this.seekerModel.findById(id),
    ]);

    if (!employer || !seeker) {
      throw new NotFoundException(
        "We couldn't find the employer or your profile. Please try again later.",
      );
    }

    const isFollowing = employer.followers.includes(id);

    if (isFollowing) {
      // Unfollow
      await this.employersService.findOneByIdAndUpdate(employerId, {
        $pull: { followers: id },
      });
      await this.seekerModel.findByIdAndUpdate(id, {
        $pull: { following: employerId },
      });
    } else {
      // Follow
      await this.employersService.findOneByIdAndUpdate(employerId, {
        $push: {
          followers: id,
        },
      });
      await this.seekerModel.findByIdAndUpdate(id, {
        $push: { following: employerId },
      });
    }

    return {
      statusCode: HttpStatus.OK,
    };
  }
}

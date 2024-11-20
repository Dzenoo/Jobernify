import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Seeker } from './schemas/seeker.schema';

import { Model } from 'mongoose';

import { SignupSeekerDto } from './dto/signup-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';

import { S3Service } from 'src/common/s3/s3.service';
import { VerificationService } from 'src/authentication/verification/verification.service';
import { NodemailerService } from 'src/common/email/nodemailer.service';

import { uuidv7 } from 'uuidv7';

@Injectable()
export class SeekersService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly verificationService: VerificationService,
    private readonly emailService: NodemailerService,
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
  ) {}

  async findOneByEmail(email: string, select?: string): Promise<Seeker> {
    return await this.seekerModel.findOne({ email: email }).select(select);
  }

  async createOne(body: SignupSeekerDto): Promise<void> {
    const existingSeeker = await this.findOneByEmail(body.email);

    if (existingSeeker) {
      const isEmailVerified = existingSeeker.emailVerified;

      const errorMessage = isEmailVerified
        ? 'An account with this email already exists.'
        : 'An account with this email already exists but is not verified. Please check your email for the verification link or request a new one.';

      throw isEmailVerified
        ? new ConflictException(errorMessage)
        : new NotAcceptableException(errorMessage);
    }

    const { verificationToken, verificationExpiration } =
      this.verificationService.create();

    const newSeeker = await this.seekerModel.create({
      ...body,
      verificationToken,
      verificationExpiration,
    });

    if (!newSeeker) {
      throw new InternalServerErrorException(
        'Cannot register account, please try again',
      );
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">Jobernify - Verify your email</h2>
        <p style="color: #555;">Please verify your email by clicking on this link: <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&type=seeker" style="color: #1a73e8;">Verify Email</a></p>
        <p style="color: #555;">This token expires in 24 hours, so please verify your account within this timeframe.</p>
      </div>
    `;

    await this.emailService.sendMail(
      newSeeker.email,
      'Jobernify - Verify your email',
      emailContent,
    );
  }

  async getOne({
    page,
    limit,
    id,
  }: {
    page: number;
    limit: number;
    id: string;
  }): Promise<Seeker> {
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

    return seeker;
  }

  async editOne(
    id: string,
    updatedData: UpdateSeekerDto,
    image?: Express.Multer.File,
  ): Promise<void> {
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

    await this.seekerModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  }
}

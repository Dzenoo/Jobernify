import {
  ForbiddenException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Review } from './schemas/review.schema';

import { Model } from 'mongoose';

import { CreateReviewDto } from './dto/create-review.dto';

import { EmployersService } from '../employers/employers.service';
import { SeekersService } from '../seekers/seekers.service';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(forwardRef(() => EmployersService))
    private readonly employersService: EmployersService,
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async createOne(
    seekerId: string,
    employerId: string,
    body: CreateReviewDto,
  ): Promise<ResponseObject> {
    const employer = await this.employersService.findOneById(employerId);

    if (!employer) {
      throw new NotFoundException('The specified employer could not be found.');
    }

    const existingReview = await this.reviewModel.findOne({
      seeker: seekerId,
      company: employerId,
    });

    if (existingReview) {
      throw new ForbiddenException(
        'You have already submitted a review for this employer.',
      );
    }

    const review = await this.reviewModel.create({
      ...body,
      company: employerId,
      seeker: seekerId,
    });

    await this.employersService.findOneByIdAndUpdate(employerId, {
      $push: {
        reviews: review._id,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Review successfully added',
    };
  }

  async editOne(): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }

  async deleteOne(): Promise<ResponseObject> {
    return {
      statusCode: HttpStatus.OK,
    };
  }
}

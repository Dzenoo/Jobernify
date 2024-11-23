import {
  ForbiddenException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Review, ReviewDocument } from './schemas/review.schema';

import { DeleteResult, FilterQuery, Model } from 'mongoose';

import { CreateReviewDto } from './dto/create-review.dto';

import { EmployersService } from '../employers/employers.service';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(forwardRef(() => EmployersService))
    private readonly employersService: EmployersService,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async find(
    query: FilterQuery<Review> = {},
  ): Promise<Review[] | ReviewDocument[]> {
    return await this.reviewModel.find(query).exec();
  }

  async findAndDeleteMany(
    query: FilterQuery<Review> = {},
  ): Promise<DeleteResult> {
    return await this.reviewModel.deleteMany(query).exec();
  }

  async countDocuments(query: FilterQuery<Review> = {}): Promise<number> {
    return await this.reviewModel.countDocuments(query).exec();
  }

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

  async editOne(
    seekerId: string,
    body: UpdateReviewDto,
    id: string,
  ): Promise<ResponseObject> {
    const existingReview = await this.reviewModel.findById(id);

    if (!existingReview) {
      throw new NotFoundException(
        'The review you are trying to edit could not be found.',
      );
    }

    if (existingReview.seeker.toString() !== seekerId.toString()) {
      throw new ForbiddenException(
        'You are not authorized to edit this review.',
      );
    }

    const editedReview = await this.reviewModel.findByIdAndUpdate(
      existingReview._id,
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!editedReview) {
      throw new InternalServerErrorException(
        'Review not found or could not be updated',
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Review successfully edited',
    };
  }

  async deleteOne(
    seekerId: string,
    employerId: string,
  ): Promise<ResponseObject> {
    const employer = await this.employersService.findOneById(employerId);

    if (!employer) {
      throw new NotFoundException('The specified employer could not be found.');
    }

    const existingReview = await this.reviewModel.findOne({
      seeker: seekerId,
    });

    if (!existingReview) {
      throw new NotFoundException(
        'The review you are trying to delete could not be found.',
      );
    }

    await this.employersService.findOneByIdAndUpdate(employerId, {
      $pull: { reviews: existingReview._id },
    });

    await this.reviewModel.findByIdAndDelete(existingReview._id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Review successfully deleted',
    };
  }
}

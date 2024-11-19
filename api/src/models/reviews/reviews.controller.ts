import { Controller, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { ReviewsService } from './reviews.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/:employerId')
  async create(
    @Body() body: CreateReviewDto,
    @Param('employerId') employerId: string,
  ) {}

  @Patch('/:reviewId')
  async edit(
    @Body() body: UpdateReviewDto,
    @Param('reviewId') reviewId: string,
  ) {}

  @Delete('/:employerId')
  async delete(@Param('employerId') employerId: string) {}
}

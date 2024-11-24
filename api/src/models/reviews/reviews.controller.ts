import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ReviewsService } from './reviews.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { User } from 'src/common/decorators/user.decorator';

import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/role-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../shared/schemas/user.schema';

@Controller('/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/:employerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async reviewEmployer(
    @User('userId') userId: string,
    @Body() body: CreateReviewDto,
    @Param('employerId') employerId: string,
  ) {
    return await this.reviewsService.createOne(userId, employerId, body);
  }

  @Patch('/:reviewId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async editReview(
    @User('userId') userId: string,
    @Body() body: UpdateReviewDto,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.reviewsService.editOne(userId, body, reviewId);
  }

  @Delete('/:employerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async deleteReview(
    @User('userId') userId: string,
    @Param('employerId') employerId: string,
  ) {
    return await this.reviewsService.deleteOne(userId, employerId);
  }
}

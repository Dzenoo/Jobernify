import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';

import { SeekersService } from './seekers.service';
import { VerificationService } from '../../authentication/verification/verification.service';

import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { GetSeekersDto } from './dto/get-seekers.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { SignupSeekerDto } from './dto/signup-seeker.dto';
import { CreateJobAlertDto } from './dto/create-job-alert.dto';

@Controller('/seekers')
export class SeekersController {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly verificationService: VerificationService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: SignupSeekerDto) {
    await this.seekersService.createOne(body);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Signup successful! Please verify your email.',
    };
  }

  @Get('/')
  async getProfile(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {}

  @Patch('/edit-profile')
  async editProfile(@Body() body: UpdateSeekerDto) {}

  @Delete('/delete-profile')
  async deleteProfile() {}

  @Get('/all')
  async getAll(@Query() query: GetSeekersDto) {}

  @Get('/:seekerId')
  async getById(@Param('seekerId') seekerId: string) {}

  @Patch('/add-new-education')
  async createEducation(@Body() body: CreateEducationDto) {}

  @Delete('/delete-education/:educationId')
  async deleteEducation(@Param('educationId') educationId: string) {}

  @Patch('/add-new-experience')
  async createExperience(@Body() body: CreateExperienceDto) {}

  @Delete('/delete-experience/:experienceId')
  async deleteExperience(@Param('experienceId') experienceId: string) {}

  @Post('/create-job-alert')
  async createJobAlert(@Body() body: CreateJobAlertDto) {}

  @Post('/:employerId/follow')
  async followEmployer(@Param('employerId') employerId: string) {}

  @Get('/verify-email')
  async verifyEmail(@Query() token: string) {}
}

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
  UseGuards,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  UseInterceptors,
} from '@nestjs/common';

import { SeekersService } from './seekers.service';
import { VerificationService } from '../../authentication/verification/verification.service';

import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { GetSeekersDto } from './dto/get-seekers.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { SignupSeekerDto } from './dto/signup-seeker.dto';
import { CreateJobAlertDto } from './dto/create-job-alert.dto';

import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/role-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../shared/schemas/user.schema';
import { User } from 'src/common/decorators/user.decorator';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/seekers')
export class SeekersController {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly verificationService: VerificationService,
  ) {}

  @Post('/signup')
  @UseGuards(RolesGuard)
  @Roles(Role.SEEKER)
  async signup(@Body() body: SignupSeekerDto) {
    await this.seekersService.createOne(body);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Signup successful! Please verify your email.',
    };
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async getProfile(
    @User('userId') userId: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const seeker = await this.seekersService.getOne({
      page,
      limit,
      id: userId,
    });

    return {
      statusCode: HttpStatus.OK,
      seeker,
    };
  }

  @Patch('/edit-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  @UseInterceptors(FileInterceptor('image'))
  async editProfile(
    @User('userId') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
          new MaxFileSizeValidator({
            maxSize: 6 * 1024 * 1024,
            message: 'File is too large.',
          }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Body() body: UpdateSeekerDto,
  ) {
    await this.seekersService.editOne(userId, body, image);

    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Successfully edited profile',
    };
  }

  @Delete('/delete-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async deleteProfile(@User('userId') userId: string) {
    await this.seekersService.deleteOne(userId);

    return {
      statusCode: HttpStatus.ACCEPTED,
      message:
        'Your profile and all associated data have been successfully deleted.',
    };
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async getAll(@Query() query: GetSeekersDto) {
    const { page, limit, search, skills } = query;

    const { seekers, totalSeekers } = await this.seekersService.getMany({
      page,
      limit,
      search,
      skills,
    });

    return {
      statusCode: HttpStatus.OK,
      seekers,
      totalSeekers,
    };
  }

  @Get('/:seekerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async getById(@Param('seekerId') seekerId: string) {
    const seeker = await this.seekersService.getOneById(seekerId);

    return {
      statusCode: HttpStatus.OK,
      seeker,
    };
  }

  @Patch('/add-new-education')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async createEducation(
    @User('userId') userId: string,
    @Body() body: CreateEducationDto,
  ) {
    await this.seekersService.createEducation(userId, body);

    return {
      statusCode: HttpStatus.CREATED,
      message:
        'Your education entry has been successfully added to your profile.',
    };
  }

  @Delete('/delete-education/:educationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async deleteEducation(
    @User('userId') userId: string,
    @Param('educationId') educationId: string,
  ) {
    await this.seekersService.deleteEducation(userId, educationId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Education successfully deleted',
    };
  }

  @Patch('/add-new-experience')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async createExperience(
    @User('userId') userId: string,
    @Body() body: CreateExperienceDto,
  ) {
    await this.seekersService.createExperience(userId, body);

    return {
      statusCode: HttpStatus.CREATED,
      message:
        'Your experience entry has been successfully added to your profile.',
    };
  }

  @Delete('/delete-experience/:experienceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async deleteExperience(
    @User('userId') userId: string,
    @Param('experienceId') experienceId: string,
  ) {
    await this.seekersService.deleteExperience(userId, experienceId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Experience successfully deleted',
    };
  }

  @Post('/create-job-alert')
  async createJobAlert(@Body() body: CreateJobAlertDto) {}

  @Post('/:employerId/follow')
  async followEmployer(@Param('employerId') employerId: string) {}

  @Get('/verify-email')
  async verifyEmail(@Query() token: string) {
    await this.verificationService.verifyEmail(token, 'seeker');

    return {
      statusCode: HttpStatus.OK,
      message: 'Email successfully verified.',
    };
  }
}

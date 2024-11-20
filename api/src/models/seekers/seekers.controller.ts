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
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.EMPLOYER)
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

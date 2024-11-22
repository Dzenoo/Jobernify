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

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async getProfile(
    @User('userId') userId: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return await this.seekersService.getOne({
      page,
      limit,
      id: userId,
    });
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
    return await this.seekersService.editOne(userId, body, image);
  }

  @Delete('/delete-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async deleteProfile(@User('userId') userId: string) {
    return await this.seekersService.deleteOne(userId);
  }

  @Patch('/add-new-education')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async createEducation(
    @User('userId') userId: string,
    @Body() body: CreateEducationDto,
  ) {
    return await this.seekersService.createEducation(userId, body);
  }

  @Delete('/delete-education/:educationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async deleteEducation(
    @User('userId') userId: string,
    @Param('educationId') educationId: string,
  ) {
    return await this.seekersService.deleteEducation(userId, educationId);
  }

  @Patch('/add-new-experience')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async createExperience(
    @User('userId') userId: string,
    @Body() body: CreateExperienceDto,
  ) {
    return await this.seekersService.createExperience(userId, body);
  }

  @Delete('/delete-experience/:experienceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async deleteExperience(
    @User('userId') userId: string,
    @Param('experienceId') experienceId: string,
  ) {
    return await this.seekersService.deleteExperience(userId, experienceId);
  }

  @Post('/create-job-alert')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async createJobAlert(
    @User('userId') userId: string,
    @Body() body: CreateJobAlertDto,
  ) {
    return await this.seekersService.createJobAlert(userId, body);
  }

  @Post('/:employerId/follow')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async followEmployer(
    @User('userId') userId: string,
    @Param('employerId') employerId: string,
  ) {
    return await this.seekersService.followEmployer(userId, employerId);
  }

  @Get('/verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.verificationService.verifyEmail(token, 'seeker');
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async getAll(@Query() query: GetSeekersDto) {
    const { page, limit, search, skills } = query;

    return await this.seekersService.getMany({
      page,
      limit,
      search,
      skills,
    });
  }

  @Get('/:seekerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async getById(@Param('seekerId') seekerId: string) {
    return await this.seekersService.getOneById(seekerId);
  }
}

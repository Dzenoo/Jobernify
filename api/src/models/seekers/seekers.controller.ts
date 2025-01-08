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

import { SeekersService } from '@/models/seekers/seekers.service';
import { VerificationService } from '@/authentication/services/verification.service';

import { UpdateSeekerDto } from '@/models/seekers/dto/update-seeker.dto';
import { GetSeekersDto } from '@/models/seekers/dto/get-seekers.dto';
import { CreateEducationDto } from '@/models/seekers/dto/create-education.dto';
import { UpdateEducationDto } from '@/models/seekers/dto/update-education.dto';
import { CreateExperienceDto } from '@/models/seekers/dto/create-experience.dto';
import { UpdateExperienceDto } from '@/models/seekers/dto/update-experience.dto';
import { CreateJobAlertDto } from '@/models/seekers/dto/create-job-alert.dto';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { RolesGuard } from '@/authentication/guards/role-auth.guard';

import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/types';
import { User } from '@/common/decorators/user.decorator';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/seekers')
export class SeekersController {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly verificationService: VerificationService,
  ) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async getSeekerProfile(
    @User('userId') userId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.seekersService.getOne({
      page,
      limit,
      id: userId,
    });
  }

  @Patch('/edit-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  @UseInterceptors(FileInterceptor('image'))
  async editSeekerProfile(
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
  @Roles(Role.Seeker)
  async deleteSeekerProfile(@User('userId') userId: string) {
    return await this.seekersService.deleteOne(userId);
  }

  @Patch('/add-new-education')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async addNewEducation(
    @User('userId') userId: string,
    @Body() body: CreateEducationDto,
  ) {
    return await this.seekersService.createEducation(userId, body);
  }

  @Patch('/edit-education/:educationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async editEducation(
    @User('userId') userId: string,
    @Param('educationId') educationId: string,
    @Body() body: UpdateEducationDto,
  ) {
    return await this.seekersService.editEducation(userId, educationId, body);
  }

  @Delete('/delete-education/:educationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async deleteEducation(
    @User('userId') userId: string,
    @Param('educationId') educationId: string,
  ) {
    return await this.seekersService.deleteEducation(userId, educationId);
  }

  @Patch('/add-new-experience')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async addNewExperience(
    @User('userId') userId: string,
    @Body() body: CreateExperienceDto,
  ) {
    return await this.seekersService.createExperience(userId, body);
  }

  @Patch('/edit-experience/:experienceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async editExperience(
    @User('userId') userId: string,
    @Param('experienceId') experienceId: string,
    @Body() body: UpdateExperienceDto,
  ) {
    return await this.seekersService.editExperience(userId, experienceId, body);
  }

  @Delete('/delete-experience/:experienceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async deleteExperience(
    @User('userId') userId: string,
    @Param('experienceId') experienceId: string,
  ) {
    return await this.seekersService.deleteExperience(userId, experienceId);
  }

  @Post('/create-job-alert')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async generateJobAlert(
    @User('userId') userId: string,
    @Body() body: CreateJobAlertDto,
  ) {
    return await this.seekersService.createJobAlert(userId, body);
  }

  @Post('/:employerId/follow')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
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
  @Roles(Role.Employer)
  async getSeekers(@Query() query: GetSeekersDto) {
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
  @Roles(Role.Employer)
  async getSeekerById(@Param('seekerId') seekerId: string) {
    return await this.seekersService.getOneById(seekerId);
  }
}

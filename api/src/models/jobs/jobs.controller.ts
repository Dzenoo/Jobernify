import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetJobsDto } from './dto/get-jobs.dto';

import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/role-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../shared/schemas/user.schema';
import { User } from 'src/common/decorators/user.decorator';

@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('/create-new-job')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async createJob(@User() userId: string, @Body() body: CreateJobDto) {
    return await this.jobsService.createOne(body, userId);
  }

  @Patch('/:jobId/edit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async editJob(
    @User() userId: string,
    @Body() body: UpdateJobDto,
    @Param('jobId') jobId: string,
  ) {
    return await this.jobsService.editOne(jobId, body, userId);
  }

  @Delete('/:jobId/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async deleteJob(@User() userId: string, @Param('jobId') jobId: string) {
    return await this.jobsService.deleteOne(jobId, userId);
  }

  @Post('/:jobId/save')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async saveJob(@User() userId: string, @Param('jobId') jobId: string) {
    return await this.jobsService.saveOne(jobId, userId);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async getJobs(@Query() query: GetJobsDto) {
    return await this.jobsService.getAll(query);
  }

  @Get('/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async getJob(@Param('jobId') jobId: string) {
    return await this.jobsService.getOneById(jobId);
  }
}

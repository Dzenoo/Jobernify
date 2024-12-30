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
import { Throttle } from '@nestjs/throttler';

import { JobsService } from './jobs.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetJobsDto } from './dto/get-jobs.dto';

import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/role-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@jobernify/shared';
import { User } from 'src/common/decorators/user.decorator';

@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('/create-new-job')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async createNewJob(
    @User('userId') userId: string,
    @Body() body: CreateJobDto,
  ) {
    return await this.jobsService.createOne(body, userId);
  }

  @Patch('/:jobId/edit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async editJob(
    @User('userId') userId: string,
    @Body() body: UpdateJobDto,
    @Param('jobId') jobId: string,
  ) {
    return await this.jobsService.editOne(jobId, body, userId);
  }

  @Delete('/:jobId/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async deleteJob(
    @User('userId') userId: string,
    @Param('jobId') jobId: string,
  ) {
    return await this.jobsService.deleteOne(jobId, userId);
  }

  @Post('/:jobId/save')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async saveJob(@User('userId') userId: string, @Param('jobId') jobId: string) {
    return await this.jobsService.saveOne(jobId, userId);
  }

  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async getJobs(@Query() query: GetJobsDto) {
    return await this.jobsService.getAll(query);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('/:jobId/generate-cover-letter')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async generateCoverLetter(
    @Param('jobId') jobId: string,
    @User('userId') userId: string,
  ) {
    return await this.jobsService.createCoverLetter(jobId, userId);
  }

  @Get('/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker, Role.Employer)
  async getJobById(@Param('jobId') jobId: string) {
    return await this.jobsService.getOneById(jobId);
  }
}

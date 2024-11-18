import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetJobsDto } from './dto/get-jobs.dto';

@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('/create-new-job')
  async createJob(@Body() body: CreateJobDto) {}

  @Patch('/:jobId/edit')
  async editJob(@Body() body: UpdateJobDto, @Param('jobId') jobId: string) {}

  @Delete('/:jobId/delete')
  async deleteJob(@Param('jobId') jobId: string) {}

  @Post('/:jobId/save')
  async saveJob(@Param('jobId') jobId: string) {}

  @Get('/')
  async getJobs(@Query() query: GetJobsDto) {}

  @Get('/:jobId')
  async getJob(@Param('jobId') jobId: string) {}
}

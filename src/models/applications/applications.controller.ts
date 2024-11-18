import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationStatus } from './schemas/application.schema';

@Controller('/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('/:jobId/apply')
  async create(@Param('jobId') jobId: string) {}

  @Patch('/:applicationId/status')
  async update(
    @Param('applicationId') applicationId: string,
    @Body('status') status: ApplicationStatus,
  ) {}

  @Get('/:jobId')
  async get(
    @Param('jobId') jobId: string,
    @Query('status') status: ApplicationStatus,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {}

  generateApplicationEmailContent() {}
}

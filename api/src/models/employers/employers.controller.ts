import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { EmployersService } from './employers.service';

import { GetEmployersDto } from './dto/get-employers.dto';
import { GetProfileDto } from './dto/get-profile.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Controller('/employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Get('/')
  async getProfile(@Query() query: GetProfileDto) {}

  @Patch('/edit-profile')
  async editProfile(@Body() body: UpdateEmployerDto) {}

  @Delete('/delete-profile')
  async deleteProfile() {}

  @Get('/:employerId')
  async getById(
    @Param('employerId') employerId: string,
    @Query('type') type: 'jobs' | 'reviews',
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {}

  @Get('/all')
  async getAll(@Query() query: GetEmployersDto) {}

  @Get('/analytics')
  async getAnalytics() {}

  getJobsPerMonth() {}

  getFollowerOverTime() {}

  getJobTypes() {}
}

import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { EmployersService } from './employers.service';

import { GetEmployersDto } from './dto/get-employers.dto';
import { GetProfileDto } from './dto/get-profile.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/role-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../shared/schemas/user.schema';
import { User } from 'src/common/decorators/user.decorator';

@Controller('/employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async getProfile(
    @User('userId') userId: string,
    @Query() query: GetProfileDto,
  ) {
    const { page, limit, search, sort, type } = query;

    return await this.employersService.getOne({
      page,
      limit,
      search,
      sort,
      type,
      id: userId,
    });
  }

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

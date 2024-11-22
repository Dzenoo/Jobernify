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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async editProfile(
    @User('userId') userId: string,
    @Body() body: UpdateEmployerDto,
  ) {
    return this.employersService.editOne(userId, body);
  }

  @Delete('/delete-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async deleteProfile(@User('userId') userId: string) {}

  @Get('/:employerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async getById(
    @Param('employerId') employerId: string,
    @Query('type') type: 'jobs' | 'reviews',
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async getAll(@Query() query: GetEmployersDto) {}

  @Get('/analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async getAnalytics(@User('userId') userId: string) {}

  getJobsPerMonth() {}

  getFollowerOverTime() {}

  getJobTypes() {}

  verifyEmail() {}
}

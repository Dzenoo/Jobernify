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
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  DefaultValuePipe,
} from '@nestjs/common';

import { EmployersService } from '@/models/employers/employers.service';

import { GetEmployersDto } from '@/models/employers/dto/get-employers.dto';
import { GetProfileDto } from '@/models/employers/dto/get-profile.dto';
import { UpdateEmployerDto } from '@/models/employers/dto/update-employer.dto';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { RolesGuard } from '@/authentication/guards/role-auth.guard';

import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/types';
import { User } from '@/common/decorators/user.decorator';
import { VerificationService } from '@/authentication/services/verification.service';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/employers')
export class EmployersController {
  constructor(
    private readonly employersService: EmployersService,
    private readonly verificationService: VerificationService,
  ) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async getEmployerProfile(
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
  @Roles(Role.Employer)
  @UseInterceptors(FileInterceptor('image'))
  async editEmployerProfile(
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
    @Body() body: UpdateEmployerDto,
  ) {
    return await this.employersService.editOne(userId, body, image);
  }

  @Delete('/delete-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async deleteEmployerProfile(@User('userId') userId: string) {
    return await this.employersService.deleteOne(userId);
  }

  @Get('/analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async getEmployerAnalyticsInfo(@User('userId') userId: string) {
    return await this.employersService.getAnalytics(userId);
  }

  @Get('/verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.verificationService.verifyEmail(token, 'employer');
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async getEmployers(@Query() query: GetEmployersDto) {
    const { page, limit, search, sort, size, industry, location } = query;

    return await this.employersService.getMany({
      page,
      limit,
      search,
      sort,
      size,
      industry,
      location,
    });
  }

  @Get('/:employerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async getEmployerById(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('type') type: 'jobs',
    @Param('employerId') employerId: string,
  ) {
    return await this.employersService.getOneById({
      page,
      limit,
      type,
      id: employerId,
    });
  }
}

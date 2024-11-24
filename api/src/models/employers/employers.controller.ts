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
import { VerificationService } from 'src/authentication/verification/verification.service';

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
  @Roles(Role.Employer)
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
    @Body() body: UpdateEmployerDto,
  ) {
    return await this.employersService.editOne(userId, body, image);
  }

  @Delete('/delete-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async deleteProfile(@User('userId') userId: string) {
    return await this.employersService.deleteOne(userId);
  }

  @Get('/analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async getAnalytics(@User('userId') userId: string) {
    return await this.employersService.getAnalytics(userId);
  }

  @Get('/verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.verificationService.verifyEmail(token, 'employer');
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async getAll(@Query() query: GetEmployersDto) {
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
  async getById(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('type') type: 'jobs' | 'reviews',
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

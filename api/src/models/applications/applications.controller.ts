import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApplicationsService } from './applications.service';

import { ApplicationStatus } from './schemas/application.schema';

import { User } from 'src/common/decorators/user.decorator';

import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/role-auth.guard';

import { Role } from '../shared/schemas/user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Patch('/:applicationId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async update(
    @Param('applicationId') applicationId: string,
    @Body('status') status: ApplicationStatus,
  ) {
    return await this.applicationsService.updateOne(applicationId, status);
  }

  @Get('/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async get(
    @Param('jobId') jobId: string,
    @Query('status') status: ApplicationStatus,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {}

  @Post('/:jobId/apply')
  @UseInterceptors(FileInterceptor('resume'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SEEKER)
  async create(
    @User('userId') userId: string,
    @Param('jobId') jobId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(pdf|docx)' }),
          new MaxFileSizeValidator({
            maxSize: 6 * 1024 * 1024,
            message: 'File is too large.',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    resume: Express.Multer.File,
    @Body('coverLetter') coverLetter?: string,
  ) {
    return await this.applicationsService.createOne(
      userId,
      jobId,
      resume,
      coverLetter,
    );
  }
}

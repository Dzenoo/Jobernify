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
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApplicationsService } from '@/models/applications/applications.service';
import { ApplicationStatus, Role } from '@/types';

import { User } from '@/common/decorators/user.decorator';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { RolesGuard } from '@/authentication/guards/role-auth.guard';

import { Roles } from '@/common/decorators/roles.decorator';

@Controller('/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get('/:applicationId/resume-url')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async getPresignedResumeUrl(
    @Param('applicationId') applicationId: string,
  ): Promise<{ url: string }> {
    const url =
      await this.applicationsService.getPresignedResumeUrl(applicationId);
    if (!url) {
      throw new NotFoundException('Unable to generate pre-signed URL.');
    }

    return { url };
  }

  @Patch('/:applicationId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body('status') status: ApplicationStatus,
  ) {
    return await this.applicationsService.updateOne(applicationId, status);
  }

  @Get('/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Employer)
  async getApplications(
    @Param('jobId') jobId: string,
    @Query('status') status: ApplicationStatus,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return await this.applicationsService.getManyByJobId({
      jobId,
      page,
      limit,
      status,
    });
  }

  @Post('/:jobId/apply')
  @UseInterceptors(FileInterceptor('resume'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Seeker)
  async applyToJob(
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
        fileIsRequired: false,
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

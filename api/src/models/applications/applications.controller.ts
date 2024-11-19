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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApplicationsService } from './applications.service';

import { ApplicationStatus } from './schemas/application.schema';

@Controller('/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('/:jobId/apply')
  @UseInterceptors(FileInterceptor('resume'))
  async create(
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
    @Param('jobId') jobId: string,
  ) {}

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

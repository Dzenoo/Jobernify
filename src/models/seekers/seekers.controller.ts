import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { SignupSeekerDto } from './dto/signup-seeker.dto';
import { SigninSeekerDto } from './dto/signin-seeker.dto';
import { VerificationService } from '../shared/services/VerificationService';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { GetSeekersDto } from './dto/get-seekers.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';

@Controller('seekers')
export class SeekersController {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly verificationService: VerificationService,
  ) {}

  async signUp(@Body() body: SignupSeekerDto) {}

  async signIn(@Body() body: SigninSeekerDto) {}

  async getProfile(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {}

  async editProfile(@Body() body: UpdateSeekerDto) {}

  async deleteProfile() {}

  async getAll(@Query() query: GetSeekersDto) {}

  async getById(@Param() seekerId: string) {}

  async createEducation(@Body() body: CreateEducationDto) {}

  async deleteEducation(@Param() educationId: string) {}

  async createExperience(@Body() body: CreateExperienceDto) {}

  async deleteExperience(@Param() experienceId: string) {}

  async verifyEmail(@Query() token: string) {}
}

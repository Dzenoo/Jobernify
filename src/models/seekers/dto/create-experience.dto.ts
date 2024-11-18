import {
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { JobLevel, JobType } from '../schemas/experience.schema';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsEnum(JobLevel)
  level: JobLevel;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  position?: string;
}

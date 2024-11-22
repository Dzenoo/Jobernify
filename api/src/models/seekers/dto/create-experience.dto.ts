import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { JobLevel, JobType } from 'src/models/jobs/schemas/job.schema';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  readonly jobTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @IsDateString()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsOptional()
  @IsDateString()
  readonly endDate?: Date;

  @IsEnum(JobLevel)
  readonly level: JobLevel;

  @IsEnum(JobType)
  readonly type: JobType;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  readonly position: string;
}

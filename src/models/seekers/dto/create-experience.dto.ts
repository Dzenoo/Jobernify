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
  readonly jobTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @IsDate()
  readonly startDate: Date;

  @IsOptional()
  @IsDate()
  readonly endDate?: Date;

  @IsEnum(JobLevel)
  readonly level: JobLevel;

  @IsEnum(JobType)
  readonly type: JobType;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsOptional()
  @IsString()
  readonly position?: string;
}

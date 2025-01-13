import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { JobLevel, JobPosition, JobType } from '@/types';
import { sanitizeInput } from '@/common/utils';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  readonly jobTitle: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
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
  @Transform(({ value }) => sanitizeInput(value))
  readonly location: string;

  @IsEnum(JobPosition)
  readonly position: JobPosition;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly isCurrentlyWorking?: boolean;
}

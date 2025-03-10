import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import { JobLevel, JobPosition, JobType } from '@/types';
import { sanitizeInput } from '@/common/utils';

export class UpdateExperienceDto {
  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => sanitizeInput(value))
  readonly jobTitle?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => sanitizeInput(value))
  readonly companyName?: string;

  @IsDateString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly startDate?: Date;

  @IsDateString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly endDate?: Date;

  @IsEnum(JobLevel)
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly level?: JobLevel;

  @IsEnum(JobType)
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly type?: JobType;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => sanitizeInput(value))
  readonly location?: string;

  @IsEnum(JobPosition)
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly position?: JobPosition;

  @IsOptional()
  @IsBoolean()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => value === 'true' || value === true)
  readonly isCurrentlyWorking?: boolean;
}

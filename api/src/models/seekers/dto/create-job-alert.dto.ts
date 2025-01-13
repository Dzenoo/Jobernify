import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { JobLevel, JobType } from '@/types';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class CreateJobAlertDto {
  @IsEnum(JobLevel)
  level: JobLevel;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Transform(({ value }) => sanitizeInput(value))
  title: string;
}

import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { JobLevel, JobType } from '@/types';

export class CreateJobAlertDto {
  @IsEnum(JobLevel)
  level: JobLevel;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  title: string;
}

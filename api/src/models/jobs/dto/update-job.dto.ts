import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  Min,
  Max,
  Length,
  IsDateString,
} from 'class-validator';
import { JobLevel, JobPosition, JobType } from '@jobernify/shared';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  readonly title?: string;

  @IsOptional()
  @IsEnum(JobPosition)
  readonly position?: JobPosition;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  readonly location?: string;

  @IsOptional()
  @IsString()
  @Length(30, 300)
  readonly overview?: string;

  @IsOptional()
  @IsEnum(JobType)
  readonly type?: JobType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly skills?: string[];

  @IsOptional()
  @IsEnum(JobLevel)
  readonly level?: JobLevel;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(500000)
  readonly salary?: number;

  @IsOptional()
  @IsDateString()
  readonly expiration_date?: Date;

  @IsOptional()
  @IsString()
  @Length(30, 2500)
  readonly description?: string;
}

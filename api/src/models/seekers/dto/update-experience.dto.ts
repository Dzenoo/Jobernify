import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  ValidateIf,
  IsBooleanString,
} from 'class-validator';
import {
  JobLevel,
  JobPosition,
  JobType,
} from 'src/models/jobs/schemas/job.schema';

export class UpdateExperienceDto {
  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly jobTitle?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
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
  readonly location?: string;

  @IsEnum(JobPosition)
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly position?: JobPosition;

  @IsOptional()
  @IsBooleanString()
  @ValidateIf((obj, value) => value !== undefined)
  readonly isCurrentlyWorking?: boolean;
}

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
import { JobLevel, JobPosition, JobType } from '@/types';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => sanitizeInput(value))
  readonly title?: string;

  @IsOptional()
  @IsEnum(JobPosition)
  readonly position?: JobPosition;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => sanitizeInput(value))
  readonly location?: string;

  @IsOptional()
  @IsString()
  @Length(30, 300)
  @Transform(({ value }) => sanitizeInput(value))
  readonly overview?: string;

  @IsOptional()
  @IsEnum(JobType)
  readonly type?: JobType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => sanitizeInput(value))
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
  @Transform(({ value }) =>
    sanitizeInput(value, {
      allowedTags: ['b', 'i', 'ul', 'li', 'ol'],
      allowedAttributes: {},
      disallowedTagsMode: 'discard',
    }),
  )
  readonly description?: string;
}
